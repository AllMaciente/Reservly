import Link from "next/link";

export function HeaderTitle() {
  return (
    <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
      <Link href="/">Reservly</Link>
    </h1>
  );
}
