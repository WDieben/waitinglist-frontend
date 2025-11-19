import Hero from '@/components/hero'
import HowItWorks from '@/components/how-it-works'
import BuiltForTeams from '@/components/built-for-teams'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary relative">
      {/* Background Gradient Layer - visible across all sections except footer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-background via-50% to-secondary/[0.06]" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-accent/[0.04] to-transparent blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <HowItWorks />
        <BuiltForTeams />
      </div>

      {/* Footer - outside gradient layer */}
      <Footer />
    </main>
  )
}
