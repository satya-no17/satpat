'use client'

import { Button } from '@/components/ui/button'
import { ArrowUp, BriefcaseBusiness, Camera, Download, GitBranch, ImagePlus, Layers3, MousePointer2, Sparkles, TriangleAlert, WandSparkles } from 'lucide-react'
import React, { useState } from 'react'

// Replace these placeholder URLs with Satya's public profiles before launch.
const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/satya-no17', icon: GitBranch },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/satyam-kumar-929b97325/', icon: BriefcaseBusiness },
  { label: 'Instagram', href: 'https://www.instagram.com/dumb_not_in_love/', icon: Camera },
]

const Hero = ({ dashboard = false }) => {
  const [prompt, setPrompt] = useState('')
  const [showProjectWarning, setShowProjectWarning] = useState(false)

  const handlePromptChange = (event) => {
    setPrompt(event.target.value)

    if (dashboard && event.target.value.trim()) {
      setShowProjectWarning(true)
    } else {
      setShowProjectWarning(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (dashboard && prompt.trim()) {
      setShowProjectWarning(true)
    }
  }

  return (
    <div className={dashboard ? 'px-4 py-10 sm:px-6' : ''}>
      <section className={`relative isolate flex flex-col items-center justify-center overflow-hidden text-center ${dashboard ? 'min-h-[calc(100vh-5rem)] rounded-3xl border bg-gradient-to-br from-emerald-50 via-background to-background px-5 py-16 dark:from-emerald-950/25' : 'min-h-[90vh] px-5 py-20'}`}>
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/15 blur-3xl" />

        {!dashboard && (
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">
            <Sparkles className="size-4" /> Turn ideas into polished interfaces
          </div>
        )}
        <h1 className="max-w-4xl bg-gradient-to-br from-foreground via-emerald-700 to-emerald-950 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl dark:from-white dark:via-emerald-300 dark:to-emerald-600">
          {dashboard ? 'Start with a project' : 'What do you want to design?'}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          {dashboard
            ? 'Create a project from the sidebar, then open it to describe and build your next idea.'
            : 'Describe your idea and generate a beautiful landing page in seconds.'}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 w-full max-w-2xl rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-[#070b08] via-[#072616] to-black p-4 text-left shadow-2xl shadow-emerald-950/20">
          <textarea
            className="h-36 w-full resize-none bg-transparent px-2 pt-2 text-base text-white placeholder:text-zinc-400 focus:outline-none"
            placeholder={dashboard ? 'Describe what you want to build...' : 'Describe your design...'}
            value={prompt}
            onChange={handlePromptChange}
            aria-describedby={dashboard && showProjectWarning ? 'project-warning' : undefined}
          />
          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
            <Button type="button" variant="ghost" size="icon" className="text-zinc-300 hover:text-white" aria-label="Add an image">
              <ImagePlus className="size-5" />
            </Button>
            <Button type="submit" size="icon" className="rounded-full" aria-label="Send prompt">
              <ArrowUp className="size-5" />
            </Button>
          </div>
        </form>

        {dashboard && showProjectWarning && (
          <div id="project-warning" role="alert" className="mt-4 flex max-w-2xl items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-left text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
            <TriangleAlert className="mt-0.5 size-5 shrink-0" />
            <p>Please create a project first, then open it from the sidebar to start building with chat.</p>
          </div>
        )}
      </section>

      {!dashboard && (
        <>
          <section id="about" className="mx-auto grid max-w-6xl gap-8 px-5 py-20 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">About SatPat Build</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">A calmer way to begin building.</h2>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">SatPat Build helps you turn a rough product thought into a clear, beautiful starting point. Describe the experience you have in mind and let the workspace help you shape it, one project at a time. It uses a non-reasoning model, so it does not store or reuse information from previous chats but you can save it inside a project for future.</p>
          </section>

          <section className="mx-auto max-w-6xl px-5 py-8 sm:py-16">
            <div className="mb-10 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">How it works</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">From a simple thought to an editable interface.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600"><WandSparkles className="size-5" /></div>
                <h3 className="mt-5 text-lg font-semibold">1. Describe</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Tell SatPat Build about the section, page, or component you want to create.</p>
              </div>
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600"><MousePointer2 className="size-5" /></div>
                <h3 className="mt-5 text-lg font-semibold">2. Refine</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Select generated elements and tune their text, spacing, color, alignment, and classes.</p>
              </div>
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600"><Download className="size-5" /></div>
                <h3 className="mt-5 text-lg font-semibold">3. Take it further</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Save the project or export the finished component as plain HTML or a React file.</p>
              </div>
            </div>
          </section>

          <section id="pricing" className="mx-auto max-w-6xl px-5 pb-24">
            <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-50 to-background p-8 shadow-sm dark:from-emerald-950/20 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Pricing</p>
              <div className="mt-4 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Free during testing</h2>
                  <p className="mt-2 max-w-2xl text-muted-foreground">SatPat Build is currently a testing experience. The full SaaS plans, billing, and credits system will be introduced later.</p>
                </div>
                <div className="shrink-0 text-left sm:text-right">
                  <p className="text-3xl font-bold">₹0</p>
                  <p className="text-sm text-muted-foreground">for the testing period</p>
                </div>
              </div>
            </div>
          </section>

          <footer className="border-t bg-card/50">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-5 py-10 text-center sm:flex-row sm:text-left">
              <div>
                <div className="flex items-center justify-center gap-2 sm:justify-start">
                  <Layers3 className="size-5 text-emerald-600" />
                  <span className="font-semibold">SatPat Build</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Built with care by Satya.</p>
              </div>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`Satya on ${label}`} className="flex size-10 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-600">
                    <Icon className="size-5" />
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  )
}

export default Hero
