import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'

const SignInButton = () => {
  const { data: session } = useSession()

  return (
    <div>
      {session ? (
        <div className="relative inline-flex items-center">
          {/* Display user image or placeholder */}
          {session?.user?.image ? (
             <Image
              src={session.user.image}
              alt={session.user.name || 'User avatar'}
              className="h-10 w-10 rounded-full"
              width={40}
              height={40}
              layout="fixed"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">User</span>
            </div>
          )}

          {/* User name and email */}
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {session.user.name || 'User name'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {session.user.email}
            </p>
          </div>

          {/* Sign Out Button */}
          <button
            className="ml-3 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-200"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      ) : (
        // Sign In Button
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-200"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      )}
    </div>
  )
}

export default SignInButton
