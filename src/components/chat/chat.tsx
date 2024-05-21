import { Message, UserData } from "@/app/data";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface ChatProps {
  change: number;
  conversationId: number;
  isMobile: boolean;
}

export function Chat({ change, conversationId, isMobile }: ChatProps) {
  const [messagesState, setMessages] = useState<Message[]>([]);

  const sendMessage = (newMessage: Message) => {
    setMessages([...messagesState, newMessage]);
  };

  console.log(messagesState)
  useEffect(() => {
    if (conversationId > 0) {
        axios.get(`http://localhost/api/messages/${conversationId}`)
        .then(function (response) {
          setMessages(response.data.data)
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }, [change])
    

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar authenticatedUserId={1} />

      <ChatList
        messages={messagesState}
        authenticatedUserId={1}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
