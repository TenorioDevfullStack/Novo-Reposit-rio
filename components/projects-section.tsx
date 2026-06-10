"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Github,
  Link as LinkIcon,
  Sparkles,
  X,
  Building2,
  Boxes,
  Globe,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { SectionHead } from "@/components/section-head"

type Project = {
  title: string
  category: string
  description: string
  longDescription: string
  tags: string[]
  icon: LucideIcon
  highlights: string[]
  links: {
    demo?: string
    github?: string
  }
  images: string[]
}

const projects: Project[] = [
  {
    title: "AstroMonitor",
    category: "Global Solution 2026.1 — FIAP",
    description: "Plataforma de monitoramento ambiental satelital com dados, Machine Learning e visão computacional para previsão de risco de incêndios.",
    longDescription:
      "Prova de conceito da Global Solution da FIAP: monitoramento ambiental que cruza dados de satélite e sensores para prever risco de queimadas por região, com mapa de risco interativo, predições por Machine Learning e validação com dados reais do INPE (backtest do Pantanal 2024).",
    tags: ["Python", "Machine Learning", "Scikit-learn", "Visão Computacional", "PostgreSQL", "Supabase", "IA"],
    icon: Globe,
    highlights: [
      "Predição de risco de incêndio com GradientBoosting",
      "Visão computacional: NDVI e mapa de calor por satélite",
      "Validação com dados reais do INPE (Pantanal 2024)",
    ],
    links: {
      demo: "https://astromonitor-dfjfv9n7qxdqca9v4ecrdo.streamlit.app/",
    },
    images: [
      "/imagens/astro-monitor/print-astro-monitor01.webp",
      "/imagens/astro-monitor/print-astro-monitor02.webp",
      "/imagens/astro-monitor/print-astro-monitor03.webp",
      "/imagens/astro-monitor/print-astro-monitor04.webp",
      "/imagens/astro-monitor/print-astro-monitor05.webp",
      "/imagens/astro-monitor/print-astro-monitor06.webp",
      "/imagens/astro-monitor/print-astro-monitor07.webp",
      "/imagens/astro-monitor/print-astro-monitor08.webp",
      "/imagens/astro-monitor/print-astro-monitor09.webp",
      "/imagens/astro-monitor/print-astro-monitor10.webp",
    ],
  },
  {
    title: "SafeHarvest AI",
    category: "Challenge Sompo Seguros — FIAP",
    description: "Sistema preditivo de risco operacional e ambiental para equipamentos agrícolas, desenvolvido para o Challenge Sompo Seguros.",
    longDescription:
      "Solução de dados e IA para o Challenge Sompo Seguros (FIAP 2026) que prevê riscos como atolamento e tombamento em operações agrícolas. Um modelo Gradient Boosting (acurácia 97,9%) gera um score de risco por equipamento, servido por uma API REST em Flask com dashboards por perfil de usuário.",
    tags: ["Python", "Machine Learning", "Gradient Boosting", "Scikit-learn", "Flask", "JWT", "SQL"],
    icon: ShieldCheck,
    highlights: [
      "Modelo Gradient Boosting com acurácia de 97,9%",
      "Score de risco (0–100) por equipamento",
      "API Flask com dashboards por perfil de usuário",
    ],
    links: {},
    images: [
      "/imagens/safe-harvest/print-safe-harvest01.webp",
      "/imagens/safe-harvest/tela-operador.webp",
      "/imagens/safe-harvest/tela-gestor01.webp",
      "/imagens/safe-harvest/tela-gestor02.webp",
      "/imagens/safe-harvest/tela-analista-sompo01.webp",
      "/imagens/safe-harvest/tela-analista-sompo02.webp",
    ],
  },
  {
    title: "Vitrine",
    category: "Aplicação Full Stack",
    description:
      "E-commerce full-stack com foco em MongoDB avançado: schema flexível por categoria, aggregation pipelines e checkout com transação multi-documento.",
    longDescription:
      "Loja virtual completa (Express + Mongoose no back-end, React + Vite no front-end) construída para demonstrar modelagem avançada de MongoDB: produtos com atributos flexíveis por categoria, decisão consciente de embedding vs referencing (o pedido congela um snapshot dos preços; o carrinho referencia o preço vivo), relatórios com aggregation pipelines, índices justificados e transação multi-documento no checkout. Inclui autenticação JWT com papéis admin/cliente, documentação Swagger e testes com MongoDB em memória.",
    tags: ["MongoDB", "TypeScript", "React", "Node.js", "Express", "Mongoose", "Tailwind CSS", "JWT", "Swagger"],
    icon: ShoppingBag,
    highlights: [
      "Checkout atômico com transação multi-documento e rollback",
      "Embedding vs referencing: pedido com snapshot imutável, carrinho com preço vivo",
      "Relatórios com aggregation pipelines ($group, $lookup, $unwind)",
    ],
    links: {
      github: "https://github.com/TenorioDevfullStack/vitrine-ecommerce",
    },
    images: [
      "/imagens/vitrine/print-catalogo.png",
      "/imagens/vitrine/print-produto.png",
      "/imagens/vitrine/print-carrinho.png",
      "/imagens/vitrine/print-pedido-confirmado.png",
      "/imagens/vitrine/print-meus-pedidos.png",
      "/imagens/vitrine/print-admin.png",
    ],
  },
  {
    title: "ImobAI",
    category: "Projeto de IA",
    description: "Aplicação que gera legendas de marketing automáticas a partir de fotos de imóveis usando IA Gemini.",
    longDescription:
      "O ImobAI permite subir fotos de imóveis e, com poucos dados básicos, a IA gera legendas persuasivas e otimizadas para redes sociais — explorando análise de imagem (visão computacional) e geração de texto com IA.",
    tags: ["Next.js", "Gemini AI", "TypeScript", "Tailwind CSS"],
    icon: Sparkles,
    highlights: ["Geração de legendas por IA", "Análise de imagem (visão computacional)", "Vários tons de voz selecionáveis"],
    links: {
      demo: "/imobai",
    },
    images: ["/imagens/imobai/Sem título.png"],
  },
  {
    title: "ObraGest",
    category: "Aplicação Full Stack",
    description: "Sistema para gestão de obras e projetos, com dashboards e módulos de controle de rotinas.",
    longDescription:
      "Aplicação Full Stack para organização e acompanhamento de obras, centralizando informações e fluxos. Envolve modelagem e integração de banco de dados, dashboards e áreas administrativas.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Docker", "Vercel"],
    icon: Building2,
    highlights: ["Dashboard e visão geral", "Modelagem e integração de dados (PostgreSQL/Prisma)", "Configurações e áreas administrativas"],
    links: {
      demo: "https://obragest.online",
    },
    images: [
      "/imagens/obragest/dashboard.png",
      "/imagens/obragest/projetos.png",
      "/imagens/obragest/organizacao.png",
      "/imagens/obragest/orcamentos.png",
      "/imagens/obragest/financas.png",
      "/imagens/obragest/config.png",
    ],
  },
  {
    title: "StockManager",
    category: "Aplicação de dados",
    description: "Sistema de controle e gerenciamento de estoque para equipes de manutenção, com foco em organização e rastreabilidade dos dados.",
    longDescription:
      "Sistema de controle de estoque para equipes de manutenção. Centraliza materiais, movimentações de entrada e retirada e equipe, com dashboard de métricas, alertas de estoque e exportação de relatórios em CSV.",
    tags: ["JavaScript", "Estoque", "Dashboard", "Relatórios CSV", "Rastreabilidade"],
    icon: Boxes,
    highlights: [
      "Dashboard com métricas e alertas de estoque",
      "Cadastro de materiais com SKU e localização",
      "Relatórios e exportação de dados em CSV",
    ],
    links: {
      demo: "https://stock-manager-two-iota.vercel.app/",
    },
    images: [
      "/imagens/stock-manager/print-dashboard.webp",
      "/imagens/stock-manager/print-materiais.webp",
      "/imagens/stock-manager/print-movimentacoes.webp",
      "/imagens/stock-manager/print-equipe.webp",
      "/imagens/stock-manager/print-docs.webp",
      "/imagens/stock-manager/print-relatorios.webp",
    ],
  },
]

