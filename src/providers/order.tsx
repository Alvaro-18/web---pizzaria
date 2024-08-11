"use client";

import { getCookieClient } from "@/lib/cookieClient";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";

type OrderContextData = {
  isOpen: boolean;
  onRequestOpen: (order_id: string) => Promise<void>;
  onRequestClose: () => void;
  orders: OrderItemProps[];
  finishOrder: (order_id: string) => Promise<void>;
};

interface OrderItemProps {
  id: string;
  amount: number;
  created_at: string;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
  };
  Order: {
    id: string;
    table: number;
    name: string | null;
    draft: boolean;
    status: boolean;
  };
}

export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState<OrderItemProps[]>([]);

  async function onRequestOpen(order_id: string) {
    const token = getCookieClient();

    const reponse = await api.get("/order/detail", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        order_id: order_id
      }
    });

    setOrders(reponse.data);
    setIsOpen(true);
  }

  function onRequestClose() {
    setIsOpen(false);
  }

  async function finishOrder(order_id: string) {
    const token = getCookieClient();

    const data = {
      order_id: order_id
    };

    try {
      await api.put("/order/finish", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      toast.error("Falha ao finalizar este pedido");
      console.log(error);
      return;
    }

    toast.success("Pedido finalizado com sucesso");
    setIsOpen(false);
    router.refresh();
  }

  return (
    <OrderContext.Provider
      value={{
        isOpen,
        onRequestClose,
        onRequestOpen,
        finishOrder,
        orders,
      }}>
      {children}
    </OrderContext.Provider>
  );
}
