import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Header } from "@/components/layout/Header";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Clock, Users, ArrowLeft, Star, Vote } from "lucide-react";

export default function Voting() {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    navigate('/');
  };

  const handleVote = () => {
    if (!selectedEmployee) {
      toast({
        title: "Selecione um funcionário",
        description: "Por favor, selecione um funcionário para votar.",
        variant: "destructive",
      });
      return;
    }

    setHasVoted(true);
    toast({
      title: "Voto registrado!",
      description: "Seu voto foi registrado com sucesso. Obrigado pela participação!",
    });
  };

  const employees = [
    {
      id: "1",
      name: "Maria Santos",
      department: "Marketing",
      achievements: "Liderou campanha que aumentou vendas em 30%",
      votes: 45,
      percentage: 32
    },
    {
      id: "2",
      name: "Carlos Oliveira",
      department: "TI",
      achievements: "Implementou sistema que reduziu tempo de processos em 50%",
      votes: 38,
      percentage: 27
    },
    {
      id: "3",
      name: "Ana Paula Silva",
      department: "RH",
      achievements: "Criou programa de bem-estar que beneficiou todos os funcionários",
      votes: 32,
      percentage: 23
    },
    {
      id: "4",
      name: "Roberto Costa",
      department: "Vendas",
      achievements: "Superou meta em 150% no último trimestre",
      votes: 25,
      percentage: 18
    }
  ];

  const currentPeriod = {
    title: "Funcionário do Mês - Janeiro 2024",
    endDate: "31 de Janeiro, 2024",
    daysLeft: 12,
    totalVotes: 140
  };

  const previousWinners = [
    {
      period: "Dezembro 2023",
      name: "Pedro Mendes",
      department: "Operações",
      votes: 67
    },
    {
      period: "Novembro 2023",
      name: "Juliana Rocha",
      department: "Financeiro",
      votes: 58
    },
    {
      period: "Outubro 2023",
      name: "Fernando Lima",
      department: "TI",
      votes: 71
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header userName="João Silva" onLogout={handleLogout} />
      
      <main className="container mx-auto p-6 max-w-6xl">
        <div className="flex items-center space-x-3 mb-6">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Trophy className="h-8 w-8 text-yellow-500" />
          <div>
            <h1 className="text-3xl font-bold">Votação Melhor Funcionário</h1>
            <p className="text-muted-foreground">Vote no funcionário destaque do mês</p>
          </div>
        </div>

        {/* Current Voting Period */}
        <Card className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center">
                  <Star className="mr-2 h-5 w-5 text-yellow-500" />
                  {currentPeriod.title}
                </CardTitle>
                <CardDescription>
                  Vote no funcionário que mais se destacou este mês
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-white">
                <Clock className="mr-1 h-3 w-3" />
                {currentPeriod.daysLeft} dias restantes
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Total de votos: {currentPeriod.totalVotes}</span>
              <span>Encerra em: {currentPeriod.endDate}</span>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Voting Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Candidatos</h2>
              {hasVoted && (
                <Badge className="bg-green-100 text-green-800">
                  <Vote className="mr-1 h-3 w-3" />
                  Você já votou
                </Badge>
              )}
            </div>

            <div className="space-y-4">
              {employees.map((employee) => (
                <Card 
                  key={employee.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedEmployee === employee.id ? 'ring-2 ring-primary' : ''
                  } ${hasVoted ? 'cursor-not-allowed opacity-75' : ''}`}
                  onClick={() => !hasVoted && setSelectedEmployee(employee.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{employee.name}</CardTitle>
                          <CardDescription>{employee.department}</CardDescription>
                          <p className="text-sm text-muted-foreground mt-2">
                            {employee.achievements}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{employee.votes}</div>
                        <div className="text-xs text-muted-foreground">votos</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span>{employee.percentage}%</span>
                      </div>
                      <Progress value={employee.percentage} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {!hasVoted && (
              <div className="mt-6 flex justify-center">
                <Button 
                  size="lg" 
                  onClick={handleVote}
                  disabled={!selectedEmployee}
                  className="px-8"
                >
                  <Vote className="mr-2 h-4 w-4" />
                  Confirmar Voto
                </Button>
              </div>
            )}
          </div>

          {/* Previous Winners Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                  Vencedores Anteriores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {previousWinners.map((winner, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-yellow-100 text-yellow-800">
                        {winner.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{winner.name}</div>
                      <div className="text-xs text-muted-foreground">{winner.department}</div>
                      <div className="text-xs text-muted-foreground">{winner.period}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {winner.votes} votos
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Users className="mr-2 h-5 w-5 text-blue-500" />
                  Estatísticas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Total de votos</span>
                  <span className="font-medium">{currentPeriod.totalVotes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Candidatos</span>
                  <span className="font-medium">{employees.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Participação</span>
                  <span className="font-medium">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Dias restantes</span>
                  <span className="font-medium">{currentPeriod.daysLeft}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}