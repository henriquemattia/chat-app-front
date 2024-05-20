"use client";

import Link from "next/link";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Message } from "@/app/data";

interface SidebarProps {
  isCollapsed: boolean;
  conversationsAmount: number;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function Sidebar({ conversationsAmount, isCollapsed, children }: SidebarProps) {
  return (
    <div data-collapsed={isCollapsed} className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 ">

      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <p className="font-medium">Chats</p>
            <span className="text-zinc-300">({conversationsAmount})</span>
          </div>

          <div>
            <Link href="#" className={cn( buttonVariants({ variant: "ghost", size: "icon" }), "h-9 w-9")}>
              <MoreHorizontal size={20} />
            </Link>

            <Link href="#"className={cn(buttonVariants({ variant: "ghost", size: "icon" }),"h-9 w-9")}>
              <SquarePen size={20} />
            </Link>
          </div>
        </div>
      )}

      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {children && <>{children}</>}
      </nav>
    </div>
  );
}