export function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation()
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  const selected = selectedIndex != null ? projects[selectedIndex] : null
  const lightboxImages = useMemo(() => selected?.images ?? [], [selected])

  useEffect(() => setMounted(true), [])

  const openProject = (idx: number) => {
    setSelectedIndex(idx)
    setLightboxOpen(false)
    setLightboxIndex(0)
    setOpen(true)
  }

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx)
    setLightboxOpen(true)
    setOpen(false)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setOpen(true)
  }

  const canNavigateLightbox = lightboxImages.length > 1
  const nextLightbox = () => {
    if (!canNavigateLightbox) return
    setLightboxIndex((i) => (i + 1) % lightboxImages.length)
  }
  const prevLightbox = () => {
    if (!canNavigateLightbox) return
    setLightboxIndex((i) => (i - 1 + lightboxImages.length) % lightboxImages.length)
  }

  useEffect(() => {
    if (!lightboxOpen) return
    const imagesLength = lightboxImages.length
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox()
        return
      }
      if (imagesLength <= 1) return
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % imagesLength)
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + imagesLength) % imagesLength)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [lightboxOpen, lightboxImages.length])

  useEffect(() => {
    if (!lightboxOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [lightboxOpen])

  const lightbox =
    mounted && lightboxOpen && selected
      ? createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/80 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={`Visualização ampliada das imagens do projeto ${selected.title}`}
            onClick={closeLightbox}
          >
            <div className="w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 text-background">
                  <p className="truncate text-sm font-semibold">{selected.title}</p>
                  <p className="text-xs text-background/70">
                    Imagem {Math.min(lightboxIndex + 1, lightboxImages.length)} / {lightboxImages.length}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {canNavigateLightbox ? (
                    <>
                      <Button variant="secondary" className="h-8 gap-2 px-3 text-xs" onClick={prevLightbox}>
                        <ChevronLeft size={16} />
                        Anterior
                      </Button>
                      <Button variant="secondary" className="h-8 gap-2 px-3 text-xs" onClick={nextLightbox}>
                        Próxima
                        <ChevronRight size={16} />
                      </Button>
                    </>
                  ) : null}
                  <Button variant="secondary" className="h-8 gap-2 px-3 text-xs" onClick={closeLightbox}>
                    <X size={16} />
                    Fechar
                  </Button>
                </div>
              </div>
              <div className="relative h-[78vh] w-full overflow-hidden rounded-xl border border-background/20 bg-foreground/40">
                <Image
                  src={lightboxImages[lightboxIndex] ?? selected.images[0]}
                  alt={`${selected.title} — imagem ${lightboxIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>,
          document.body,
        )
      : null

  return (
    <section ref={ref} id="projects" className="relative scroll-mt-20 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div
        className={`mx-auto max-w-6xl space-y-8 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <SectionHead
          index="03"
          label="Projetos"
          title={
            <>
              Projetos em <span className="gradient-text">destaque</span>
            </>
          }
          subtitle={`${projects.length} projetos — acadêmicos em Dados/IA e aplicações construídas na prática. Clique em um card para ver os detalhes.`}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => {
            const Icon = project.icon
            return (
              <button
                key={project.title}
                type="button"
                onClick={() => openProject(idx)}
                className={`card-surface card-hover group flex flex-col p-5 text-left ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: isVisible ? `${idx * 60}ms` : "0ms" }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Icon size={18} />
                  </span>
                  <h3 className="font-display text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>
                </div>

                <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  {project.category}
                </p>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

                <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Ver detalhes
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </p>
              </button>
            )
          })}
        </div>
      </div>

      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next)
          if (!next) {
            setLightboxOpen(false)
            setSelectedIndex(null)
          }
        }}
      >
        <DialogContent className="w-[95vw] max-h-[90svh] overflow-y-auto overflow-x-hidden rounded-2xl bg-card p-0 sm:max-w-3xl">
          {selected ? (
            <div className="grid lg:grid-cols-2">
              <div className="bg-muted/50 p-5 lg:p-6">
                {selected.images.length > 0 ? (
                  <>
                    <Carousel opts={{ loop: true }} className="w-full">
                      <CarouselContent>
                        {selected.images.map((src, i) => (
                          <CarouselItem key={`${src}-${i}`}>
                            <button
                              type="button"
                              className="group/image w-full text-left"
                              onClick={() => openLightbox(i)}
                              aria-label={`Ampliar imagem ${i + 1} do projeto ${selected.title}`}
                            >
                              <AspectRatio
                                ratio={16 / 9}
                                className="cursor-zoom-in overflow-hidden rounded-xl border border-border"
                              >
                                <Image
                                  src={src}
                                  alt={selected.title}
                                  fill
                                  sizes="(min-width: 1024px) 50vw, 100vw"
                                  className="object-cover transition-transform duration-300 group-hover/image:scale-[1.02]"
                                  priority={i === 0}
                                />
                              </AspectRatio>
                            </button>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-2 -translate-y-1/2" />
                      <CarouselNext className="right-2 -translate-y-1/2" />
                    </Carousel>
                    <p className="flex items-center gap-2 pt-3 text-xs text-muted-foreground">
                      <span className="text-accent">›</span> Clique na imagem para ampliar
                    </p>
                  </>
                ) : (
                  <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl border border-border">
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      <selected.icon className="h-16 w-16 text-primary/50" />
                    </div>
                  </AspectRatio>
                )}
              </div>

              <div className="space-y-6 p-5 lg:p-6">
                <DialogHeader>
                  <p className="eyebrow">{selected.category}</p>
                  <DialogTitle className="font-display text-2xl">{selected.title}</DialogTitle>
                  <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                    {selected.longDescription}
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-wrap gap-1.5">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="eyebrow">Destaques</h4>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {selected.highlights.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-accent">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                  {selected.links.demo ? (
                    <Button asChild className="gap-2 rounded-full text-sm">
                      <a href={selected.links.demo} target="_blank" rel="noopener noreferrer">
                        <LinkIcon size={15} />
                        Abrir demo
                      </a>
                    </Button>
                  ) : null}
                  {selected.links.github ? (
                    <Button variant="outline" asChild className="gap-2 rounded-full text-sm">
                      <a href={selected.links.github} target="_blank" rel="noopener noreferrer">
                        <Github size={15} />
                        Ver código
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
      {lightbox}
    </section>
  )
}
