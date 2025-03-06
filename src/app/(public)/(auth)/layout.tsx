"use client";

import { Header } from "@/components/Header";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function LayoutLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "authenticated") {
    return null; // Ou renderize um componente de carregamento
  }

  return (
    <>
      <Header.Root>
        <Header.Title />
      </Header.Root>
      <main>{children}</main>
    </>
  );
}
