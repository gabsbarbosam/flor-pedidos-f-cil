import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Order } from "./OrderCard";

interface NewOrderDialogProps {
  onAddOrder: (order: Omit<Order, "id" | "status">) => void;
}

export const NewOrderDialog = ({ onAddOrder }: NewOrderDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    deliveryAddress: "",
    deliveryDate: "",
    arrangement: "",
    total: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.phone || !formData.deliveryDate || !formData.arrangement || !formData.total) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    onAddOrder({
      customerName: formData.customerName,
      phone: formData.phone,
      deliveryAddress: formData.deliveryAddress,
      deliveryDate: formData.deliveryDate,
      arrangement: formData.arrangement,
      total: parseFloat(formData.total),
    });

    setFormData({
      customerName: "",
      phone: "",
      deliveryAddress: "",
      deliveryDate: "",
      arrangement: "",
      total: "",
    });
    
    setOpen(false);
    toast.success("Pedido adicionado com sucesso!");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Novo Pedido
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Pedido</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Nome do Cliente *</Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              placeholder="João Silva"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(11) 99999-9999"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliveryAddress">Endereço de Entrega</Label>
            <Textarea
              id="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
              placeholder="Rua das Flores, 123"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliveryDate">Data de Entrega *</Label>
            <Input
              id="deliveryDate"
              type="date"
              value={formData.deliveryDate}
              onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="arrangement">Descrição do Arranjo *</Label>
            <Textarea
              id="arrangement"
              value={formData.arrangement}
              onChange={(e) => setFormData({ ...formData, arrangement: e.target.value })}
              placeholder="Buquê de rosas vermelhas com 12 unidades"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="total">Valor Total (R$) *</Label>
            <Input
              id="total"
              type="number"
              step="0.01"
              value={formData.total}
              onChange={(e) => setFormData({ ...formData, total: e.target.value })}
              placeholder="150.00"
            />
          </div>

          <Button type="submit" className="w-full">
            Adicionar Pedido
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
