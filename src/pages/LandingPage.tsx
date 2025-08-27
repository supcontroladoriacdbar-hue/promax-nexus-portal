import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Award, ChevronRight, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const news = [
    {
      id: 1,
      title: "Nova atualização do sistema de segurança",
      date: "15 de Janeiro, 2024",
      category: "Segurança",
      description: "Implementamos novas medidas de segurança para proteger ainda mais nossos funcionários e dados."
    },
    {
      id: 2,
      title: "Programa de reconhecimento Q1 2024",
      date: "12 de Janeiro, 2024",
      category: "RH",
      description: "Conheça os funcionários destaque do primeiro trimestre e as novas iniciativas de reconhecimento."
    },
    {
      id: 3,
      title: "Expansão das operações para nova filial",
      date: "8 de Janeiro, 2024",
      category: "Expansão",
      description: "A PROMAX anuncia a abertura de uma nova filial, criando mais oportunidades para nossa equipe."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">PROMAX</span>
          </div>
          <Button onClick={() => navigate('/login')} className="font-medium">
            Acessar Portal
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            Portal Institucional
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Bem-vindo à
            <span className="text-primary block">PROMAX</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Excelência em soluções empresariais, inovação constante e compromisso com nossos funcionários. 
            Juntos construímos o futuro.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/login')}
            className="text-lg px-8 py-6 h-auto font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Acessar Portal de Funcionários
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">Sobre Nossa Empresa</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            A PROMAX é líder em soluções inovadoras, sempre colocando nossos funcionários em primeiro lugar.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Pessoas em Primeiro Lugar</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Nossos funcionários são nosso maior ativo. Investimos continuamente em seu crescimento e bem-estar.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Excelência Reconhecida</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Mais de 20 anos de mercado, conquistando prêmios e reconhecimento pela qualidade de nossos serviços.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Inovação Constante</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Sempre na vanguarda da tecnologia, oferecendo as melhores ferramentas para nossa equipe.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">Notícias e Atualizações</h2>
          <p className="text-muted-foreground text-center mb-12">
            Mantenha-se atualizado com as últimas novidades da empresa
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{article.category}</Badge>
                    <span className="text-sm text-muted-foreground">{article.date}</span>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {article.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Pronto para começar?</h2>
          <p className="text-xl mb-8 opacity-90">
            Acesse o portal de funcionários e descubra todas as ferramentas disponíveis para você.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/login')}
            className="text-lg px-8 py-6 h-auto font-semibold"
          >
            Acessar Portal Agora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">PROMAX</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 PROMAX. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}