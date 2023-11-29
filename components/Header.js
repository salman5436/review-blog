import React, { useState, useEffect } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prevState => !prevState);
  };

  // useEffect(() => {

  //   if (mobileMenuOpen) {
  //     window.addEventListener("click", handleClickOutside);
  //   }

  //   return () => {
  //     window.removeEventListener("click", handleClickOutside);
  //   };
  // }, [mobileMenuOpen]);

  const googleSignin = (e) => {
    e.preventDefault();
    signIn("google");
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-gray-800 text-xl font-bold md:text-2xl hover:text-gray-700">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-400 from-sky-500">Heart-y-Reviews</span>
          </Link>

          <div className="flex md:hidden">
          <span className="mx-5 text-gray-700 text-md">{session?.user.name}</span>

            <button onClick={toggleMobileMenu} type="button" className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600">
              <span className="block h-0.5 w-8 bg-gray-600 mb-1"></span>
              <span className="block h-0.5 w-8 bg-gray-600 mb-1"></span>
              <span className="block h-0.5 w-8 bg-gray-600"></span>
            </button>
          </div>
        </div>

      {/* Mobile Menu */}
        <div className={`absolute left-0 z-50 w-full bg-white shadow-md md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <Link href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Home</Link>
          {session && (
            <>
              <Link href="/account" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Account</Link>
              <Link href="/create" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Create Review</Link>
            </>
          )}
          <div className="items-center py-2 md:mx-0">
          {session ? (
            <>
              <button onClick={() => signOut()} className="mx-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Sign Out</button>
            </>
          ) : (
            <button onClick={googleSignin} className="mx-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Sign In</button>
          )}
        </div>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex justify-end items-center mr-10">
        <Link href="/" className="my-2 text-gray-800 hover:bg-gray-100 md:mx-4 py-2 px-2">Home</Link>
        {session && (
          <>
            <Link href="/account" className="my-2 text-gray-800 hover:bg-gray-100 md:mx-4 py-2 px-2">Account</Link>
            <Link href="/create" className="my-2 text-gray-800 hover:bg-gray-100 md:mx-4 py-2 px-2">Create Review</Link>
          </>
        )}
        <div className="flex items-center py-2 md:mx-0">
          {session ? (
            <>
              <span className="mx-2 text-gray-700 text-md">{session.user.name}</span>
              <button onClick={() => signOut()} className="mx-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Sign Out</button>
            </>
          ) : (
            <button onClick={googleSignin} className="mx-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Sign In</button>
          )}
        </div>
      </div>
      {/* <style jsx>{`
        .header-menu {
          transition: all 0.3s ease;
          transform-origin: top;
          transform: scaleY(0);
          opacity: 0;
      }
      
      .header-menu.block {
          transform: scaleY(1);
          opacity: 1;
      }
      
      `}</style> */}
    </nav>
  );
};

export default Header;
