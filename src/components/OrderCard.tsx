import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flower2, Calendar, User, MapPin, Phone } from "lucide-react";

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  deliveryAddress: string;
  deliveryDate: string;
  arrangement: string;
  status: "pending" | "preparing" | "delivered";
  total: number;
}

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, newStatus: Order["status"]) => void;
}

const statusConfig = {
  pending: {
    label: "Pendente",
    color: "bg-accent text-accent-foreground",
  },
  preparing: {
    label: "Em Preparo",
    color: "bg-secondary text-secondary-foreground",
  },
  delivered: {
    label: "Entregue",
    color: "bg-primary text-primary-foreground",
  },
};

export const OrderCard = ({ order, onStatusChange }: OrderCardProps) => {
  const getNextStatus = (currentStatus: Order["status"]): Order["status"] | null => {
    if (currentStatus === "pending") return "preparing";
    if (currentStatus === "preparing") return "delivered";
    return null;
  };

  const nextStatus = getNextStatus(order.status);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-accent/20 to-accent/5 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flower2 className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">Pedido #{order.id}</span>
          </div>
          <Badge className={statusConfig[order.status].color}>
            {statusConfig[order.status].label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        <div className="flex items-start gap-2">
          <User className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div>
            <p className="font-medium text-foreground">{order.customerName}</p>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <Phone className="h-3 w-3" />
              {order.phone}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
          <p className="text-sm text-muted-foreground">{order.deliveryAddress}</p>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{order.deliveryDate}</p>
        </div>

        <div className="pt-2 border-t">
          <p className="text-sm text-muted-foreground">Arranjo</p>
          <p className="font-medium text-foreground">{order.arrangement}</p>
          <p className="text-lg font-bold text-primary mt-1">
            R$ {order.total.toFixed(2)}
          </p>
        </div>

        {nextStatus && (
          <Button
            onClick={() => onStatusChange(order.id, nextStatus)}
            className="w-full mt-2"
            variant={order.status === "pending" ? "default" : "secondary"}
          >
            {order.status === "pending" && "Iniciar Preparo"}
            {order.status === "preparing" && "Marcar como Entregue"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
