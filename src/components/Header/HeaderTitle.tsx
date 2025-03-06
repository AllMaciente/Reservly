import Link from "next/link";

interface HeaderTitleProps {
  href?: string;
}

export function HeaderTitle({ href = "/" }: HeaderTitleProps) {
  return (
    <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
      <Link href={href}>Reservly</Link>
    </h1>
  );
}
