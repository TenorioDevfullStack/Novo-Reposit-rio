"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { 
  Upload, 
  Sparkles, 
  Copy, 
  CheckCircle2, 
  Building2, 
  Home, 
  Briefcase, 
  Camera,
  Loader2,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { generatePropertyCaptions } from "./actions";

export default function ImobAI() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [captions, setCaptions] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) {
      toast.error("Por favor, suba uma foto do imóvel.");
      return;
    }

    setLoading(true);
    setCaptions(null);

    const formData = new FormData(e.currentTarget);
    formData.append("image", image);

    try {
      const result = await generatePropertyCaptions(formData);
      if (result.success) {
        setCaptions(result.captions ?? null);
        toast.success("Legendas geradas com sucesso!");
      } else {
        toast.error(`Erro: ${result.error}`);
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao gerar as legendas.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado para a área de transferência!");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30">
      {/* Hero Section */}
      <header className="relative overflow-hidden pt-16 pb-12 lg:pt-24 lg:pb-20">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium rounded-full bg-primary/10 border border-primary/20 text-primary">
            <Sparkles className="w-4 h-4" />
            <span>O futuro do marketing imobiliário</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
            Imob<span className="text-primary">AI</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10">
            Transforme fotos de imóveis em legendas de alta conversão em segundos. 
            Potencializado por Inteligência Artificial para corretores modernos.
          </p>

          <div className="relative max-w-lg mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/10">
            <Image 
              src="/imagens/imobai/Sem título.png" 
              alt="ImobAI Interface" 
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </div>
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px]" />
        </div>
      </header>

      <main className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Form Side */}
          <section>
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary" />
                  Dados do Imóvel
                </CardTitle>
                <CardDescription>
                  Preencha as informações básicas para orientar a IA.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  {/* Image Upload Area */}
                  <div className="space-y-2">
                    <Label>Foto do Imóvel</Label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative aspect-video rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-4 overflow-hidden
                        ${image ? 'border-primary/50 bg-primary/5' : 'border-white/10 bg-white/5 hover:border-primary/30 hover:bg-white/10'}`}
                    >
                      {image ? (
                        <>
                          <Image src={image} alt="Preview" fill className="object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-white font-medium">Trocar imagem</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="p-3 rounded-full bg-white/5 border border-white/10">
                            <Upload className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">Clique ou arraste para subir</p>
                            <p className="text-xs text-muted-foreground">PNG, JPG ou JPEG (máx. 5MB)</p>
                          </div>
                        </>
                      )}
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageUpload} 
                        className="hidden" 
                        accept="image/*"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Tipo de Imóvel</Label>
                      <Select name="type" defaultValue="Apartamento">
                        <SelectTrigger className="bg-white/5 border-white/10">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Apartamento">Apartamento</SelectItem>
                          <SelectItem value="Casa de Condomínio">Casa de Condomínio</SelectItem>
                          <SelectItem value="Cobertura">Cobertura</SelectItem>
                          <SelectItem value="Sobrado">Sobrado</SelectItem>
                          <SelectItem value="Terreno">Terreno</SelectItem>
                          <SelectItem value="Comercial">Comercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rooms">Dormitórios</Label>
                      <Input name="rooms" placeholder="Ex: 3 quartos (2 suítes)" className="bg-white/5 border-white/10" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="features">Principais Destaques</Label>
                    <Textarea 
                      name="features" 
                      placeholder="Ex: Varanda gourmet, vista para o mar, móveis planejados..." 
                      className="bg-white/5 border-white/10 min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tone">Tom de Voz</Label>
                    <Select name="tone" defaultValue="Profissional e Elegante">
                      <SelectTrigger className="bg-white/5 border-white/10">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Profissional e Elegante">Profissional e Elegante</SelectItem>
                        <SelectItem value="Criativo e Impactante">Criativo e Impactante</SelectItem>
                        <SelectItem value="Urgentista (Foco em Venda)">Urgentista (Foco em Venda)</SelectItem>
                        <SelectItem value="Descontraído e Moderno">Descontraído e Moderno</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg font-semibold gap-2 group relative overflow-hidden" 
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Gerar Legendas com IA
                        <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </section>

          {/* Results Side */}
          <section className="sticky top-8">
            <Card className="bg-white/5 border-primary/20 backdrop-blur-xl shadow-xl shadow-primary/5 min-h-[500px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Legendas Geradas
                </CardTitle>
                <CardDescription>
                  As sugestões da IA aparecerão aqui.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                {!captions && !loading && (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
                    <div className="w-16 h-16 rounded-full border border-dashed border-white/20 flex items-center justify-center mb-4">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <p>Ainda não há legendas geradas.<br/>Complete o formulário para começar.</p>
                  </div>
                )}

                {loading && (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <div className="relative">
                      <Loader2 className="w-12 h-12 animate-spin text-primary" />
                      <Sparkles className="w-4 h-4 absolute top-0 right-0 animate-bounce" />
                    </div>
                    <p className="mt-4 text-muted-foreground animate-pulse">
                      A IA está analisando sua foto e criando as melhores legendas...
                    </p>
                  </div>
                )}

                {captions && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="prose prose-invert max-w-none whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">
                      {captions}
                    </div>
                  </div>
                )}
              </CardContent>
              {captions && (
                <CardFooter className="border-t border-white/10 pt-6 flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 gap-2 bg-white/5 border-white/10"
                    onClick={() => copyToClipboard(captions)}
                  >
                    <Copy className="w-4 h-4" />
                    Copiar Tudo
                  </Button>
                  <Button 
                    variant="outline"
                    size="icon"
                    className="bg-white/5 border-white/10"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </CardFooter>
              )}
            </Card>

            {/* Testimonials or Info */}
            <div className="mt-6 flex items-center gap-4 px-4 py-3 rounded-xl bg-primary/5 border border-primary/10">
              <div className="bg-primary/20 p-2 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Power by Gemini 1.5 Flash</p>
                <p className="text-xs text-muted-foreground">Otimizado para anúncios imobiliários.</p>
              </div>
            </div>
          </section>

        </div>
      </main>

      <footer className="py-12 border-t border-white/10 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 ImobAI - Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
