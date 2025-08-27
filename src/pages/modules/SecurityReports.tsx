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
import { Shield, Plus, AlertTriangle, Clock, CheckCircle, ArrowLeft } from "lucide-react";

export default function SecurityReports() {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    navigate('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Relato enviado!",
      description: "Seu relato de segurança foi registrado e será analisado em breve.",
    });
    setShowForm(false);
  };

  const reports = [
    {
      id: "SEC-001",
      title: "Porta de emergência obstruída",
      category: "Físico",
      priority: "Alta",
      status: "Em análise",
      date: "15/01/2024",
      description: "Caixas empilhadas bloqueando a saída de emergência do 2º andar."
    },
    {
      id: "SEC-002",
      title: "Tentativa de phishing por email",
      category: "Digital",
      priority: "Crítica",
      status: "Resolvido",
      date: "14/01/2024",
      description: "Email suspeito solicitando credenciais de login."
    },
    {
      id: "SEC-003",
      title: "Iluminação deficiente no estacionamento",
      category: "Físico",
      priority: "Média",
      status: "Pendente",
      date: "12/01/2024",
      description: "Lâmpadas queimadas na área externa comprometem a segurança."
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resolvido":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Em análise":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolvido":
        return "bg-green-100 text-green-800";
      case "Em análise":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Crítica":
        return "bg-red-500";
      case "Alta":
        return "bg-orange-500";
      case "Média":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
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
            <Shield className="h-8 w-8 text-red-500" />
            <div>
              <h1 className="text-3xl font-bold">Relatos de Segurança</h1>
              <p className="text-muted-foreground">Relate problemas de segurança e acompanhe o status</p>
            </div>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Relato
          </Button>
        </div>

        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Novo Relato de Segurança</CardTitle>
              <CardDescription>
                Descreva o problema de segurança encontrado com o máximo de detalhes possível
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Título do relato</Label>
                    <Input id="title" placeholder="Resumo do problema" required />
                  </div>
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fisico">Segurança Física</SelectItem>
                        <SelectItem value="digital">Segurança Digital</SelectItem>
                        <SelectItem value="procedimento">Procedimento</SelectItem>
                        <SelectItem value="equipamento">Equipamento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priority">Prioridade</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Nível de prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critica">Crítica</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="baixa">Baixa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Local</Label>
                    <Input id="location" placeholder="Onde ocorreu o problema" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Descrição detalhada</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Descreva o problema, como aconteceu, quando foi detectado, etc."
                    rows={4}
                    required 
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    Enviar Relato
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Seus Relatos</h2>
          {reports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(report.status)}
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <CardDescription>#{report.id} • {report.date}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(report.priority)}`} />
                    <Badge variant="outline" className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                    <Badge variant="secondary">{report.category}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Prioridade: {report.priority}</span>
                  <span>Categoria: {report.category}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}