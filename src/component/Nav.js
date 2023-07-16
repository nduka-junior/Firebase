"use client";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";
function Nav() {
  const [user, loading, error] = useAuthState(auth);
const router = useRouter()
  const signOut = () => {
    auth.signOut().then((res) => {
      console.log(res);
      localStorage.setItem("logout", "true");
      router.push('/')

    });
  };
  return (
    <div>
      {user && (
        <div className="bg-[#212121cb] text-white flex justify-between items-center p-3 ">
          <h1>Welcome {user.displayName}</h1>
          <div className="  flex justify-between items-center">
            <Image
              src={user.photoURL}
              alt={user.displayName}
              width={40}
              height={40}
              className="rounded-full"
            />

            <button
              className="rounded border-solid  border-2 border-[#cececec8] px-4 py-2 ml-4 hover:text-[#acacac] hover:border-[white] text-[12px]"
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Nav;
