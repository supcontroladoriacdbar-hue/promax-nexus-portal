import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Building2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<'login' | 'activate' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data - substitua pela integração real
  const mockEmployees = [
    { email: "joao.silva@promax.com", nome: "João Silva", departamento: "TI" },
    { email: "maria.santos@promax.com", nome: "Maria Santos", departamento: "RH" },
    { email: "pedro.oliveira@promax.com", nome: "Pedro Oliveira", departamento: "Financeiro" }
  ];

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular verificação no banco
    setTimeout(() => {
      const employee = mockEmployees.find(emp => emp.email === email);
      
      if (employee) {
        setMode('activate');
        toast({
          title: "Email encontrado!",
          description: "Por favor, crie sua senha para ativar sua conta.",
        });
      } else {
        setMode('register');
        toast({
          title: "Novo funcionário",
          description: "Complete seu cadastro para acessar o portal.",
          variant: "default",
        });
      }
      setLoading(false);
    }, 1000);
  };

  const handleActivateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simular ativação
    setTimeout(() => {
      toast({
        title: "Conta ativada!",
        description: "Bem-vindo ao Portal PROMAX.",
      });
      navigate('/dashboard');
      setLoading(false);
    }, 1000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular login
    setTimeout(() => {
      toast({
        title: "Login realizado!",
        description: "Redirecionando para o dashboard...",
      });
      navigate('/dashboard');
      setLoading(false);
    }, 1000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simular cadastro
    setTimeout(() => {
      toast({
        title: "Cadastro realizado!",
        description: "Sua conta foi criada com sucesso.",
      });
      navigate('/dashboard');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao site
          </Button>
          
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">PROMAX</span>
          </div>
          <h1 className="text-2xl font-bold">Portal de Funcionários</h1>
          <p className="text-muted-foreground">
            {mode === 'login' && "Faça login para acessar"}
            {mode === 'activate' && "Ative sua conta"}
            {mode === 'register' && "Complete seu cadastro"}
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>
              {mode === 'login' && "Acesso ao Portal"}
              {mode === 'activate' && "Ativar Conta"}
              {mode === 'register' && "Novo Cadastro"}
            </CardTitle>
            <CardDescription>
              {mode === 'login' && "Digite seu email para continuar"}
              {mode === 'activate' && "Crie uma senha para sua conta"}
              {mode === 'register' && "Preencha os dados para criar sua conta"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {mode === 'login' && (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email corporativo</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.email@promax.com"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Verificando..." : "Continuar"}
                </Button>
              </form>
            )}

            {mode === 'activate' && (
              <form onSubmit={handleActivateAccount} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Nova senha</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Digite sua nova senha"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirmar senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirme sua senha"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Ativando..." : "Ativar Conta"}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setMode('login')}
                  className="w-full"
                >
                  Voltar
                </Button>
              </form>
            )}

            {mode === 'register' && (
              <div className="space-y-4">
                <Alert>
                  <AlertDescription>
                    Seu email não está cadastrado em nosso sistema. Entre em contato com o RH para verificar sua elegibilidade.
                  </AlertDescription>
                </Alert>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setMode('login')}
                  className="w-full"
                >
                  Voltar
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Problemas para acessar? Entre em contato com o suporte.
        </p>
      </div>
    </div>
  );
}