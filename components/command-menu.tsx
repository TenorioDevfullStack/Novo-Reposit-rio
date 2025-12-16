"use client"

import type React from "react"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import {
  ArrowUpRight,
  Briefcase,
  Cpu,
  Github,
  Home,
  Linkedin,
  Mail,
  Moon,
  Phone,
  Search,
  Sun,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

type CommandMenuContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  openMenu: () => void
}

const CommandMenuContext = createContext<CommandMenuContextValue | null>(null)

export function CommandMenuProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  const openMenu = useCallback(() => setOpen(true), [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isK = event.key.toLowerCase() === "k"
      if ((event.metaKey || event.ctrlKey) && isK) {
        event.preventDefault()
        setOpen((v) => !v)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const value = useMemo(() => ({ open, setOpen, openMenu }), [open, openMenu])

  return <CommandMenuContext.Provider value={value}>{children}</CommandMenuContext.Provider>
}

export function useCommandMenu() {
  const ctx = useContext(CommandMenuContext)
  if (!ctx) throw new Error("useCommandMenu must be used within <CommandMenuProvider />")
  return ctx
}

function scrollToHash(hash: string) {
  if (hash === "#home") {
    window.scrollTo({ top: 0, behavior: "smooth" })
    return
  }

  const el = document.querySelector(hash)
  if (!(el instanceof HTMLElement)) return
  el.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function CommandMenu() {
  const { open, setOpen } = useCommandMenu()
  const { resolvedTheme, setTheme } = useTheme()

  const email = "intelligentdevsolutions@gmail.com"
  const phoneDisplay = "11 98943-7498"
  const phoneTel = "+5511989437498"
  const githubUrl = "https://github.com/TenorioDevfullStack"
  const linkedinUrl = "https://www.linkedin.com/in/leandro-ten%C3%B3rio-088378310/"

  const navigate = (hash: string) => {
    setOpen(false)
    window.requestAnimationFrame(() => scrollToHash(hash))
  }

  const openExternal = (href: string) => {
    setOpen(false)
    window.open(href, "_blank", "noopener,noreferrer")
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      toast.success("Email copiado", { description: email })
    } catch {
      toast.error("Não foi possível copiar o email")
    } finally {
      setOpen(false)
    }
  }

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phoneDisplay)
      toast.success("Telefone copiado", { description: phoneDisplay })
    } catch {
      toast.error("Não foi possível copiar o telefone")
    } finally {
      setOpen(false)
    }
  }

  const callPhone = () => {
    setOpen(false)
    window.location.href = `tel:${phoneTel}`
  }

  const toggleTheme = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark"
    setTheme(next)
    toast.message(next === "dark" ? "Tema escuro" : "Tema claro")
    setOpen(false)
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Atalhos" description="Navegue e execute ações rápidas.">
      <CommandInput placeholder="Buscar… (ex: projetos, email, tema)" />
      <CommandList>
        <CommandEmpty>Nenhum resultado.</CommandEmpty>

        <CommandGroup heading="Navegação">
          <CommandItem onSelect={() => navigate("#home")}>
            <Home />
            Início
          </CommandItem>
          <CommandItem onSelect={() => navigate("#about")}>
            <Search />
            Sobre
          </CommandItem>
          <CommandItem onSelect={() => navigate("#experience")}>
            <Briefcase />
            Experiência
          </CommandItem>
          <CommandItem onSelect={() => navigate("#projects")}>
            <ArrowUpRight />
            Projetos
          </CommandItem>
          <CommandItem onSelect={() => navigate("#tech")}>
            <Cpu />
            Tecnologias
          </CommandItem>
          <CommandItem onSelect={() => navigate("#contact")}>
            <Mail />
            Contato
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Ações">
          <CommandItem onSelect={toggleTheme}>
            {resolvedTheme === "dark" ? <Sun /> : <Moon />}
            Alternar tema
          </CommandItem>
          <CommandItem onSelect={copyEmail}>
            <Mail />
            Copiar email
          </CommandItem>
          <CommandItem onSelect={copyPhone}>
            <Phone />
            Copiar telefone
          </CommandItem>
          <CommandItem onSelect={callPhone}>
            <Phone />
            Ligar
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Social">
          <CommandItem onSelect={() => openExternal(githubUrl)}>
            <Github />
            GitHub
          </CommandItem>
          <CommandItem onSelect={() => openExternal(linkedinUrl)}>
            <Linkedin />
            LinkedIn
          </CommandItem>
          <CommandItem onSelect={() => openExternal(`mailto:${email}`)}>
            <Mail />
            Email
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
