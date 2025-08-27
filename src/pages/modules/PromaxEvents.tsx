import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { useNavigate } from "react-router-dom";
import { Star, ArrowLeft } from "lucide-react";

export default function PromaxEvents() {
  const navigate = useNavigate();
  const handleLogout = () => navigate('/');

  return (
    <div className="min-h-screen bg-background">
      <Header userName="João Silva" onLogout={handleLogout} />
      <main className="container mx-auto p-6 max-w-6xl">
        <div className="flex items-center space-x-3 mb-6">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Star className="h-8 w-8 text-pink-500" />
          <div>
            <h1 className="text-3xl font-bold">Organização PROMAX</h1>
            <p className="text-muted-foreground">Gestão de eventos e promoções</p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Em Desenvolvimento</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Esta funcionalidade estará disponível em breve!</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}