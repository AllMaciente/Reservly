"use client";

import { useState } from "react";
import { User, Settings, LogOut, HelpCircle, CrownIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

import { signOut } from "next-auth/react";

export function HeaderAvatar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10 border border-muted">
              <AvatarImage src={session?.user?.image || ""} alt="Avatar" />
              <AvatarFallback className="bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none flex items-center">
                {session?.user?.name || "John Doe"}
                {session?.user?.role === "ADMIN" && (
                  <CrownIcon className="ml-2 h-4 w-4" />
                )}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session?.user?.email || "john.doe@example.com"}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Configurações</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Ajuda</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-500 focus:text-red-500"
            onSelect={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
