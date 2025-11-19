"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { subscribeToWaitlist } from "@/app/api/actions/newsletterActions"

const waitlistSchema = z.object({
  name: z.string().min(2, "Naam is te kort").max(255, "Naam is te lang"),
  email: z.string().email("Voer een geldig e-mailadres in").max(255),
})

type WaitlistFormValues = z.infer<typeof waitlistSchema>

interface NewsletterModalProps {
  children: React.ReactNode
}

export function NewsletterModal({ children }: NewsletterModalProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  const mutation = useMutation({
    mutationFn: subscribeToWaitlist,
    onSuccess: () => {
      setIsSubmitted(true)
      reset()
      setTimeout(() => {
        setIsOpen(false)
        setIsSubmitted(false)
        router.push("/")
      }, 2000)
    },
  })

  const onSubmit = async (values: WaitlistFormValues) => {
    try {
      await mutation.mutateAsync(values)
    } catch (error) {
      console.error("Failed to add to waitlist", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#0a0a0a] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Join the Waitlist</DialogTitle>
        </DialogHeader>
        <Card className="border-0 shadow-none bg-transparent">
          <CardContent className="p-0">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/80 text-sm">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    {...register("name")}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/20"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80 text-sm">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/20"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-white/60">
                    Be the first to know when we launch. No spam, unsubscribe anytime.
                  </p>
                </div>
                {mutation.isError && (
                  <p className="text-sm text-red-400">
                    {(mutation.error as Error)?.message ?? "Er ging iets mis, probeer het opnieuw."}
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full bg-white text-[#030303] hover:bg-white/90 font-medium disabled:opacity-60"
                >
                  {mutation.isPending ? "Sending..." : "Join Waitlist"}
                </Button>
              </form>
            ) : (
              <div className="text-center py-6">
                {mutation.data?.is_existing ? (
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <h3 className="text-lg font-medium text-white mb-2">
                  {mutation.data?.is_existing ? "User already signed up!" : "Thank you for signing up!"}
                </h3>
                <p className="text-sm text-white/60">
                  {mutation.data?.is_existing
                    ? "You are already on our waitlist. We'll keep you updated!"
                    : "We're excited to have you on our waitlist. We'll keep you updated on our launch and special offers!"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}