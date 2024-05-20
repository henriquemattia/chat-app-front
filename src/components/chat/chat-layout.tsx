"use client";

import { Conversations, userData } from "@/app/data";
import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { Sidebar } from "../sidebar";
import { Chat } from "./chat";
import axios from "axios";
import { SidebarUser } from "../sideBarUser";

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function ChatLayout({ defaultLayout = [320, 480], defaultCollapsed = false, navCollapsedSize,}: ChatLayoutProps) {

  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [isMobile, setIsMobile] = useState(false);
  
  const [conversations, setConversations] = useState<Conversations[]>([]);
  const [conversationId, setConversationId] = useState<number>();


  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);

      axios.get('http://localhost/api/conversations/1')
      .then(function (response) {
        setConversations(response.data.data)
        // console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    };

    // Initial check
    checkScreenWidth();

    // Event listener for screen width changes
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);


  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}`;
      }}
      className="h-full items-stretch"
    >

      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={isMobile ? 0 : 24}
        maxSize={isMobile ? 8 : 30}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true
          )}`;
        }}
        onExpand={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false
          )}`;
        }}
        className={cn(
          isCollapsed && "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
        )}
      >

        <Sidebar isCollapsed={isCollapsed || isMobile} conversationsAmount={conversations.length} >

          {conversations.map(function (conversation) {
            conversation.avatar = '/User2.png';
            conversation.variant = "grey";

            return [
              <button
              className="reset"
              key={conversation.conversation_id}
              onClick={() => console.log(conversation.conversation_id)}
              //estilo do botao ta zoando o coisa, ver alguma forma pra resetar a estilização dele
              >
              <SidebarUser
                  conversation={conversation}
                  isCollapsed={isCollapsed || isMobile} />
              </button>
                
              ]
            })
          }
         
        </Sidebar>
        
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        {/* <Chat
          messages={[]}
          selectedUser={}
          isMobile={isMobile}
        /> */}
      </ResizablePanel>

    </ResizablePanelGroup>
  );
}
