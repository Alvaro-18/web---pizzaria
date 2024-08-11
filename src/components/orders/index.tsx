"use client";
import { OrderProps } from "@/@types/order/OrderReq";
import styles from "./style.module.scss";
import { RefreshCw } from "lucide-react";
import { ModalOrder } from "../modal";
import { use } from "react";
import { OrderContext } from "@/providers/order";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  orders: OrderProps[];
}

export function Orders({ orders }: Props) {
  const { isOpen, onRequestOpen } = use(OrderContext);
  const router = useRouter();

  async function handleDetailOrder(order_id: string) {
    await onRequestOpen(order_id);
  }

  function refresh(){
    router.refresh();
    toast.success("Pedidos atualizado com sucesso!")
  }

  return (
    <>
      <main className={styles.container}>
        <section className={styles.containerHeader}>
          <h1>Últimos pedidos</h1>
          <button onClick={refresh}>
            <RefreshCw size={24} color="#3fffa3" />
          </button>
        </section>

        {orders.length === 0 && <span className={styles.empty}>Nenhum pedido cadastrado</span>}

        <section className={styles.listOrders}>
          {orders.map(order => (
            <button
              key={order.id}
              className={styles.ordemItem}
              onClick={() => handleDetailOrder(order.id)}>
              <div className={styles.tag}></div>
              <span>Mesa {order.table}</span>
            </button>
          ))}
        </section>
      </main>

      {isOpen && <ModalOrder />}
    </>
  );
}
