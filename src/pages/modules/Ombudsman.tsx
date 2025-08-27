import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/layout/Header";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Plus, Clock, CheckCircle, ArrowLeft, MessageSquare } from "lucide-react";

export default function Ombudsman() {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    navigate('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada!",
      description: "Sua mensagem foi registrada e será analisada pela ouvidoria.",
    });
    setShowForm(false);
  };

  const tickets = [
    {
      id: "OUV-001",
      title: "Sugestão para melhorar o refeitório",
      category: "Sugestão",
      status: "Respondido",
      date: "15/01/2024",
      description: "Gostaria de sugerir mais opções vegetarianas no cardápio do refeitório.",
      response: "Agradecemos sua sugestão! Já implementamos 3 novas opções vegetarianas no cardápio."
    },
    {
      id: "OUV-002",
      title: "Problema com ar condicionado",
      category: "Reclamação",
      status: "Em análise",
      date: "14/01/2024",
      description: "O ar condicionado da sala 205 não está funcionando adequadamente há uma semana.",
      response: null
    },
    {
      id: "OUV-003",
      title: "Elogio ao atendimento do RH",
      category: "Elogio",
      status: "Registrado",
      date: "12/01/2024",
      description: "Gostaria de parabenizar a equipe de RH pelo excelente atendimento durante o processo de admissão.",
      response: null
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Respondido":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Em análise":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Respondido":
        return "bg-green-100 text-green-800";
      case "Em análise":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Reclamação":
        return "bg-red-100 text-red-800";
      case "Sugestão":
        return "bg-blue-100 text-blue-800";
      case "Elogio":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userName="João Silva" onLogout={handleLogout} />
      
      <main className="container mx-auto p-6 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <MessageCircle className="h-8 w-8 text-blue-500" />
            <div>
              <h1 className="text-3xl font-bold">Ouvidoria</h1>
              <p className="text-muted-foreground">Canal de comunicação para feedbacks e reclamações</p>
            </div>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Mensagem
          </Button>
        </div>

        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Nova Mensagem para Ouvidoria</CardTitle>
              <CardDescription>
                Compartilhe sua opinião, sugestão, reclamação ou elogio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Assunto</Label>
                    <Input id="title" placeholder="Resumo da sua mensagem" required />
                  </div>
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo da mensagem" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sugestao">Sugestão</SelectItem>
                        <SelectItem value="reclamacao">Reclamação</SelectItem>
                        <SelectItem value="elogio">Elogio</SelectItem>
                        <SelectItem value="informacao">Pedido de Informação</SelectItem>
                        <SelectItem value="denuncia">Denúncia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="department">Departamento relacionado (opcional)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rh">Recursos Humanos</SelectItem>
                      <SelectItem value="ti">Tecnologia da Informação</SelectItem>
                      <SelectItem value="financeiro">Financeiro</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="operacoes">Operações</SelectItem>
                      <SelectItem value="administrativo">Administrativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Mensagem detalhada</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Descreva sua mensagem com detalhes..."
                    rows={5}
                    required 
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="anonymous" 
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="anonymous" className="text-sm">
                    Enviar mensagem de forma anônima
                  </Label>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    Enviar Mensagem
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Suas Mensagens</h2>
          {tickets.map((ticket) => (
            <Card key={ticket.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(ticket.status)}
                    <div>
                      <CardTitle className="text-lg">{ticket.title}</CardTitle>
                      <CardDescription>#{ticket.id} • {ticket.date}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                    <Badge variant="secondary" className={getCategoryColor(ticket.category)}>
                      {ticket.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{ticket.description}</p>
                
                {ticket.response && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Resposta da Ouvidoria:</h4>
                    <p className="text-sm">{ticket.response}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}