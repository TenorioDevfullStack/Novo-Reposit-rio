import type React from "react";
import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AiAssistant } from "@/components/ai-assistant";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Leandro Tenório — Mission Control · Dados & IA",
  description:
    "Estudante de IA em transição para a área de Dados. Painel de comando com perfil, experiência, projetos e currículo de Leandro Tenório.",
  generator: "v0.app",
  manifest: "/logos/site.webmanifest",
  icons: {
    icon: [
      { url: "/logos/favicon.svg", type: "image/svg+xml" },
      { url: "/logos/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/logos/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/logos/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0e1311",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-mono antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <Toaster richColors closeButton />
          <AiAssistant showLauncher={true} />
        </ThemeProvider>
      </body>
    </html>
  );
}
