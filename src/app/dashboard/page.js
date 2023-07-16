"use client";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import {  toast } from "react-toastify";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";
import AddData from "@/component/AddData";
function Page() {
  //   const [user, loading, error] = middleware();
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (error) toast.error(error.message);

    if (localStorage.getItem("user")) {
      toast.success("Signed in successfully");
      localStorage.removeItem("user");
    }

    if (!user) router.push("/");
  }, [user]);


  if (user)
    return (
      <>
        
            <AddData />
       
      </>
    );
}

export default Page;
