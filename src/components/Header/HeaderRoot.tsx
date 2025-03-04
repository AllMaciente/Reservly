import ThemeToggleButton from "../ThemeToggleButton";

interface HeaderRootProps {
  children: React.ReactNode;
}
export function HeaderRoot({ children }: HeaderRootProps) {
  return (
    <header className="flex items-center justify-between w-full h-16 p-4">
      <div className="flex items-center w-full">{children}</div>
      <ThemeToggleButton />
    </header>
  );
}
