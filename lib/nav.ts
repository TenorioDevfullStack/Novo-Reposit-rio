export type NavItem = {
  id: string
  index: string
  label: string
  title: string
}

export const navItems: NavItem[] = [
  { id: "home", index: "00", label: "Início", title: "Início" },
  { id: "about", index: "01", label: "Perfil", title: "Perfil" },
  { id: "experience", index: "02", label: "Trajetória", title: "Trajetória" },
  { id: "projects", index: "03", label: "Projetos", title: "Projetos" },
  { id: "tech", index: "04", label: "Stack", title: "Stack" },
  { id: "cv", index: "05", label: "Currículo", title: "Currículo" },
  { id: "contact", index: "06", label: "Contato", title: "Contato" },
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
