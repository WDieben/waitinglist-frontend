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
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log(data)
        setIsSubmitted(true)
        setTimeout(() => setIsSubmitted(false), 3000)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn("w-full max-w-md flex flex-col gap-2", className)}>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
                <div className="flex-1 relative">
                    <Input
                        {...register('email')}
                        type="email"
                        placeholder="Enter your email"
                        className={cn(
                            "h-12 rounded-full px-6 transition-all",
                            variant === 'footer'
                                ? "bg-white/10 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-primary focus-visible:border-primary"
                                : "bg-white border-input text-foreground placeholder:text-muted-foreground shadow-sm focus-visible:ring-primary"
                        )}
                        disabled={isSubmitting || isSubmitted}
                    />
                    {errors.email && (
                        <span className="absolute -bottom-6 left-4 text-xs text-red-500">
                            {errors.email.message}
                        </span>
                    )}
                </div>
                <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting || isSubmitted}
                    className={cn(
                        "h-12 px-8 rounded-full font-medium transition-all shrink-0",
                        variant === 'footer'
                            ? "bg-white text-brand-dark hover:bg-white/90"
                            : "bg-brand-dark hover:bg-brand-dark/90 text-white shadow-md"
                    )}
                >
                    {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : isSubmitted ? (
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5" /> Joined
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            Join Waitlist {variant === 'default' && <ArrowRight className="w-4 h-4" />}
                        </span>
                    )}
                </Button>
            </div>
        </form>
    )
}
