import { type NextRequest, NextResponse } from 'next/server'
import { getApiConfig } from '@/lib/config'

const FORWARD_TIMEOUT = 30_000

type RouteParams = { slug?: string[] | string }

async function forwardRequest(
  request: NextRequest,
  method: string,
  slugParam: RouteParams['slug'],
): Promise<NextResponse> {
  const backendUrl = getApiConfig().BACKEND_URL
  const searchParams = request.nextUrl.searchParams.toString()
  const slugSegments = Array.isArray(slugParam)
    ? slugParam
    : typeof slugParam === 'string' && slugParam.length > 0
      ? [slugParam]
      : []

  if (slugSegments.length === 0) {
    return NextResponse.json({ error: 'Invalid proxy path' }, { status: 400 })
  }

  const encodedPath = slugSegments.map((segment) => encodeURIComponent(segment)).join('/')
  const path = `/api/v1/${encodedPath}`
  const targetUrl = `${backendUrl}${path}${searchParams ? `?${searchParams}` : ''}`

  const headers = new Headers()
  const contentType = request.headers.get('content-type')
  if (contentType) {
    headers.set('Content-Type', contentType)
  }

  try {
    const body =
      method === 'GET' || method === 'DELETE' ? undefined : await request.text()

    const response = await fetch(targetUrl, {
      method,
      headers,
      body: body ? body : undefined,
      signal: AbortSignal.timeout(FORWARD_TIMEOUT),
    })

    const cleanHeaders = new Headers(response.headers)
    cleanHeaders.delete('content-encoding')
    cleanHeaders.delete('content-length')
    cleanHeaders.delete('transfer-encoding')
    cleanHeaders.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    cleanHeaders.set('Pragma', 'no-cache')
    cleanHeaders.set('Expires', '0')

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: cleanHeaders,
    })
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json({ error: 'Request timeout' }, { status: 504 })
    }
    return NextResponse.json({ error: 'Bad Gateway' }, { status: 502 })
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteParams> },
) {
  const { slug } = await params
  return forwardRequest(request, 'GET', slug)
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<RouteParams> },
) {
  const { slug } = await params
  return forwardRequest(request, 'POST', slug)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<RouteParams> },
) {
  const { slug } = await params
  return forwardRequest(request, 'PUT', slug)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<RouteParams> },
) {
  const { slug } = await params
  return forwardRequest(request, 'PATCH', slug)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<RouteParams> },
) {
  const { slug } = await params
  return forwardRequest(request, 'DELETE', slug)
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

