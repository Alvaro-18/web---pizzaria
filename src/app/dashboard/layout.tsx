import Header from "@/components/header";
import { OrderProvider } from "@/providers/order";

export default function moduleLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <OrderProvider>
        {children}
      </OrderProvider>
    </>
  );
}
