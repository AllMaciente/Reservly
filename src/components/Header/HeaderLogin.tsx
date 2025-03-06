import Link from "next/link";
import { Button } from "../ui/button";

export function HeaderLogin() {
  return (
    <div>
      <Button asChild variant="ghost">
        <Link href="/login">Login</Link>
      </Button>
      <Button asChild variant="ghost">
        <Link href="/register">Registrar</Link>
      </Button>
    </div>
  );
}
