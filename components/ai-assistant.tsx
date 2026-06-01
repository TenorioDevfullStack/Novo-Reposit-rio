"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { chatWithGemini } from "@/app/actions/chat";

type Message = {
  role: "user" | "model";
  parts: string;
};

type AiAssistantProps = {
  showLauncher?: boolean;
};

export function AiAssistant({ showLauncher = true }: AiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hintDismissed = useRef(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("ai-assistant:open", handleOpen);
    return () => window.removeEventListener("ai-assistant:open", handleOpen);
  }, []);

  // Attention hint: surfaces a little while after load so users notice Kórtex.
  useEffect(() => {
    if (isOpen) {
      hintDismissed.current = true;
      setShowHint(false);
      return;
    }
    if (hintDismissed.current) return;
    const show = window.setTimeout(() => setShowHint(true), 2600);
    const hide = window.setTimeout(() => setShowHint(false), 14000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, [isOpen]);

  const toggleChat = () => {
    hintDismissed.current = true;
    setShowHint(false);
    setIsOpen((v) => !v);
  };

  const dismissHint = () => {
    hintDismissed.current = true;
    setShowHint(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", parts: userMsg }]);
    setIsLoading(true);

    try {
      const response = await chatWithGemini(messages, userMsg);

      const responseText = response.text;

      if (response.success && responseText) {
        setMessages((prev) => [
          ...prev,
          { role: "model", parts: responseText },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            parts: "Desculpe, tive um erro ao processar. Tente novamente.",
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "model", parts: "Erro de conexão." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-5 z-50 flex flex-col items-end gap-4 pointer-events-none sm:right-6">
      {/* Janela do Chat */}
      <div
        className={`
          w-[300px] sm:w-[380px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right flex flex-col pointer-events-auto
          ${isOpen ? "scale-100 opacity-100 translate-y-0 mb-2" : "scale-95 opacity-0 translate-y-10 pointer-events-none h-0 mb-0"}
        `}
        style={{ maxHeight: "500px", height: "60vh" }}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border bg-secondary p-3.5">
          <div className="flex items-center gap-2.5 text-primary">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles size={15} />
            </div>
            <div>
              <p className="font-display text-sm font-semibold leading-none text-foreground">Kórtex</p>
              <p className="mt-1 flex items-center gap-1.5 text-[11px] leading-none text-muted-foreground">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" /> Assistente · online
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-muted-foreground hover:bg-muted hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            <X size={16} />
          </Button>
        </div>

        {/* Área de Mensagens */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-background"
          ref={scrollRef}
        >
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot size={24} className="text-primary" />
              </div>
              <div>
                <p className="font-display font-semibold text-foreground">Olá! Sou o Kórtex</p>
                <p className="text-xs mt-1">
                  Pergunte sobre projetos, stack ou experiência.
                </p>
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "model" && (
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <Bot size={12} className="text-primary" />
                </div>
              )}
              <div
                className={`
                  max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed
                  ${
                    msg.role === "user"
                      ? "rounded-br-sm bg-primary text-primary-foreground"
                      : "rounded-bl-sm border border-border bg-muted text-foreground"
                  }
                `}
              >
                {msg.parts}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2 justify-start">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                <Bot size={12} className="text-primary" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-sm px-3 py-2 flex items-center">
                <Loader2
                  size={14}
                  className="animate-spin text-muted-foreground"
                />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-border bg-background shrink-0">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 h-10 text-sm bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/50"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="h-10 w-10 shrink-0"
              disabled={isLoading || !input.trim()}
            >
              <Send size={16} />
            </Button>
          </form>
        </div>
      </div>

      {/* Launcher — ícone flutuante (todas as telas) */}
      {showLauncher && (
        <div className="flex items-end gap-3">
          {/* hint bubble */}
          {showHint && !isOpen && (
            <div className="card-surface pointer-events-auto relative mb-1 max-w-[13rem] animate-fade-in px-3.5 py-2.5 text-xs leading-relaxed text-muted-foreground sm:max-w-[16rem]">
              <button
                type="button"
                onClick={dismissHint}
                aria-label="Dispensar"
                className="absolute right-1.5 top-1.5 text-muted-foreground transition-colors hover:text-primary"
              >
                <X size={12} />
              </button>
              <p className="pr-3">
                Olá, sou o <span className="font-semibold text-primary">Kórtex</span>. Pergunte sobre projetos, stack ou
                experiência.
              </p>
              <span className="absolute -right-1.5 bottom-3 hidden h-3 w-3 rotate-45 border-r border-t border-border bg-card lg:block" />
            </div>
          )}

          <button
            type="button"
            onClick={toggleChat}
            aria-label={isOpen ? "Fechar assistente Kórtex" : "Abrir assistente Kórtex"}
            className="pointer-events-auto relative z-[60] flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_12px_28px_-8px_rgb(79_70_229_/_0.6)] transition-all duration-200 hover:scale-105"
          >
            {!isOpen && (
              <>
                <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
                <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-background bg-accent" />
              </>
            )}
            {isOpen ? <X size={22} /> : <Bot size={24} className="relative" />}
          </button>
        </div>
      )}
    </div>
  );
}
