"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LayoutPrivate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      if (session?.user?.role != "ADMIN") {
        router.push("/dashboard");
      }
    }
  }, [status, session, router]);

  if (status === "loading" || status === "unauthenticated") {
    return null;
  }

  return (
    <>
      <main>{children}</main>
    </>
  );
}
