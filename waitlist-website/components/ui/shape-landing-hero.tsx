"use client";

import React from "react";
import { motion, useMotionValue, useTransform, animate, Variants } from "framer-motion";
import { Circle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { HoverButton } from "@/components/ui/hover-button";
import { NewsletterModal } from "@/components/mail/newsletter-modal";


function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

interface HeroGeometricProps {
    badge?: string;
    title1?: string;
    title2?: string | React.ReactNode;
    description?: string;
    showButton?: boolean;
    buttonText?: string;
}

function HeroGeometric({
    badge = "Design Collective",
    title1 = "Elevate Your Digital Vision",
    title2 = "Crafting Exceptional Websites",
    description = "Crafting exceptional digital experiences through innovative design and cutting-edge technology.",
    showButton = false,
    buttonText = "Join Waitlist",
}: HeroGeometricProps) {
    const fadeUpVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.03),transparent_50%)]" />

            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-white/[0.08]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-white/[0.06]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-white/[0.04]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-white/[0.05]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />

                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-white/[0.03]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl lg:max-w-5xl mx-auto text-center">
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-white/[0.08] backdrop-blur-sm border border-white/[0.12] mb-6 sm:mb-8 lg:mb-12"
                    >
                        {/* Subtle gradient border glow */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-rose-500/20 opacity-75 blur-[2px]" />
                        <div className="absolute inset-[0.5px] rounded-full bg-white/[0.08] border border-white/[0.08]" />

                        {/* Content */}
                        <div className="relative z-10 flex items-center gap-2">
                            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white/60" />
                            <span className="text-xs sm:text-sm text-white/70 font-medium tracking-wider uppercase">
                                {badge}
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-light mb-4 sm:mb-6 lg:mb-8 tracking-tight leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                                {title1}
                            </span>
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white/90 to-white/50">
                                {title2}
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className="text-base sm:text-lg lg:text-xl text-white/40 mb-6 sm:mb-8 lg:mb-10 leading-relaxed max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto px-4 sm:px-0">
                            {description}
                        </p>
                    </motion.div>

                    {showButton && (
                        <motion.div
                            custom={3}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="mt-6 sm:mt-8"
                        >
                            <NewsletterModal>
                                <HoverButton
                                className="h-12 sm:h-14 px-6 sm:px-8 lg:px-10 text-base sm:text-lg rounded-full bg-white/[0.08] backdrop-blur-sm border border-white/[0.1] text-white hover:bg-white/[0.12] transition-all duration-300 min-w-[140px] sm:min-w-[160px]"
                                style={{
                                    "--circle-start": "rgba(255,255,255,0.3)",
                                    "--circle-end": "rgba(120,119,198,0.3)",
                                } as React.CSSProperties}
                                >
                                {buttonText}
                                </HoverButton>
                            </NewsletterModal>
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
        </div>
    );
}

export { HeroGeometric }
