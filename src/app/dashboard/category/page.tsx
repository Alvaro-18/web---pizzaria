import { api } from "@/services/api";
import styles from "./home.module.scss";
import { Button } from "@/components/button";
import { getCookiesServer } from "@/lib/cookieServer";
import { redirect } from "next/navigation";

export default function Category() {
  async function handleRegisterCategory(formData: FormData) {
    "use server";

    const name = formData.get("name");

    if (name === "") return;

    const data = {
      name: name
    };

    const token = getCookiesServer();

    await api
      .post("/category", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .catch(err => {
        console.log(err);
        return;
      });

    redirect("/dashboard");
  }

  return (
    <main className={styles.container}>
      <h1>Cadastar categoria</h1>
      <form className={styles.form} action={handleRegisterCategory}>
        <input
          type="text"
          name="name"
          placeholder="Digite o nome da categoria, ex: Pizzas"
          required
          className={styles.input}
        />

        <Button name="Cadastrar" />
      </form>
    </main>
  );
}
