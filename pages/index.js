import Image from "next/image";
import { useState } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";
import { FaPlaystation } from "react-icons/fa";
import { IoFastFood, IoPricetagsSharp } from "react-icons/io5";
import Link from "next/link";
import Head from "next/head";
import Logo from "../assets/img/logo.png";

const Dashboard = ({ title }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuHandler = () => setIsMenuOpen(!isMenuOpen);

  const NavItem = ({ Icon, title }) => {
    return (
      <Link href={title.toLowerCase()}>
        <a>
          <div
            className={`flex gap-2 my-2 bg-white p-1 rounded ${
              isMenuOpen && "p-2 border-l-8 border-orange-600 rounded"
            }`}
          >
            <Icon size="2em" />
            {isMenuOpen && (
              <div className="my-auto flex-grow font-bold capitalize">
                {title}
              </div>
            )}
          </div>
        </a>
      </Link>
    );
  };

  return (
    <div className="relative h-screen">
      <Head>
        <title>{title} | Amigos Playstation</title>
      </Head>
      <div
        className={`fixed flex flex-col h-screen w-[3em] bg-orange-400 box-border py-2 px-1 z-10 duration-100 shadow ${
          isMenuOpen && `w-[13em]`
        }`}
      >
        <div onClick={menuHandler} className="flex justify-between">
          <CgMenuGridR size="2.5em" className="text-white" />
        </div>
        <div className="pt-5">
          <div className="my-2">
            <Image src={Logo} alt="logo amigos" />
          </div>
          <NavItem Icon={AiFillHome} title="Dashboard" />
          <NavItem Icon={FaPlaystation} title="Konsol" />
          <NavItem Icon={IoFastFood} title="Makanan" />
          <NavItem Icon={IoPricetagsSharp} title="Harga" />
        </div>
      </div>
      {isMenuOpen && (
        <div
          onClick={menuHandler}
          className="overlay bg-black opacity-30 absolute top-0 left-0 right-0 bottom-0"
        ></div>
      )}
      <nav className="p-4 shadow-lg text-right">Amigos Playstation</nav>
      <div className="pl-[3em]">
        <div className="p-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          unde quam consectetur, animi optio maxime fugiat iusto deserunt iure
          cumque? Error sequi, quibusdam suscipit tempora aliquid maiores
          tenetur. Temporibus, doloribus.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
