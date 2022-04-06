import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CgMenuGridR } from 'react-icons/cg';
import { AiFillHome, AiOutlineLogout } from 'react-icons/ai';
import { FaPlaystation } from 'react-icons/fa';
import { IoFastFood, IoCalendarNumberSharp } from 'react-icons/io5';
import Link from 'next/link';
import Head from 'next/head';
import Logo from '../assets/img/logo.png';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setUser } from '../reducers/userReducer';

const Layout = ({ title, children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuHandler = () => setIsMenuOpen(!isMenuOpen);
  const router = useRouter();
  const dispatch = useDispatch();

  const checkUser = () => {
    const userStorage = localStorage.getItem('user');
    if (!userStorage) {
      return router.push('/login');
    }
    const userParse = JSON.parse(userStorage);
    if (userParse.username !== 'amigos') return router.push('/login');
    dispatch(setUser(userParse));
  };

  useEffect(() => {
    checkUser();
  }, []);

  const NavItem = ({ Icon, title }) => {
    return (
      <Link href={title.toLowerCase()}>
        <a className='capitalize' title={title}>
          <div
            className={`flex gap-2 my-2 bg-white p-1 rounded ${
              isMenuOpen && 'p-2 border-l-8 border-orange-600 rounded'
            }`}
          >
            <Icon size='2em' />
            {isMenuOpen && (
              <div className='my-auto flex-grow font-bold capitalize'>
                {title}
              </div>
            )}
          </div>
        </a>
      </Link>
    );
  };

  return (
    <div className='relative h-screen'>
      <Head>
        <title>{title} | Amigos Playstation</title>
      </Head>
      <div
        className={`fixed flex flex-col h-screen w-[3em] bg-orange-400 box-border py-2 px-1 z-[51] duration-100 ${
          isMenuOpen && `w-[13em]`
        }`}
      >
        <div onClick={menuHandler} className='flex justify-between'>
          <CgMenuGridR size='2.5em' className='text-white' />
        </div>
        <div className='pt-5'>
          <div className='my-2'>
            <Image src={Logo} alt='logo amigos' />
          </div>
          <NavItem Icon={AiFillHome} title='Dashboard' />
          <NavItem Icon={FaPlaystation} title='Konsol' />
          <NavItem Icon={IoFastFood} title='Menu' />
          <NavItem Icon={IoCalendarNumberSharp} title='Laporan' />
          <NavItem Icon={AiOutlineLogout} title='Logout' />
        </div>
      </div>
      {isMenuOpen && (
        <div
          onClick={menuHandler}
          className='overlay bg-black opacity-30 absolute top-0 left-0 right-0 bottom-0 z-50'
        ></div>
      )}
      <nav className='p-4 shadow-lg bg-orange-400 text-right text-white'>
        Amigos Playstation
      </nav>
      <div className='pl-[3em] relative'>
        <div className='p-2'>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
