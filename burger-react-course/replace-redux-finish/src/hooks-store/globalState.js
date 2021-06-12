import { useEffect, useState } from "react";

let generalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
  const setState = useState(generalState)[1];

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](generalState, payload);
    generalState = {
      ...generalState,
      ...newState,
    };

    for (const listener of listeners) {
      listener(generalState);
    }
  };

  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState);
    }

    return () => {
      if (shouldListen) {
        listeners = listeners.filter((li) => li !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [generalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    generalState = { ...generalState, ...initialState };
  }

  actions = { ...actions, ...userActions };
};
