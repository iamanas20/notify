import {
  createContext,
  SetStateAction,
  Dispatch,
  useContext,
} from "react";

import { state } from "./state";
import { StateType } from "./types";

// create the context
export const AppContext = createContext<StateType>(state);
export const AppUpdateContext = createContext<Dispatch<SetStateAction<StateType>>>(() => {});

export function useData(): { state: StateType, update: (data: Partial<StateType>) => void } {
  const state = useContext(AppContext);
  const setAppState = useContext(AppUpdateContext);
  
  function update(data: Partial<StateType>) {
    // use immutable when we start the update
    setAppState({
      ...state,
      ...data,
    });
  }

  return {
    state,
    update
  }
}