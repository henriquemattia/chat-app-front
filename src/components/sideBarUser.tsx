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
import { Conversations, Message } from "@/app/data";
import { Avatar, AvatarImage } from "./ui/avatar";

interface Conversation {
  isCollapsed: boolean;

  conversation: Conversations
}

export function SidebarUser({ conversation, isCollapsed}: Conversation) {
  return (
            isCollapsed 
              ? (
                <TooltipProvider>
                  <Tooltip delayDuration={0}>

                    <TooltipTrigger asChild>
                      <Link href="#" className={cn( buttonVariants({ variant: conversation.variant, size: "icon" }), "h-11 w-11 md:h-16 md:w-16", conversation.variant === "grey" && "bg-muted hover:bg-muted  shrink", )}>
                        <Avatar className="flex justify-center items-center">

                          <AvatarImage
                            src={conversation.avatar}
                            alt={conversation.avatar}
                            width={6}
                            height={6}
                            className="w-10 h-10 "
                          />

                        </Avatar>
                        
                        {" "}
                        <span className="sr-only">{conversation.other_user_name}</span>
                      </Link>
                    </TooltipTrigger>

                    <TooltipContent side="right" className="flex items-center gap-4">
                      {conversation.other_user_name}
                    </TooltipContent>

                  </Tooltip>
                </TooltipProvider>
              ) 
              : (
                <Link href="#" className={cn(
                    buttonVariants({ variant: conversation.variant, size: "xl" }),
                    "min-w-full",
                    conversation.variant === "grey" &&
                      "bg-muted hover:bg-muted  shrink",
                    "justify-start gap-4"
                  )}>

                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={conversation.avatar}
                      alt={conversation.avatar}
                      width={6}
                      height={6}
                      className="w-10 h-10 "
                    />
                  </Avatar>

                  <div className="flex flex-col  max-w-24">
                    <span className="flex align-top">
                      {conversation.other_user_name}
                    </span>


                    <span className="text-zinc-300 text-xs truncate">
                      {/* melhoria colocando um me: ou nomedosenderid:  */}
                      {conversation.last_message}
                    </span>

                  </div>

                </Link>
          )
  );
}
