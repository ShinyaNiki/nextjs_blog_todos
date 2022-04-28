import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { SelectedType } from "../types/SelectedTask";
import { SelectedTypeContext } from "../types/SelectedTypeContext";

const initialContext = {
  id: 0,
  title: "",
  setSelectedTask: () => {},
};

export const StateContext = createContext<SelectedTypeContext | undefined>(
  undefined
);

type Props = {
  children: ReactNode;
};
export const StateContextProvider = (props: Props): JSX.Element => {
  const [selectedTask, setSelectedTask] =
    useState<SelectedType>(initialContext);
  return (
    <StateContext.Provider value={{ selectedTask, setSelectedTask }}>
      {props.children}
    </StateContext.Provider>
  );
};
