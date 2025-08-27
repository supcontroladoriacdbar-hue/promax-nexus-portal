import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Package, Plus, ArrowLeft, Clock, CheckCircle } from "lucide-react";

export default function Supplies() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => navigate('/');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Pedido enviado!", description: "Seu pedido de insumos foi registrado." });
  };

  const requests = [
    { id: "INS-001", item: "Papel A4", quantity: 10, status: "Aprovado", date: "15/01/2024" },
    { id: "INS-002", item: "Canetas", quantity: 20, status: "Pendente", date: "14/01/2024" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header userName="João Silva" onLogout={handleLogout} />
      <main className="container mx-auto p-6 max-w-6xl">
        <div className="flex items-center space-x-3 mb-6">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Package className="h-8 w-8 text-purple-500" />
          <div>
            <h1 className="text-3xl font-bold">Pedido de Insumos</h1>
            <p className="text-muted-foreground">Solicite materiais de escritório</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Novo Pedido</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="item">Item</Label>
                  <Input id="item" placeholder="Nome do item" required />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantidade</Label>
                  <Input id="quantity" type="number" placeholder="Qtd" required />
                </div>
              </div>
              <Button type="submit">
                <Plus className="mr-2 h-4 w-4" />
                Solicitar
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Meus Pedidos</h2>
          {requests.map((request) => (
            <Card key={request.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  {request.status === "Aprovado" ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Clock className="h-4 w-4 text-yellow-500" />}
                  <div>
                    <div className="font-medium">{request.item}</div>
                    <div className="text-sm text-muted-foreground">#{request.id} • {request.date}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Qtd: {request.quantity}</span>
                  <Badge variant={request.status === "Aprovado" ? "default" : "secondary"}>
                    {request.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}