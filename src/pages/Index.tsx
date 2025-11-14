import { useState } from "react";
import { OrderCard, Order } from "@/components/OrderCard";
import { NewOrderDialog } from "@/components/NewOrderDialog";
import { StatsCard } from "@/components/StatsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flower2, Package, Truck, CheckCircle2 } from "lucide-react";

const Index = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "001",
      customerName: "Maria Silva",
      phone: "(11) 98765-4321",
      deliveryAddress: "Rua das Flores, 123 - Jardim Primavera",
      deliveryDate: "2024-11-15",
      arrangement: "Buquê de rosas vermelhas - 12 unidades",
      status: "pending",
      total: 150.00,
    },
    {
      id: "002",
      customerName: "João Santos",
      phone: "(11) 97654-3210",
      deliveryAddress: "Av. Paulista, 1000 - Apto 501",
      deliveryDate: "2024-11-15",
      arrangement: "Arranjo misto com lírios e gerberas",
      status: "preparing",
      total: 220.00,
    },
    {
      id: "003",
      customerName: "Ana Costa",
      phone: "(11) 96543-2109",
      deliveryAddress: "Rua Aurora, 456",
      deliveryDate: "2024-11-14",
      arrangement: "Cesta de café da manhã com flores",
      status: "delivered",
      total: 180.00,
    },
  ]);

  const handleAddOrder = (newOrder: Omit<Order, "id" | "status">) => {
    const id = (orders.length + 1).toString().padStart(3, "0");
    setOrders([...orders, { ...newOrder, id, status: "pending" }]);
  };

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const pendingOrders = orders.filter(o => o.status === "pending");
  const preparingOrders = orders.filter(o => o.status === "preparing");
  const deliveredOrders = orders.filter(o => o.status === "delivered");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/10">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <Flower2 className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Floricultura Rosa
            </h1>
          </div>
          <p className="text-muted-foreground">Sistema de gerenciamento de pedidos</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total de Pedidos"
            value={orders.length}
            icon={Package}
            iconColor="text-primary"
          />
          <StatsCard
            title="Pendentes"
            value={pendingOrders.length}
            icon={Flower2}
            iconColor="text-accent-foreground"
          />
          <StatsCard
            title="Em Preparo"
            value={preparingOrders.length}
            icon={Truck}
            iconColor="text-secondary"
          />
          <StatsCard
            title="Entregues"
            value={deliveredOrders.length}
            icon={CheckCircle2}
            iconColor="text-primary"
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Pedidos</h2>
          <NewOrderDialog onAddOrder={handleAddOrder} />
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">Todos ({orders.length})</TabsTrigger>
            <TabsTrigger value="pending">Pendentes ({pendingOrders.length})</TabsTrigger>
            <TabsTrigger value="preparing">Em Preparo ({preparingOrders.length})</TabsTrigger>
            <TabsTrigger value="delivered">Entregues ({deliveredOrders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orders.map(order => (
                <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingOrders.map(order => (
                <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="preparing" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {preparingOrders.map(order => (
                <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="delivered" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {deliveredOrders.map(order => (
                <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
