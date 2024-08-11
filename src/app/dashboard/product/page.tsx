import { Form } from "./components/form";
import { api } from "@/services/api";
import { getCookiesServer } from "@/lib/cookieServer";

export default async function Product() {
  const token = getCookiesServer();
  const response = await api.get("/category", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return <Form categories={response.data}/>;
}
