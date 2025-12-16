"use client"

import { Sidebar } from "@/components/sidebar"
import { BackgroundGrid } from "@/components/background-grid"
import { Hero } from "@/components/hero"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { TechSection } from "@/components/tech-section"
import { ContactSection } from "@/components/contact-section"
import { AnimatedBg } from "@/components/animated-bg"
import { Spotlight } from "@/components/spotlight"
import { ScrollProgress } from "@/components/scroll-progress"
import { CommandMenu, CommandMenuProvider } from "@/components/command-menu"

export default function Home() {
  return (
    <CommandMenuProvider>
      <div className="flex min-h-screen bg-background overflow-x-hidden relative isolate">
        <ScrollProgress />
        <CommandMenu />
        <BackgroundGrid />
        <AnimatedBg />
        <Spotlight />
        <Sidebar />

        <main className="flex-1 lg:ml-64 relative z-10">
          <Hero />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <TechSection />
          <ContactSection />
        </main>
      </div>
    </CommandMenuProvider>
  )
}
