'use client';

import SvgIcon from '@components/reusables/SvgIcon';
import { useAuthActions } from '@hooks/useAuthActions';
import logo from '@public/images/logo.svg';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useEffect, useReducer, useState } from 'react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d).{8,}$/;

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
  validEmail: false,
  validPass: false,
  validMatch: false,
  loading: false,
  error: '',
};

const enum REDUCER_ACTION_TYPE {
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
  | { type: REDUCER_ACTION_TYPE.SET_PASSWORD, payload: string }
  | { type: REDUCER_ACTION_TYPE.SET_CONFIRM_PASSWORD, payload: string }
  | { type: REDUCER_ACTION_TYPE.SET_VALID_EMAIL, payload: boolean }
  | { type: REDUCER_ACTION_TYPE.SET_VALID_PASS, payload: boolean }
  | { type: REDUCER_ACTION_TYPE.SET_VALID_MATCH, payload: boolean }
  | { type: REDUCER_ACTION_TYPE.SET_LOADING, payload: boolean }
  | { type: REDUCER_ACTION_TYPE.SET_ERROR, payload: string }

const reducer = (state: typeof initialState, action: ReducerAction): typeof initialState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SET_EMAIL:
      return { ...state, email: action.payload };
    case REDUCER_ACTION_TYPE.SET_PASSWORD:
      return { ...state, password: action.payload };
    case REDUCER_ACTION_TYPE.SET_VALID_EMAIL:
      return { ...state, validEmail: action.payload };
    case REDUCER_ACTION_TYPE.SET_VALID_PASS:
      return { ...state, validPass: action.payload };
    case REDUCER_ACTION_TYPE.SET_LOADING:
      return { ...state, loading: action.payload };
    case REDUCER_ACTION_TYPE.SET_ERROR:
    default:
      return state;
  }
}

export default function page() {

  const [showPassword, setShowPassword] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const {handleSignUp} = useAuthActions();

  const router = useRouter();

  useEffect(() => {
    dispatch({ type: REDUCER_ACTION_TYPE.SET_VALID_EMAIL, payload: emailRegex.test(state.email) });
  }, [state.email]);

  useEffect(() => {
    dispatch({ type: REDUCER_ACTION_TYPE.SET_VALID_PASS, payload: passwordRegex.test(state.password) });
  }, [state.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!state.validEmail || !state.validPass) {
      dispatch({ type: REDUCER_ACTION_TYPE.SET_ERROR, payload: 'Please fill in all fields correctly.' });
      return;
    }

    if (state.validEmail && state.validPass) {
      dispatch({ type: REDUCER_ACTION_TYPE.SET_LOADING, payload: true });
      await handleSignUp({email : state.email , password : state.password});
      dispatch({ type: REDUCER_ACTION_TYPE.SET_LOADING, payload: false });

      alert('account created redirecting...');
      router.push('/login');
    }
  }

  return (
    <div className='flex flex-col gap-12 p-12 xs:p-4'>
      <header className='flex flex-col gap-4 items-center justify-center text-center'>
        <Image src={logo} alt='logo' className='w-32 h-18' />
        <div className='flex flex-col gap-1'>
          <h1>Create Your Account</h1>
          <p>Sign up to start organizing your notes and boost your productivity.</p>
        </div>
      </header>

      <div className='flex flex-col gap-4'>
        <div className="input-wrapper">
          <label htmlFor="email">Email Address</label>
          <input type="text" className={`${!state.validEmail && state.email ? 'input-invalid !w-full' : 'input !w-full'}`} id='email'
           placeholder='email@example.com'
           onChange={(e) => dispatch({ type: REDUCER_ACTION_TYPE.SET_EMAIL, payload: e.currentTarget.value })} />
        </div>

        <div className="input-wrapper">
          <label htmlFor="new-pass" className="block mb-1">Password</label>
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              id="new-pass"
              className={`${!state.validPass && state.password ? 'input-invalid !w-full' : 'input !w-full'}`}
              onChange={(e) => dispatch({ type: REDUCER_ACTION_TYPE.SET_PASSWORD, payload: e.currentTarget.value })}
            />
            <div
              className="show-pass absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <SvgIcon path='hide-password' /> : <SvgIcon path='show-password' />}
            </div>
          </div>
          <div className="input-info flex items-center gap-1 mt-1 text-sm text-gray-500">
            <SvgIcon path="info" />
            <p>At least 8 characters</p>
          </div>
        </div>
        <button type='button' className="primary-btn" onClick={handleSubmit}>Sign Up</button>

        <div className="line"></div>
        <div className="google-auth flex flex-col gap-4 items-center justify-center">
          <p>Or log in with:</p>
          <button className='flex items-center justify-center p-3 gap-4 w-full border border-neutral-300 rounded-lg'>
            <SvgIcon path='google' />
            <h2>Google</h2>
          </button>
        </div>
        <div className="line"></div>
        <div className="already flex items-center justify-center gap-2">
          <p>Already have an account?</p>
          <a href='/login'>Login</a>
        </div>
      </div>
    </div>
  )
}
