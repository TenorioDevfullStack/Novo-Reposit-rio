export type NavItem = {
  id: string
  index: string
  label: string
  title: string
}

export const navItems: NavItem[] = [
  { id: "home", index: "00", label: "INIT", title: "Início" },
  { id: "about", index: "01", label: "PROFILE", title: "Perfil" },
  { id: "experience", index: "02", label: "LOG", title: "Trajetória" },
  { id: "projects", index: "03", label: "PROC", title: "Projetos" },
  { id: "tech", index: "04", label: "STACK", title: "Stack" },
  { id: "cv", index: "05", label: "EXPORT", title: "Currículo" },
  { id: "contact", index: "06", label: "UPLINK", title: "Contato" },
]

export const navIds = navItems.map((item) => item.id)

export const contactInfo = {
  email: "intelligentdevsolutions@gmail.com",
  phoneDisplay: "11 98943-7498",
  phoneTel: "+5511989437498",
  github: "https://github.com/TenorioDevfullStack",
  linkedin: "https://www.linkedin.com/in/leandro-ten%C3%B3rio-088378310/",
}

export const cvPaths = {
  pdf: "/cv/CV_Leandro_Tenorio_Dados.pdf",
  docx: "/cv/CV_Leandro_Tenorio_Dados.docx",
}
