import type { ToastableErrorActions } from '../apolloErrorsReducer';
import { apolloErrorsReducer } from '../apolloErrorsReducer';

describe('apolloErrorsReducer', () => {
  describe('addError action', () => {
    it.each<Array<Error[]>>([[[]], [[new Error('1st error')]]])(
      'adds errors to the list of errors when the errors is not there yet (%#)',
      async (state) => {
        const error = new Error('new error');
        const action = {
          type: 'addError',
          error,
        } as ToastableErrorActions;
        const addError = apolloErrorsReducer(state, action);
        expect(addError).toContain(error);
      }
    );
  });

  describe('removeError action', () => {
    const error1 = new Error('1st error');
    const error2 = new Error('2nd error');

    it.each<Array<Error[]>>([[[]], [[error1]], [[error1, error2]]])(
      'removes the error from the list of errors (%#)',
      async (state) => {
        const action = {
          type: 'removeError',
          error: error1,
        } as ToastableErrorActions;
        const removeError = apolloErrorsReducer(state, action);
        expect(removeError).not.toContain(error1);
        expect(removeError).toHaveLength(state.length ? state.length - 1 : 0);
      }
    );
  });

  describe('clearErrors action', () => {
    const error1 = new Error('1st error');
    const error2 = new Error('2nd error');

    it.each<Array<Error[]>>([[[]], [[error1]], [[error1, error2]]])(
      'removes all the existing errors (%#)',
      async (state) => {
        const action = {
          type: 'clearErrors',
        } as ToastableErrorActions;
        const clearErrors = apolloErrorsReducer(state, action);
        expect(clearErrors).toHaveLength(0);
      }
    );
  });
});
