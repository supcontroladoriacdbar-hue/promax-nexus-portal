import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/layout/Header";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Plus, Minus, Search, Filter, ArrowLeft, Package, Clock, CheckCircle } from "lucide-react";

export default function Shopping() {
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    navigate('/');
  };

  const products = [
    {
      id: "1",
      name: "Notebook Dell Inspiron 15",
      description: "Notebook para uso corporativo com 8GB RAM, SSD 256GB",
      price: 2500.00,
      category: "Eletrônicos",
      image: "/placeholder.svg",
      availability: "Em estoque",
      delivery: "5-7 dias úteis"
    },
    {
      id: "2",
      name: "Cadeira Ergonômica Premium",
      description: "Cadeira com apoio lombar ajustável e braços reguláveis",
      price: 850.00,
      category: "Móveis",
      image: "/placeholder.svg",
      availability: "Em estoque",
      delivery: "3-5 dias úteis"
    },
    {
      id: "3",
      name: "Monitor 24'' Full HD",
      description: "Monitor LED com resolução 1920x1080 e entrada HDMI",
      price: 600.00,
      category: "Eletrônicos",
      image: "/placeholder.svg",
      availability: "Sob consulta",
      delivery: "7-10 dias úteis"
    },
    {
      id: "4",
      name: "Kit Escritório Completo",
      description: "Mesa, gaveteiro e suporte para monitor",
      price: 1200.00,
      category: "Móveis",
      image: "/placeholder.svg",
      availability: "Em estoque",
      delivery: "7-14 dias úteis"
    },
    {
      id: "5",
      name: "Smartphone Samsung Galaxy",
      description: "Smartphone corporativo com plano de dados incluído",
      price: 1800.00,
      category: "Eletrônicos",
      image: "/placeholder.svg",
      availability: "Em estoque",
      delivery: "2-3 dias úteis"
    },
    {
      id: "6",
      name: "Vale Alimentação",
      description: "Crédito adicional para vale alimentação mensal",
      price: 500.00,
      category: "Benefícios",
      image: "/placeholder.svg",
      availability: "Sempre disponível",
      delivery: "Imediato"
    }
  ];

  const orders = [
    {
      id: "PED-001",
      date: "15/01/2024",
      status: "Entregue",
      total: 850.00,
      items: "Cadeira Ergonômica Premium"
    },
    {
      id: "PED-002",
      date: "10/01/2024",
      status: "Em trânsito",
      total: 600.00,
      items: "Monitor 24'' Full HD"
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
    toast({
      title: "Produto adicionado",
      description: "Item adicionado ao carrinho com sucesso!",
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [productId, qty]) => {
      const product = products.find(p => p.id === productId);
      return sum + (product ? product.price * qty : 0);
    }, 0);
  };

  const handleCheckout = () => {
    if (getTotalItems() === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione produtos ao carrinho antes de finalizar.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Pedido realizado!",
      description: "Seu pedido foi enviado para aprovação.",
    });
    setCart({});
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Entregue":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Em trânsito":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Package className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entregue":
        return "bg-green-100 text-green-800";
      case "Em trânsito":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userName="João Silva" onLogout={handleLogout} />
      
      <main className="container mx-auto p-6 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <ShoppingCart className="h-8 w-8 text-green-500" />
            <div>
              <h1 className="text-3xl font-bold">Compras para Funcionários</h1>
              <p className="text-muted-foreground">Catálogo de produtos disponíveis para compra</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">
              Carrinho: {getTotalItems()} itens
            </Badge>
            <Button onClick={handleCheckout} disabled={getTotalItems() === 0}>
              Finalizar Pedido - R$ {getTotalPrice().toFixed(2)}
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Pesquisar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  <SelectItem value="Eletrônicos">Eletrônicos</SelectItem>
                  <SelectItem value="Móveis">Móveis</SelectItem>
                  <SelectItem value="Benefícios">Benefícios</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="p-4">
                    <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                      <Package className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">
                          R$ {product.price.toFixed(2)}
                        </span>
                        <Badge 
                          variant={product.availability === "Em estoque" ? "default" : "secondary"}
                        >
                          {product.availability}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        <div>Categoria: {product.category}</div>
                        <div>Entrega: {product.delivery}</div>
                      </div>

                      <div className="flex items-center justify-between">
                        {cart[product.id] ? (
                          <div className="flex items-center space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => removeFromCart(product.id)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{cart[product.id]}</span>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => addToCart(product.id)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            size="sm" 
                            onClick={() => addToCart(product.id)}
                            disabled={product.availability !== "Em estoque"}
                          >
                            <Plus className="mr-1 h-3 w-3" />
                            Adicionar
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order History Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Histórico de Pedidos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">#{order.id}</span>
                      <Badge variant="outline" className={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">
                      {order.items}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{order.date}</span>
                      <span className="font-medium">R$ {order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
                
                <Button variant="ghost" size="sm" className="w-full">
                  Ver todos os pedidos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}