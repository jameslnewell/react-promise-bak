import {useReducer, useEffect, Reducer} from 'react';
import {Dependencies, Factory} from './types';
import {State} from './utils/State';
import {Action, reset} from './utils/Action';
import {useMounted} from './utils/useMounted';
import {reducer} from './utils/reducer';
import {initialState} from './utils/initialState';
import {isPromise} from './utils/isPromise';
import {track} from './utils/track';
import {getOutput, Output} from './utils/getOutput';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useInvokablePromise<T, P extends any[]>(
  fn: Factory<T, P>,
  deps: Dependencies = [],
): Output<T> & {invoke: (...args: P) => Promise<void>} {
  const isMounted = useMounted();
  const [state, dispatch] = useReducer<Reducer<State<T>, Action<T>>>(
    reducer,
    initialState,
  );

  const invoke = async (...args: P): Promise<void> => {
    // execute and track the promise state
    const promise = fn(...args);
    if (isPromise(promise)) {
      await track(promise, dispatch, isMounted);
    }
  };

  // reset promise state whenever the dependencies change i.e. the result returned by the function will be a new promise
  useEffect(() => {
    dispatch(reset());
  }, deps);

  return {...getOutput(state), invoke};
}
