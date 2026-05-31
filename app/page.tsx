"use client"

import { BackgroundGrid } from "@/components/background-grid"
import { Hero } from "@/components/hero"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { TechSection } from "@/components/tech-section"
import { CvSection } from "@/components/cv-section"
import { ContactSection } from "@/components/contact-section"
import { DataField } from "@/components/data-field"
import { ConsoleShell } from "@/components/console-shell"
import { CommandMenu, CommandMenuProvider } from "@/components/command-menu"

export default function Home() {
  return (
    <CommandMenuProvider>
      <div className="relative isolate min-h-[100svh] overflow-x-clip bg-background scanlines">
        <BackgroundGrid />
        <DataField />
        <CommandMenu />

        <ConsoleShell>
          <Hero />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <TechSection />
          <CvSection />
          <ContactSection />
        </ConsoleShell>
      </div>
    </CommandMenuProvider>
  )
}
