"use client";

import { UploadCloud } from "lucide-react";
import styles from "./styles.module.scss";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/button";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
}

interface Props {
  categories: Category[];
}

export function Form({ categories }: Props) {
  const router = useRouter();
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");

  async function handleRegisterProduct(formData: FormData) {
    const categoryIndex = formData.get("category");
    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");

    if (!name || !categoryIndex || !price || !description || !image) {
      toast.warning("Preencha todos os campos!");
      return;
    }

    const data = new FormData();
    const token = getCookieClient();

    data.append("name", name);
    data.append("price", price);
    data.append("description", description);
    data.append("category_id", categories[Number(categoryIndex)].id);
    data.append("file", image);

    api
      .post("/product", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .catch(err => {
        toast.warning(`Erro ao registar o produto: ${err}`);
        return;
      });

    toast.success("Produto registrado com sucesso!");
    router.replace("/");
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type !== "image/jpeg" && image.type !== "image/png") {
        toast.warning("Formato inválido!");
        return;
      }

      setImage(image);
      setPreviewImage(URL.createObjectURL(image));
    }
  }

  return (
    <main className={styles.container}>
      <h1>Novo Produto</h1>

      <form className={styles.form} action={handleRegisterProduct}>
        <label className={styles.labelImage}>
          <span>
            <UploadCloud size={32} color="#fff" />
          </span>

          <input
            type="file"
            accept="image/png, image/jpeg"
            required
            onChange={handleFile}
          />

          {previewImage && (
            <Image
              src={previewImage}
              alt="Imagem de preview"
              className={styles.preview}
              fill={true}
              quality={100}
              priority={true}
            />
          )}
        </label>

        <select name="category">
          {categories.map((category, index) => (
            <option key={category.id} value={index}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="name"
          placeholder="Digite o nome do produto"
          required
          className={styles.input}
        />
        <input
          type="text"
          name="price"
          placeholder="Preço do produto..."
          required
          className={styles.input}
        />

        <textarea
          className={styles.input}
          placeholder="Digite a descrição do produto"
          required
          name="description"></textarea>

        <Button name="cadastrar" />
      </form>
    </main>
  );
}
