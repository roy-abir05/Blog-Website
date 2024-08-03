import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../configurations/firebase.js";
import utf8 from "utf8";
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Button } from '@/components/ui/button.jsx';

const ProfileEdit = () => {

  const {userId} = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUpload, setImageUpload] = useState(null);

  const [isChangeImageChecked, setIsChangeImageChecked] = useState(false);

  const getCookie = (cname) => {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  const checkLoggedIn = () => {
    let loginCookie = getCookie("login");
    if(loginCookie!=="Success") return false;
    if(getCookie("userId")!=userId) return false;
    return true;
  }

  const getUserInfo = async () => {
    await axios.get(`http://localhost:8080/api/users/get/getUserById/${userId}`)
    .then((response) => {
        // console.log(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setPassword(response.data.password);
        if(response.data.imgUrl==null) return;
    })
    .catch((e) => {
        alert(`Error in fetching user information at this moment\n${e}`);
    })
  }

  const deleteImage = (name) => {
    let imageRef = ref(storage, `userProfileImages/${name}`);
    deleteObject(imageRef).then(()=>{}).catch((e)=>console.log("Firebase:\n", e)); 
  }

  const uploadFile = async (name) => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `userProfileImages/${name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        console.log(url);
        await axios.patch(`http://localhost:8080/api/users/update/profilePicture/${name}`, url, {
          headers: {
            'Content-Type': 'text/plain'
          }
        })
        .then((response) => console.log(response))
      });
    });
  };

  const handleSubmit = async () => {

	let data = `{"name": "${name}", "password": "${password}"}`;

	await axios.patch(`http://localhost:8080/api/users/update/userInfo/${getCookie("userId")}`, JSON.parse(data))
	.then((response) => {
	if(isChangeImageChecked===false) return;
    deleteImage(userId);
    uploadFile(userId);
	})
	.catch((e) => {
		alert(e);
	})
  }

  useEffect(() => {
    if(checkLoggedIn===false){
		window.location.href = "http://localhost:5173";
		return;
	}
	// setUserInfo();
  getUserInfo();
  }, []);

  return (
    <div className='profileEditContainer w-full h-screen flex flex-col items-center justify-evenly'>
      <div className='profileNameContainer'>
        <Label htmlFor="name">Name:</Label>
        <Input type="text" name="name" value={utf8.decode(name)} onChange={(e)=>setName(e.target.value)}/>
      </div>
      <div>
        <Label htmlFor="email">Email:</Label>
        <Input disabled type="email" id="email" value={email} />
      </div>
      <div className='profilePasswordContainer'>
        <Label htmlFor="password">Password:</Label>
        <Input type="password" name="password" value={password} placeholder="Password" required autoComplete="new-password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@_$%^&*-\]\[]).{8,20}" title="Minimum Length = 8 Maximum Length = 20 Should contain both Uppercase and Lowercase characters Should at least one contain special character" onChange={(e)=>setPassword(e.target.value)}/>
      </div>
      <div className='profileImageContainer'>
	  	<input type="checkbox" id="imageChange" checked={isChangeImageChecked} name="imageChange" onChange={() => setIsChangeImageChecked(!isChangeImageChecked)} style={{width: "25px", height: "25px"}}/>
    	<label htmlFor="imageChange">Change Image</label>
        <input type="file" accept='image/jpg' name="img" onChange={(event) => setImageUpload(event.target.files[0])}/>
      </div >
      <div className='w-full flex justify-center'>
        <Button type="submit" onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  )
}

export default ProfileEdit;