"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, MessageSquare, Loader2, Sparkles } from "lucide-react";
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
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", parts: userMsg }]);
    setIsLoading(true);

    try {
      const response = await chatWithGemini(messages, userMsg);

      if (response.success && response.text) {
        setMessages((prev) => [
          ...prev,
          { role: "model", parts: response.text },
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Janela do Chat */}
      <div
        className={`
          w-[300px] sm:w-[380px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right flex flex-col
          ${isOpen ? "scale-100 opacity-100 translate-y-0 mb-2" : "scale-95 opacity-0 translate-y-10 pointer-events-none h-0 mb-0"}
        `}
        style={{ maxHeight: "500px", height: "60vh" }}
      >
        {/* Header */}
        <div className="bg-primary p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-primary-foreground">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold leading-none">Nix</p>
              <p className="text-[10px] opacity-80 leading-none mt-1">
                Powered by Gemini
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-white/20 h-8 w-8 rounded-full"
            onClick={() => setIsOpen(false)}
          >
            <X size={16} />
          </Button>
        </div>

        {/* Área de Mensagens */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/95 backdrop-blur-sm"
          ref={scrollRef}
        >
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot size={24} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  Olá! Sou o Nix.
                </p>
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
                  max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed
                  ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-muted text-foreground rounded-tl-sm"
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

      {/* Botão Flutuante */}
      {showLauncher && (
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            rounded-full h-14 w-14 shadow-xl transition-all duration-300 hover:scale-105 z-50
            ${isOpen ? "bg-muted text-muted-foreground hover:bg-muted/80 rotate-90" : "bg-primary text-primary-foreground hover:shadow-primary/25"}
          `}
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </Button>
      )}
    </div>
  );
}
