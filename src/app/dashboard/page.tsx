import { OrderProps } from "@/@types/order/OrderReq";
import { Orders } from "@/components/orders";
import { getCookiesServer } from "@/lib/cookieServer";
import { api } from "@/services/api";

async function getOrders(): Promise<OrderProps[] | []> {
  const token = getCookiesServer();

  try {
    const response = await api.get("/orders", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function Dashboard() {
  const orders = await getOrders();

  return (
    <>
      <Orders orders={orders} />
    </>
  );
}
