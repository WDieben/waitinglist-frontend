import Link from 'next/link'
import { WaitlistForm } from '@/components/waitlist-form'

function GridPattern({
    width,
    height,
    x,
    y,
    squares,
    ...props
}: {
    width: number
    height: number
    x: string
    y: string
    squares: [number, number][]
    className?: string
}) {
    const patternId = 'footer-grid-pattern'

    return (
        <svg aria-hidden="true" {...props}>
            <defs>
                <pattern
                    id={patternId}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <path d={`M.5 ${height}V.5H${width}`} fill="none" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
            {squares && (
                <svg x={x} y={y}>
                    {squares.map(([x, y]) => (
                        <rect
                            strokeWidth="0"
                            key={`${x}-${y}`}
                            width={width + 1}
                            height={height + 1}
                            x={x * width}
                            y={y * height}
                        />
                    ))}
                </svg>
            )}
        </svg>
    )
}

export default function Footer() {
    return (
        <footer className="relative w-full">
            {/* CTA Section - Dark Background */}
            <div className="bg-brand-dark text-white py-20 px-4 sm:px-6 lg:px-8 rounded-t-[2.5rem] mt-20 relative overflow-hidden">
                {/* Background Pattern - Using GridPattern like teams section */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 opacity-40">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/10">
                            <GridPattern
                                width={20}
                                height={20}
                                x="-12"
                                y="4"
                                squares={[
                                    [4, 3],
                                    [2, 1],
                                    [7, 3],
                                    [10, 6],
                                    [15, 8],
                                    [3, 9],
                                    [12, 2],
                                    [8, 7],
                                ]}
                                className="fill-white/10 stroke-white/20 absolute inset-0 h-full w-full"
                            />
                        </div>
                        {/* Mask gradients - only affect the pattern layer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/30 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-dark/60" />
                    </div>
                </div>
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-24">

                        {/* Left Side: Heading & Description */}
                        <div className="max-w-2xl w-full">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1] font-sans">
                                Generate Ideas, <br />
                                build confidence
                            </h2>
                            <p className="text-lg text-white/60 mb-8 max-w-xl leading-relaxed">
                                Get started with Stepps.ai today. Stop writing docs manually and start generating beautiful guides in seconds.
                            </p>

                            <WaitlistForm variant="footer" />
                        </div>
                    </div>

                    {/* Footer Links Section - Simplified */}
                    <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between gap-12 items-center">

                        {/* Brand */}
                        <div className="space-y-4">
                            <Link href="/" className="flex items-center gap-2">
                                <span className="font-sans text-2xl font-bold tracking-tight text-white">
                                    Stepps.ai
                                </span>
                            </Link>
                        </div>

                        {/* Copyright & Legal */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 text-xs text-white/40">
                            <p>© 2025 Stepps.ai. All rights reserved.</p>
                            <div className="flex gap-6">
                                <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                                <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
