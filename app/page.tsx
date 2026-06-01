"use client"

import { AmbientBackground } from "@/components/ambient-background"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/hero"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { TechSection } from "@/components/tech-section"
import { CvSection } from "@/components/cv-section"
import { ContactSection } from "@/components/contact-section"
import { CommandMenu, CommandMenuProvider } from "@/components/command-menu"

export default function Home() {
  return (
    <CommandMenuProvider>
      <div className="relative isolate min-h-[100svh] overflow-x-clip bg-background">
        <AmbientBackground />
        <CommandMenu />
        <SiteNav />

        <main className="relative z-10">
          <Hero />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <TechSection />
          <CvSection />
          <ContactSection />
        </main>

        <SiteFooter />
      </div>
    </CommandMenuProvider>
  )
}
