"use client"

import type React from "react"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import {
  ArrowUpRight,
  Bot,
  Briefcase,
  Cpu,
  Download,
  FileText,
  Github,
  Home,
  Linkedin,
  Mail,
  Phone,
  Search,
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
import { contactInfo, cvPaths, navItems } from "@/lib/nav"

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

const navIcons: Record<string, typeof Home> = {
  home: Home,
  about: Search,
  experience: Briefcase,
  projects: ArrowUpRight,
  tech: Cpu,
  cv: FileText,
  contact: Mail,
}

export function CommandMenu() {
  const { open, setOpen } = useCommandMenu()

  const { email, phoneDisplay, phoneTel, github, linkedin } = contactInfo

  const navigate = (hash: string) => {
    setOpen(false)
    window.requestAnimationFrame(() => scrollToHash(hash))
  }

  const openExternal = (href: string) => {
    setOpen(false)
    window.open(href, "_blank", "noopener,noreferrer")
  }

  const downloadCv = (path: string) => {
    setOpen(false)
    const link = document.createElement("a")
    link.href = path
    link.download = ""
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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

  const openKortex = () => {
    setOpen(false)
    window.dispatchEvent(new Event("ai-assistant:open"))
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Console" description="Navegue e execute comandos rápidos.">
      <CommandInput placeholder="> buscar… (ex: projetos, cv, email)" />
      <CommandList>
        <CommandEmpty>Nenhum resultado.</CommandEmpty>

        <CommandGroup heading="navegação">
          {navItems.map((item) => {
            const Icon = navIcons[item.id] ?? Home
            return (
              <CommandItem key={item.id} onSelect={() => navigate(`#${item.id}`)}>
                <Icon />
                <span className="tabular-nums opacity-60">{item.index}</span>
                {item.title}
              </CommandItem>
            )
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="ações">
          <CommandItem onSelect={openKortex}>
            <Bot />
            Abrir assistente (Kórtex)
          </CommandItem>
          <CommandItem onSelect={() => downloadCv(cvPaths.pdf)}>
            <Download />
            Baixar CV (PDF)
          </CommandItem>
          <CommandItem onSelect={() => downloadCv(cvPaths.docx)}>
            <FileText />
            Baixar CV (Word)
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

        <CommandGroup heading="social">
          <CommandItem onSelect={() => openExternal(github)}>
            <Github />
            GitHub
          </CommandItem>
          <CommandItem onSelect={() => openExternal(linkedin)}>
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
