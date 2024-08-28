// app/login/page.tsx
'use client';

import { useState } from 'react';
import { tryLogin } from '@@/src/hooks/CollectionAPI';
import { ResponseData } from '@@/src/types/apitypes';
import { Notify } from '@@/src/utils/script';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import myImageLoader from '@@/src/utils/loader';
import { G } from '@@/src/client/global.min.js'

export default function LoginPage() {
  const [value, setValue] = useState({
    email: '',
    password: ''
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const payload = {
    //   userName: value.email,
    //   password: value.password
    // }

    let uus = G().enc(
      JSON.stringify({
        user: value.email,
        pass: value.password,
      }),
      2,
      6
    );

    const pwd = G()
      .rndStr(uus.length, 1, 6)
      .substring(0, uus.length)
      .replace(/\W/g, "");

    let payload = {
      us: uus,
      pass: pwd,
    };

    const result: ResponseData = await tryLogin(payload)
    console.log("page", result)
    if(result.success){
      Notify(result.message, 'success')
      Notify('Welcome Zinedine', 'info', 5000)
      setTimeout(() => {
        router.push('/usr')
      }, 2000);
    }else{
      Notify(result.message, 'error')
    }
  };

  const handleChange = (input: string, target: string) => {
    setValue({ ...value, [target]: input })
  }

  return (
    <section className='flex items-center justify-center w-screen h-screen'>
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
            <div className="flex justify-center mx-auto relative">
                <Image
                  src="https://merakiui.com/images/logo.svg" 
                  alt="Gambar login"
                  width={50} 
                  height={50}
                  placeholder={`data:image/${myImageLoader(50, 50)}`}
                  // placeholder='blur'
                  // blurDataURL={myImageLoader(300, 500)}
                />
            </div>

            <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>

            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account</p>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="w-full mt-4">
                    <input value={value.email} name='email' onChange={(e) => handleChange(e.target.value, e.target.name)} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Email Address" aria-label="Email Address" />
                </div>

                <div className="w-full mt-4">
                    <input value={value.password} name='password' onChange={(e) => handleChange(e.target.value, e.target.name)} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" />
                </div>

                <div className="flex items-center justify-between mt-4">
                    <button type='button' className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">Forget Password?</button>

                    <button type='submit' className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        Sign In
                    </button>
                </div>
            </form>
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
            {/* <span className="text-sm text-gray-600 dark:text-gray-200">Don't have an account? </span> */}

            <a href="#" className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Register</a>
        </div>
      </div>
    </section>
  );
}
