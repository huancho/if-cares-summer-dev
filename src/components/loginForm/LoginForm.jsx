'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { API_URL_ENDPOINT } from '@/constants/constants';
import { useRouter } from 'next/navigation';
import logo from '../../../public/ifcares-logo.png'

const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie =
    name +
    '=' +
    encodeURIComponent(value) +
    '; expires=' +
    expires +
    '; path=/';
};

const LoginForm = () => {
  const router = useRouter();
  const [submitData, setSubmitData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [invalidUser, setInvalidUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubmitData({ ...submitData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {
      email: '',
      password: '',
    };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(submitData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!submitData.password) {
      newErrors.password = 'Please enter a valid password';
    }
    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      setInvalidUser('');
      setIsLoading(true);
      submitData.type = 'login';
      fetch(API_URL_ENDPOINT, {
        redirect: 'follow',
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(submitData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'success') {
            // Store user credentials in a cookie
            setCookie('ifcaresSummer', JSON.stringify(data.data.id), 7);
            localStorage.setItem('ifcaresSummer', JSON.stringify(data.data));
            router.push('/');
            setIsLoading(false);
          } else {
            setIsLoading(false);
            setInvalidUser(data.message);
          }
        })
        .catch((e) => {
          setIsLoading(false);
          console.error(e);
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="min-w-[360px] sm:min-w-[400px] p-6 flex flex-col shadow-inner-xl bg-white"
    >
      <Image
        src={logo}
        width={200}
        height={100}
        alt="ifcares-logo"
        className="self-center mb-5"
      />

      <h2 className="text-xl font-medium mb-10 ml-3">
        Sign in to your account
      </h2>
      <div className="mb-10 relative">
        <motion.label
          htmlFor="email"
          className="absolute mt-2.5 ml-3 block text-sm font-medium text-gray-900"
          initial={{ y: 0, scale: 1, rotate: 0, x: 0 }}
          animate={
            emailFocused || submitData.email
              ? {
                  y: -35,
                  scale: 1,
                  rotate: [0, 10, -5, 0],
                  x: [-5, 5, -5, 0],
                }
              : { y: 0, scale: 1, rotate: 0, x: 0 }
          }
          transition={{
            y: { duration: 0.4, type: 'spring', stiffness: 300 },
            rotate: { duration: 0.6, type: 'spring', stiffness: 200 },
            x: { duration: 0.6, type: 'spring', stiffness: 200 },
          }}
        >
          Email
        </motion.label>

        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
          className={`border-t border-b shadow-inner text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none ${
            errors.email ? 'border border-red-600' : ''
          }`}
        />
        {errors.email && (
          <span className="text-xs text-red-600 ml-3 mt-1">{errors.email}</span>
        )}
      </div>
      <div className="mb-10 relative">
        <motion.label
          htmlFor="password"
          className="block absolute mt-2.5 ml-3 text-sm font-medium text-gray-900"
          initial={{ y: 0, scale: 1 }}
          animate={
            passwordFocused || submitData.password
              ? {
                  y: -35,
                  scale: 1,
                  rotate: [0, 10, -5, 0],
                  x: [-5, 5, -5, 0],
                }
              : { y: 0, scale: 1, rotate: 0, x: 0 }
          }
          transition={{
            y: { duration: 0.4, type: 'spring', stiffness: 300 },
            rotate: { duration: 0.6, type: 'spring', stiffness: 200 },
            x: { duration: 0.6, type: 'spring', stiffness: 200 },
          }}
        >
          Password
        </motion.label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
          className={`border-t border-b shadow-inner text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none ${
            errors.password ? 'border border-red-600' : ''
          }`}
        />
        {errors.password && (
          <span className="text-xs text-red-600 ml-3 mt-1">
            {errors.password}
          </span>
        )}
      </div>

      {/* <button type="submit" className="p-[3px] relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg" />
        <div className="px-8 py-2 bg-white rounded-[6px] relative group transition duration-200 text-black font-semibold hover:bg-transparent">
          Log In
        </div>
      </button> */}
      <button
        type="submit"
        className="px-8 py-2 rounded-full relative text-black text-sm hover:shadow-2xl hover:shadow-black/[0.1] transition duration-200 border border-slate-600"
      >
        <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-green-500 to-transparent" />
        <span className="relative z-20 font-semibold">Log In</span>
      </button>
      {/* <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
        </span>
        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-white py-0.5 px-4 ring-1 ring-white/10 text-black flex justify-center">
          <span>Log In</span>
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
      </button> */}
      {/* <button
        type="submit"
        className="text-white font-semibold rounded-lg text-base w-full px-5 py-2.5 text-center border bg-gradient-to-l from-green-500 to-blue-500"
      >
        Log In
      </button> */}
      {isLoading && (
        <div className="flex items-center justify-center mt-4">
          <div className="flex space-x-2 justify-center items-center bg-white">
            <span className="sr-only">Loading...</span>
            <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 bg-black rounded-full animate-bounce"></div>
          </div>
        </div>
      )}
      {invalidUser && (
        <h6 className="text-xs text-red-600 text-center mt-4">{invalidUser}</h6>
      )}
    </form>
  );
};

export default LoginForm;
