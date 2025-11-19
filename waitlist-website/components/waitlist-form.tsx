'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
})

type FormData = z.infer<typeof formSchema>

interface WaitlistFormProps {
    className?: string
    variant?: 'default' | 'footer'
}

export function WaitlistForm({ className, variant = 'default' }: WaitlistFormProps) {
    const [isSubmitted, setIsSubmitted] = useState(false)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (data: FormData) => {
        // HERE WE NEED TO CALL THE API TO SUBSCRIBE TO THE WAITLIST
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn("w-full max-w-2xl", className)}>
            <div className="relative">
                {/* Container with integrated input and button */}
                <div className={cn(
                    "relative flex items-center rounded-full overflow-hidden border transition-all",
                    variant === 'footer'
                        ? "bg-white/5 border-white/10 hover:border-white/20"
                        : "bg-white border-border hover:border-primary/30 shadow-sm"
                )}>
                    {/* Email Icon */}
                    <div className={cn(
                        "pl-6 pr-3",
                        variant === 'footer' ? "text-white/40" : "text-muted-foreground"
                    )}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                    </div>

                    {/* Input */}
                    <input
                        {...register('email')}
                        type="email"
                        placeholder="Enter your email"
                        disabled={isSubmitting || isSubmitted}
                        className={cn(
                            "flex-1 h-14 bg-transparent border-0 outline-none text-base",
                            "placeholder:text-sm",
                            variant === 'footer'
                                ? "text-white placeholder:text-white/40"
                                : "text-foreground placeholder:text-muted-foreground"
                        )}
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting || isSubmitted}
                        className={cn(
                            "m-1.5 h-11 px-6 rounded-full font-medium transition-all shrink-0 flex items-center gap-2",
                            variant === 'footer'
                                ? "bg-white text-brand-dark hover:bg-white/90"
                                : "bg-brand-dark text-white hover:bg-brand-dark/90",
                            "disabled:opacity-50 disabled:cursor-not-allowed"
                        )}
                    >
                        {isSubmitting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : isSubmitted ? (
                            <>
                                <CheckCircle2 className="w-4 h-4" />
                                <span className="hidden sm:inline">Joined</span>
                            </>
                        ) : (
                            <>
                                <span className="hidden sm:inline">Join Waitlist</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>

                {/* Error Message */}
                {errors.email && (
                    <span className={cn(
                        "absolute -bottom-6 left-6 text-xs",
                        variant === 'footer' ? "text-red-300" : "text-red-500"
                    )}>
                        {errors.email.message}
                    </span>
                )}
            </div>
        </form>
    )
}
