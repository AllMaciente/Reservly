import { Header } from "@/components/Header";

export default function LayoutLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header.Root>
        <Header.Title />
      </Header.Root>
      <main>{children}</main>
    </>
  );
}
