import logging

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.requests import Request

from src.database.core import get_db
from src.limiter import limiter
from src.models.mail import WaitlistResponse, WaitlistSignup
from src.models.sqlalchemy_models import WaitingList
from src.services.resend_mail_service import (
    ResendServiceError,
    send_waitlist_confirmation_email,
)

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post(
    "/subscribe",
    response_model=WaitlistResponse,
    status_code=status.HTTP_201_CREATED,
)
@limiter.limit("5/minute")
async def subscribe_waitlist(
    request: Request,
    payload: WaitlistSignup,
    db: AsyncSession = Depends(get_db),
) -> WaitlistResponse:
    query = select(WaitingList).where(WaitingList.email_user == payload.email)
    existing = await db.execute(query)
    record = existing.scalar_one_or_none()

    if record:
        record.name_user = payload.name
        await db.commit()
        message = "Je staat al op de wachtlijst. We sturen je updates zodra ze er zijn."
    else:
        entry = WaitingList(name_user=payload.name, email_user=payload.email)
        db.add(entry)
        await db.commit()
        await db.refresh(entry)
        message = "Welkom op de wachtlijst! Houd je inbox in de gaten."

    try:
        await send_waitlist_confirmation_email(
            name=payload.name,
            email=payload.email,
            product_name=payload.product_name,
        )
    except ResendServiceError as exc:
        logger.exception("Failed to send confirmation email via Resend")
        raise HTTPException(
            status_code=exc.status_code,
            detail=str(exc),
        ) from exc

    return WaitlistResponse(success=True, message=message)
