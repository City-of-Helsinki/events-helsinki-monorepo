import { useReducer } from 'react';

type AddError = { type: 'addError'; error: Error };
type RemoveError = {
  type: 'removeError';
  error: Error;
};
type ClearAllErrors = { type: 'clearErrors' };
export type ToastableErrorActions = AddError | RemoveError | ClearAllErrors;

export function apolloErrorsReducer(
  state: Error[],
  action: ToastableErrorActions
) {
  switch (action.type) {
    case 'addError': {
      if (state.find((error) => error.message === action.error.message))
        // NOTE: If nothing changes, don't create a new object to prevent state chagnes.
        return state;
      return [...state, action.error];
    }
    case 'removeError': {
      return [
        ...state.filter((error) => error.message !== action.error.message),
      ];
    }
    case 'clearErrors': {
      return [];
    }
    default:
      throw new Error('The action type is not supported!');
  }
}

export function useApolloErrorsReducer(initialState: Error[] = []) {
  return useReducer(apolloErrorsReducer, initialState);
}
