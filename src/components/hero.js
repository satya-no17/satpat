'use client'

import { Button } from '@/components/ui/button'
import { ArrowUp, Download, ImagePlus, MousePointer2, Sparkles, TriangleAlert, WandSparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/satya-no17' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/satyam-kumar-929b97325/' },
  { label: 'Instagram', href: 'https://www.instagram.com/dumb_not_in_love/' },
]

const Hero = ({ dashboard = false }) => {
  const [prompt, setPrompt] = useState('')
  const [showProjectWarning, setShowProjectWarning] = useState(false)
  const [visibleSections, setVisibleSections] = useState(() => new Set())

  useEffect(() => {
    if (dashboard) return undefined
    if (!('IntersectionObserver' in window)) {
      setVisibleSections(new Set(['about', 'phase', 'pricing', 'docs']))
      return undefined
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const sectionId = entry.target.dataset.reveal
        if (sectionId) {
          setVisibleSections((current) => new Set([...current, sectionId]))
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14 })

    document.querySelectorAll('[data-reveal]').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [dashboard])

  const handlePromptChange = (event) => {
    const value = event.target.value
    setPrompt(value)
    setShowProjectWarning(Boolean(dashboard && value.trim()))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (dashboard && prompt.trim()) setShowProjectWarning(true)
  }

  return (
    <div className={dashboard ? 'px-4 py-10 sm:px-6' : ''}>
      <section className={`relative isolate flex flex-col items-center justify-center overflow-hidden px-5 py-20 text-center ${dashboard ? 'min-h-[calc(100vh-5rem)] rounded-3xl border bg-gradient-to-br from-emerald-50 via-background to-background dark:from-emerald-950/25' : 'min-h-[calc(100svh-4rem)]'}`}>
        <div className="landing-float pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/15 blur-3xl" />
        {!dashboard && <div className="landing-rise mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-300"><Sparkles className="size-4" /> Turn ideas into polished interfaces</div>}
        <h1 className="landing-rise landing-rise-delay-1 max-w-4xl bg-gradient-to-br from-foreground via-emerald-700 to-emerald-950 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl dark:from-white dark:via-emerald-300 dark:to-emerald-600">{dashboard ? 'Start with a project' : 'What do you want to design?'}</h1>
        <p className="landing-rise landing-rise-delay-2 mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">{dashboard ? 'Create a project from the sidebar, then open it to describe and build your next idea.' : 'Turn a rough idea into an editable component or page. Describe the layout, style, and content you need, then refine the generated interface in your own workspace.'}</p>
        {!dashboard && <div className="landing-rise landing-rise-delay-3 mt-6 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground"><span className="rounded-full border bg-card/70 px-4 py-2">Describe a component or page</span><span className="rounded-full border bg-card/70 px-4 py-2">Edit the generated UI</span><span className="rounded-full border bg-card/70 px-4 py-2">Export when it feels right</span></div>}
        <form onSubmit={handleSubmit} className="landing-rise landing-rise-delay-3 mt-8 w-full max-w-2xl rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-[#070b08] via-[#072616] to-black p-4 text-left shadow-2xl shadow-emerald-950/20">
          <textarea className="h-36 w-full resize-none bg-transparent px-2 pt-2 text-base text-white placeholder:text-zinc-400 focus:outline-none" placeholder={dashboard ? 'Describe what you want to build...' : 'Describe your design...'} value={prompt} onChange={handlePromptChange} aria-describedby={dashboard && showProjectWarning ? 'project-warning' : undefined} />
          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3"><Button type="button" variant="ghost" size="icon" className="text-zinc-300 hover:text-white" aria-label="Add an image"><ImagePlus className="size-5" /></Button><Button type="submit" size="icon" className="rounded-full" aria-label="Send prompt"><ArrowUp className="size-5" /></Button></div>
        </form>
        {dashboard && showProjectWarning && <div id="project-warning" role="alert" className="mt-4 flex max-w-2xl items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-left text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100"><TriangleAlert className="mt-0.5 size-5 shrink-0" /><p>Please create a project first, then open it from the sidebar to start building with chat.</p></div>}
      </section>

      {!dashboard && <>
        <section id="about" data-reveal="about" className={`section-reveal mx-auto grid min-h-[80svh] max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1fr_1.2fr] md:items-center ${visibleSections.has('about') ? 'section-reveal-visible' : ''}`}>
          <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">About SatPat Build</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">A calm place to begin building.</h2></div>
          <div className="space-y-6 text-lg leading-8 text-muted-foreground"><p>SatPat Build helps you turn a rough product thought into a clear, beautiful interface starting point. It is focused on individual components and pages, rather than generating an entire website at once.</p><p>Describe the experience you have in mind, generate a working visual direction, then keep shaping it inside a project. The goal is to make the first useful version feel close, not final.</p><div className="grid gap-4 pt-3 sm:grid-cols-3"><div><WandSparkles className="size-5 text-emerald-600" /><p className="mt-2 text-sm">Describe your idea</p></div><div><MousePointer2 className="size-5 text-emerald-600" /><p className="mt-2 text-sm">Refine the UI</p></div><div><Download className="size-5 text-emerald-600" /><p className="mt-2 text-sm">Export your work</p></div></div></div>
        </section>

        <section id="phase" data-reveal="phase" className={`section-reveal mx-auto grid min-h-[80svh] max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1fr_1.2fr] md:items-center ${visibleSections.has('phase') ? 'section-reveal-visible' : ''}`}>
          <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Testing phase</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Learning in public, before scaling.</h2></div>
          <div className="max-w-2xl space-y-6 text-lg leading-8 text-muted-foreground"><p>SatPat Build is free while the core workflow is tested with real projects and real design prompts. This stage helps us find the details that matter: better outputs, clearer editing, and fewer steps between an idea and a useful component.</p><p>Expect the product to evolve. Feedback, bug reports, and small observations directly help shape a future SaaS that is practical for everyone building interfaces.</p><p className="border-l-2 border-emerald-500 pl-5 text-foreground">The current focus is quality, simplicity, and a workflow that feels quick without feeling disposable.</p></div>
        </section>

        <section id="pricing" data-reveal="pricing" className={`section-reveal flex min-h-[80svh] items-center px-5 py-20 ${visibleSections.has('pricing') ? 'section-reveal-visible' : ''}`}><div className="mx-auto w-full max-w-6xl rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-50 to-background p-8 shadow-sm dark:from-emerald-950/20 sm:p-12"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Pricing</p><div className="mt-6 flex flex-col justify-between gap-8 sm:flex-row sm:items-end"><div><h2 className="text-3xl font-bold tracking-tight sm:text-5xl">Free during testing.</h2><p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">SatPat Build is currently a testing experience. Full SaaS plans, billing, team features, and usage controls will be introduced later, once the workflow is ready to scale.</p></div><div className="shrink-0 sm:text-right"><p className="text-3xl font-bold">INR 0</p><p className="text-sm text-muted-foreground">for the testing period</p></div></div></div></section>

        <section id="docs" data-reveal="docs" className={`section-reveal mx-auto grid min-h-[80svh] max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1fr_1.2fr] md:items-center ${visibleSections.has('docs') ? 'section-reveal-visible' : ''}`}><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Docs</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">A short path from prompt to project.</h2></div><div className="max-w-2xl space-y-6 text-lg leading-8 text-muted-foreground"><p>Create a project, describe the component or page you want, and watch the preview appear as code is generated. Select anything in the preview to adjust its text, style, spacing, alignment, and classes.</p><p>When the design is ready, save the project for later or export it as plain HTML or a React component. The React export is designed as a starting point for a Tailwind-enabled React or Next.js project.</p><a href="/signup" className="inline-flex text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-500">Create an account and start a project →</a></div></section>

        <footer className="border-t border-white/10 bg-[#0d1117] text-slate-400"><div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-5 py-6 text-center text-[11px]"><span>© 2026 SatPat Build. Built by Satya.</span><a href="#about" className="transition-colors hover:text-white">About</a><a href="#phase" className="transition-colors hover:text-white">Testing phase</a><a href="#pricing" className="transition-colors hover:text-white">Pricing</a><a href="#docs" className="transition-colors hover:text-white">Docs</a>{socialLinks.map(({ label, href }) => <a key={label} href={href} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">{label}</a>)}</div></footer>
      </>}
    </div>
  )
}

export default Hero
