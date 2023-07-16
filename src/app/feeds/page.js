"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import Feed from "@/component/Feed";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";
function page() {
    const [feeds, setFeeds] = useState(null);
    const [user, loading, error] = useAuthState(auth);
    console.log(user);
    const router = useRouter();
    // GET DATA
    const getdata = async () => {
        await getDocs(collection(db, "datas")).then((querySnapshot) => {
            const newDatas = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setFeeds(newDatas);

            console.log(newDatas);
            console.log(feeds);
        });
    };
    useEffect(() => {
        if (!user) router.push("/");
        if (error) toast.error(error.message);
    }, [user]);
    useEffect(() => {
        getdata();
    }, []);
if(loading) return <h1 className="w-[100vw] h-[100vh] flex justify-center items-center">Loading...</h1>
    if (user)
  return (
    <>
      {feeds?.map((feed) => {
        return <Feed feed={feed} />;
      })}
    </>
  );


}

export default page;
