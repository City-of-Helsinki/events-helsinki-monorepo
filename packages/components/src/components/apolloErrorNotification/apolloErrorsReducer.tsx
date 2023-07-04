type AddError = { type: 'addError'; error: Error };
type RemoveError = {
  type: 'removeError';
  error: Error;
};
type ClearAllErrors = { type: 'clearErrors' };
type ToastableErrorActions = AddError | RemoveError | ClearAllErrors;

export default function errorsReducer(
  state: Error[],
  action: ToastableErrorActions
) {
  switch (action.type) {
    case 'addError': {
      if (state.find((error) => error.message === action.error.message))
        return [...state];
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
