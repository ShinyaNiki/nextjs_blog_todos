import { Dispatch, SetStateAction } from "react";
import { SelectedType } from "./SelectedTask";

export type SelectedTypeContext = {
  selectedTask: SelectedType;
  setSelectedTask: Dispatch<SetStateAction<SelectedType>>;
};
