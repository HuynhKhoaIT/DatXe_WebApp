"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type DataType = {
  firstName: string;
};

interface ContextProps {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  data: DataType[];
  setData: Dispatch<SetStateAction<DataType[]>>;
  cart: number;
  setCart: Dispatch<SetStateAction<number>>;
  noti: boolean;
  setNoti: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProps>({
  userId: "",
  setUserId: (): string => "",
  data: [],
  setData: (): DataType[] => [],
  cart: 0,
  setCart: (): number => 0,
  noti: false,
  setNoti: (): boolean => false,
});

export const GlobalContextProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [data, setData] = useState<[] | DataType[]>([]);
  const [cart, setCart] = useState(0);
  const [noti, setNoti] = useState(false);
  return (
    <GlobalContext.Provider
      value={{ userId, setUserId, data, setData, cart, setCart, noti, setNoti }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
