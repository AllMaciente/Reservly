"use client";
import { Header } from "@/components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LayoutPrivate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return <div>Loading...</div>; // Ou renderize nada: return null;
  }

  return (
    <>
      <Header.Root>
        <Header.Title href="/dashboard" />
        <Header.Avatar />
      </Header.Root>
      <main>{children}</main>
    </>
  );
}
