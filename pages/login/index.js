import Image from 'next/image';
import { BiUserCircle, BiKey, BiLogIn } from 'react-icons/bi';
import Logo from '../../assets/img/logo.png';
import Head from 'next/head';
import { useField } from '../../hooks';
import sweetalert from '../../lib/sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../reducers/userReducer';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const username = useField('text');
  const password = useField('password');
  const router = useRouter();
  const dispatch = useDispatch();
  const loginHandler = () => {
    const usernameValue = username.attr.value;
    const passwordValue = password.attr.value;
    if (usernameValue !== 'amigos' && passwordValue !== 'amigos96')
      return sweetalert.toast('username atau password gagal', false);
    const user = {
      username: usernameValue,
    };
    dispatch(setUser(user));
    localStorage.setItem('user', JSON.stringify(user));
    return router.push('/dashboard');
  };

  const checkUser = () => {
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      const userParse = JSON.parse(userStorage);
      if (userParse.username === 'amigos') return router.push('/dashboard');
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div>
      <Head>
        <title>Login Amigos Playstation</title>
      </Head>
      <div className='bg-slate-100 h-screen grid grid-cols-1 grid-rows-3 p-4'>
        <div className='my-2'>
          <Image src={Logo} alt='logo amigos playstation' />
        </div>
        <div className='text-center'>
          <div className='grid gap-2'>
            <strong>Login</strong>
            <div className='rounded border shadow mx-16 bg-white p-2 flex gap-2'>
              <BiUserCircle size='1.3em' className='my-auto' />
              <input
                {...username.attr}
                className='outline-none bg-slate-100 flex-grow rounded px-2 py-1'
                placeholder='username'
              />
            </div>
            <div className='rounded border shadow mx-16 bg-white p-2 flex gap-2'>
              <BiKey size='1.3em' className='my-auto' />
              <input
                {...password.attr}
                className='outline-none bg-slate-100 flex-grow rounded px-2 py-1'
                placeholder='password'
              />
            </div>
            <button
              onClick={loginHandler}
              className='bg-blue-500 text-white mx-16 rounded shadow p-2 active:bg-blue-700 flex gap-2 justify-center'
            >
              <BiLogIn size='1.3em' />
              <div>Login</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
