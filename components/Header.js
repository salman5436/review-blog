import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();

  let googleSignin = function (e) {
    e.preventDefault() 
    signIn("google")
  }


  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/" className="text-gray-800 text-xl font-bold md:text-2xl hover:text-gray-700">
              MyApp
            </Link>
          </div>

          {/* TO DO: Mobile Menu open: "block", Menu closed: "hidden" */}
          <div className="flex md:hidden">
            <button type="button" className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600">
              {/* Icon for mobile menu */}
            </button>
          </div>
        </div>

        <div className="md:flex items-center">
          <div className="flex flex-col md:flex-row md:mx-6">
            <Link href="/" className="my-1 text-sm text-gray-700 hover:text-blue-500 md:mx-4 md:my-0">
              Home
            </Link>
            {session && (
              <div>
                <Link href="/account" className="my-1 text-sm text-gray-700 hover:text-blue-500 md:mx-4 md:my-0">
                  Account
                </Link>
                <Link href="/create" className="my-1 text-sm text-gray-700 hover:text-blue-500 md:mx-4 md:my-0">
                  Create Review
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center py-2 -mx-1 md:mx-0">
            {session ? (
              <>
                <span className="mx-2 text-gray-600 text-sm">{session.user.name}</span>
                <button
                  onClick={() => signOut()}
                  className="mx-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={googleSignin}
                className="mx-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
