import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AiAssistant } from "@/components/ai-assistant";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Leandro Tenório — Dados & IA",
  description:
    "Análise de dados, Machine Learning e aplicações web. Conheça os projetos de Leandro Tenório e converse sobre seu próximo desafio.",
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
  themeColor: "#F7F7FB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
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
