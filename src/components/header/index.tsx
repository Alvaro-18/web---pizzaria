"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import logoImg from "/public/logo.svg";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Header() {
  const router = useRouter();

  async function handleLogout() {
    deleteCookie("session", { path: "/" });
    toast.success("Logout feito com sucesso!");
    router.replace("/");
  }

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <Image
            src={logoImg}
            width={190}
            height={60}
            alt={"Logo Sujeito Pizza"}
            priority={true}
            quality={100}
          />
        </Link>

        <nav className={styles.menuNav}>
          <Link href="/dashboard/category">Categoria</Link>
          <Link href="/dashboard/product">Produto</Link>

          <button onClick={handleLogout}>
            <LogOutIcon color="#fff" size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
}
