import { useEffect, useReducer } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d).{8,}$/;

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  validEmail: false,
  validPass: false,
  validMatch: false,
  loading: false,
  error: "",
};

export const enum REDUCER_ACTION_TYPE {
  SET_EMAIL,
  SET_PASSWORD,
  SET_CONFIRM_PASSWORD,
  SET_VALID_EMAIL,
  SET_VALID_PASS,
  SET_VALID_MATCH,
  SET_LOADING,
  SET_ERROR,
}

type ReducerAction =
  | { type: REDUCER_ACTION_TYPE.SET_EMAIL; payload: string }
  | { type: REDUCER_ACTION_TYPE.SET_PASSWORD; payload: string }
  | { type: REDUCER_ACTION_TYPE.SET_CONFIRM_PASSWORD; payload: string }
  | { type: REDUCER_ACTION_TYPE.SET_VALID_EMAIL; payload: boolean }
  | { type: REDUCER_ACTION_TYPE.SET_VALID_PASS; payload: boolean }
  | { type: REDUCER_ACTION_TYPE.SET_VALID_MATCH; payload: boolean }
  | { type: REDUCER_ACTION_TYPE.SET_LOADING; payload: boolean }
  | { type: REDUCER_ACTION_TYPE.SET_ERROR; payload: string };

const reducer = (
  state: typeof initialState,
  action: ReducerAction
): typeof initialState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SET_EMAIL:
      return { ...state, email: action.payload };
    case REDUCER_ACTION_TYPE.SET_PASSWORD:
      return { ...state, password: action.payload };
    case REDUCER_ACTION_TYPE.SET_VALID_EMAIL:
      return { ...state, validEmail: action.payload };
    case REDUCER_ACTION_TYPE.SET_VALID_PASS:
      return { ...state, validPass: action.payload };
    case REDUCER_ACTION_TYPE.SET_CONFIRM_PASSWORD:
        return { ...state, confirmPassword: action.payload };
    case REDUCER_ACTION_TYPE.SET_LOADING:
      return { ...state, loading: action.payload };
    case REDUCER_ACTION_TYPE.SET_VALID_MATCH:
        return { ...state, validMatch: action.payload };
    case REDUCER_ACTION_TYPE.SET_ERROR:
        return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const useFormReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: REDUCER_ACTION_TYPE.SET_VALID_EMAIL,
      payload: emailRegex.test(state.email),
    });
  }, [state.email]);

  useEffect(() => {
    dispatch({
      type: REDUCER_ACTION_TYPE.SET_VALID_PASS,
      payload: passwordRegex.test(state.password),
    });
  }, [state.password]);

  useEffect(() => {
    dispatch({
      type: REDUCER_ACTION_TYPE.SET_VALID_MATCH,
      payload: state.password === state.confirmPassword,
    });
  } , [state.password, state.confirmPassword]);

  return {state , dispatch};
};
