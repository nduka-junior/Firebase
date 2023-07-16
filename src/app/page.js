"use client";
import { auth } from "@/lib/firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
//
export default function Home() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const googleProvider = new GoogleAuthProvider();
 
  if (user) router.back();
  const signInWithGooogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token + "token");
        // The signed-in user info.
        const user = result.user;
        console.log(user);

        localStorage.setItem("user", true);
        // localStorage.removeItem("logout");
        router.push("/dashboard");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        console.log(error + "error");
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  useEffect(() => {
    if (localStorage.getItem("logout")) {
      toast.success("Signed out successfully");
      localStorage.removeItem("logout");
    }
  }, []);

  return (
    <main className="flex h-[100vh] items-center justify-center flex-col gap-4 ">
      <button
        onClick={() => {
          signInWithGooogle();
        }}
        className=" bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded"
      >
        Sign In with Google
      </button>
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
}
