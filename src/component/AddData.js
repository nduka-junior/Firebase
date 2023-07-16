import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "@/lib/firebase/firebase";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import LinearProgress from "@mui/material/LinearProgress";
import { useRouter } from "next/navigation";
function AddData() {
  const [text, setText] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [disabled, setDisabled] = useState(false);
  const [files, setFiles] = useState("");
  const [percent, setPercent] = useState(null);
const router = useRouter()
  const addData = async (url) => {
    if (!text) {
      toast.error("Please enter name");
      return;
    }
    try {
      setDisabled(true);

      // console.log(handleImageUpload);
      const docRef = doc(collection(db, "datas"));
      await setDoc(docRef, {
        text: text,
        userid: user.uid,
        name: user.displayName,
        date: new Date().getTime(),
        id: docRef.id,
        photoURL: user.photoURL,
        image: url || [],
      });
      console.log("Document written with ID: ", docRef.id);
      toast.success("Data added successfully");
      setText("");
      setDisabled(false);
      router.push('/feeds')
    } catch (e) {
      setDisabled(true);
      console.error("Error adding document: ", e);
      toast.error(`Error adding document ${e}`);
      setText("");
      setDisabled(false);
    }
  };

  const handleImageUpload = async (imageFile) => {
    // Error handling || if images.length < 0 || null

    //  storage ref
    const storageRef = ref(storage, `images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    //  upload task events
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent + 0.002);
        console.log(percent);
      },
      (error) => {
        toast.error(error.message);
        console.log(error);
      }
    );

    await uploadTask;

    let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    // 👆 getDownloadURL returns a promise too, so...
    console.log(downloadURL);
    setPercent(null);
    return downloadURL;
  };
  //
  function handleChange(event) {
    setFiles(event.target.files);
  }
  const handleUpload = async () => {
    // const url = await handleImageUpload(files);
    let url = [];
  
    for (const file of files) {
      const durl = await handleImageUpload(file);
      url.push(durl);
      console.log(durl);
    }

    addData(url);
  };
  return (
    <>
      {percent && (
        <LinearProgress
          variant="determinate"
          value={percent}
          sx={{
            backgroundColor: "#fff",
            borderColor: "pink",
          }}
        />
      )}

      <div className=" mt-3  flex  justify-start flex-col">
        <div className="flex items-center">
          <h1 className="text-lg mr-3">Enter name:</h1>
          <input
            type="text"
            className="outline-none p-2 bg-[#5b5b5b82]"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="flex items-center  mt-4">
          <h1  className="text-lg mr-3">
            Upload Image
          </h1>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleChange}
    
          />
        </div>

        <button
          className="rounded border-solid  border-2 border-[#cececec8] px-3 py-2 ml-4 hover:text-[#acacac] hover:border-[white] text-[13px] mt-4 w-[50%]"
          onClick={() => {
            // addData();
            handleUpload();
          }}
          disabled={disabled}
        >
          Submit
        </button>
      </div>

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
    </>
  );
}

export default AddData;
