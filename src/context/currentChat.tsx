'use client'

import type { FC, ReactNode } from 'react';
import React, { createContext, useContext, useState } from 'react';

export type Context = {
  store: number;
  setStore: React.Dispatch<React.SetStateAction<number>>
};

const context = createContext({} as Context);
export const useCurrentChat = () => useContext(context);

export const CurrentChatProvider: FC<{ children: ReactNode }> = (props) => {
  const [store, setStore] = useState<Context['store']>({} as Context['store']);

  return (
    <context.Provider value={{ store, setStore }}>
      {props.children}
    </context.Provider>
  );
};