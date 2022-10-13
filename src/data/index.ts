import {
  createContext,
  SetStateAction,
  Dispatch,
  useContext,
} from "react";

import { state, StateType } from "./state";

// create the context
export const AppContext = createContext<StateType>(state);
export const AppUpdateContext = createContext<Dispatch<SetStateAction<StateType>>>(() => {});

export function useData(): { state: StateType, update: (data: StateType) => void } {
  const state = useContext(AppContext);
  const setAppState = useContext(AppUpdateContext);
  
  function update(data: StateType) {
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