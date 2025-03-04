import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div>
      <Header.Root>
        <Header.Title />

        <Header.Login />
      </Header.Root>
    </div>
  );
}
