import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import { CurrentChatProvider } from "@/context/currentChat";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export const metadata: Metadata = {
  title: "Shadcn Chat",
  description: "Chat/message components for Shadcn",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CurrentChatProvider>
      {/* <QueryClientProvider client={queryClient}> */}

      <html lang="en">
        <body className={GeistSans.className}>{children}</body>
      </html>
      {/* </QueryClientProvider> */}
    </CurrentChatProvider>
      
  );
}
