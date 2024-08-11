"use client";

import styles from "./style.module.scss";
import { X } from "lucide-react";
import { use } from "react";
import { OrderContext } from "@/providers/order";

export function ModalOrder() {
  const { onRequestClose, orders, finishOrder } = use(OrderContext);

  async function handleFinishOrder() {
    await finishOrder(orders[0].order_id);
  }

  function calc(){
    return orders.reduce((acc, item) => {
      const preco = parseFloat(item.product.price) || 0;
      const quantidade = item.amount || 0;
      return acc + (preco * quantidade);
  }, 0);
  }

  return (
    <dialog className={styles.dialogContainer}>
      <section className={styles.dialogContent}>
        <button className={styles.dialogBack} onClick={onRequestClose}>
          <X size={40} color="#ff3f4b" />
        </button>

        <article>
          <h2>Detalhes do pedido</h2>

          <span className={styles.table}>mesa {orders[0].Order.table}</span>

          {orders.map(item => (
            <section className={styles.item} key={item.id}>
              <span>
                Qtd: {item.amount} - {item.product.name} - R$ {parseFloat(item.product.price) * item.amount}
              </span>
              <span className={styles.description}>
                {item.product.description}
              </span>
            </section>
          ))}

          <h3 className={styles.total}>Valor total: R$ {calc()} </h3>

          <button className={styles.buttonOrder} onClick={handleFinishOrder}>
            Concluir o pedido
          </button>
        </article>
      </section>
    </dialog>
  );
}
