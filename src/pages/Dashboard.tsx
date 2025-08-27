import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Shield,
  MessageCircle,
  Trophy,
  ShoppingCart,
  Package,
  Lightbulb,
  Star,
  Wrench,
  HeadphonesIcon,
  ArrowRight,
  Bell,
  TrendingUp
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate('/');
  };

  const modules = [
    {
      id: 'security',
      title: 'Relatos de Segurança',
      description: 'Relate problemas de segurança e acompanhe o status',
      icon: Shield,
      color: 'bg-red-500',
      route: '/security-reports',
      urgentCount: 3
    },
    {
      id: 'ombudsman',
      title: 'Ouvidoria',
      description: 'Canal de comunicação para feedbacks e reclamações',
      icon: MessageCircle,
      color: 'bg-blue-500',
      route: '/ombudsman',
      newCount: 2
    },
    {
      id: 'voting',
      title: 'Votação Melhor Funcionário',
      description: 'Vote no funcionário destaque do mês',
      icon: Trophy,
      color: 'bg-yellow-500',
      route: '/voting',
      status: 'Votação aberta'
    },
    {
      id: 'shopping',
      title: 'Compras para Funcionários',
      description: 'Catálogo de produtos disponíveis para compra',
      icon: ShoppingCart,
      color: 'bg-green-500',
      route: '/shopping'
    },
    {
      id: 'supplies',
      title: 'Pedido de Insumos',
      description: 'Solicite materiais de escritório e insumos',
      icon: Package,
      color: 'bg-purple-500',
      route: '/supplies',
      pendingCount: 5
    },
    {
      id: 'suggestions',
      title: 'Sugestão de Apps',
      description: 'Sugira novos aplicativos para o portal',
      icon: Lightbulb,
      color: 'bg-orange-500',
      route: '/suggestions'
    },
    {
      id: 'promax',
      title: 'Organização PROMAX',
      description: 'Gestão de eventos e promoções da empresa',
      icon: Star,
      color: 'bg-pink-500',
      route: '/promax-events'
    },
    {
      id: 'maintenance',
      title: 'Solicitação de Manutenção',
      description: 'Registre problemas técnicos e infraestrutura',
      icon: Wrench,
      color: 'bg-gray-500',
      route: '/maintenance'
    },
    {
      id: 'support',
      title: 'Suporte Técnico',
      description: 'Sistema de tickets para problemas técnicos',
      icon: HeadphonesIcon,
      color: 'bg-indigo-500',
      route: '/support',
      openTickets: 1
    }
  ];

  const recentActivity = [
    { action: 'Novo pedido de insumos aprovado', time: '2 horas atrás', type: 'success' },
    { action: 'Ticket de suporte #1234 resolvido', time: '4 horas atrás', type: 'info' },
    { action: 'Votação mensal iniciada', time: '1 dia atrás', type: 'warning' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header userName="João Silva" onLogout={handleLogout} />
      
      <main className="container mx-auto p-6 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Bem-vindo de volta! Aqui estão suas ferramentas e atualizações.
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Bell className="mr-2 h-4 w-4" />
              Notificações
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Tickets Abertos</p>
                    <p className="text-2xl font-bold">4</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pedidos Pendentes</p>
                    <p className="text-2xl font-bold">7</p>
                  </div>
                  <Package className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Compras Ativas</p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Votos Disponíveis</p>
                    <p className="text-2xl font-bold">1</p>
                  </div>
                  <Trophy className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Modules Grid */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-semibold mb-4">Módulos Disponíveis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {modules.map((module) => (
                <Card key={module.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className={`p-2 rounded-lg ${module.color} text-white`}>
                        <module.icon className="h-6 w-6" />
                      </div>
                      {module.urgentCount && (
                        <Badge variant="destructive" className="text-xs">
                          {module.urgentCount} urgente
                        </Badge>
                      )}
                      {module.newCount && (
                        <Badge variant="secondary" className="text-xs">
                          {module.newCount} novo
                        </Badge>
                      )}
                      {module.pendingCount && (
                        <Badge variant="outline" className="text-xs">
                          {module.pendingCount} pendente
                        </Badge>
                      )}
                      {module.openTickets && (
                        <Badge variant="outline" className="text-xs">
                          {module.openTickets} aberto
                        </Badge>
                      )}
                      {module.status && (
                        <Badge className="text-xs bg-green-100 text-green-800">
                          {module.status}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {module.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="mb-4">
                      {module.description}
                    </CardDescription>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate(module.route)}
                      className="w-full group-hover:bg-primary/10"
                    >
                      Acessar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'info' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
                
                <Button variant="ghost" size="sm" className="w-full mt-4">
                  Ver todas as atividades
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}