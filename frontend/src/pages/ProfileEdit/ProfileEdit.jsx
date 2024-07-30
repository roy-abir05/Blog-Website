import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../configurations/firebase.js";
import utf8 from "utf8";

const ProfileEdit = () => {

  const {userId} = useParams();

  const [name, setName] = useState('');
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

  const setUserInfo = async () => {
	await axios.get(`http://localhost:8080/api/users/get/getUserNameById/${userId}`)
	.then((response) => setName(response.data))
	.catch((e) => {
		setName(getCookie("name"));
	})

	await axios.get(`http://localhost:8080/api/users/get/getPasswordById/${userId}`)
	.then((response) => setPassword(response.data))
	.catch((e) => {
		setName("");
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
	setUserInfo();
  }, []);

  return (
    <div className='profileEditContainer'>
      <div className='profileNameContainer'>
        <span>Name: </span>
        <input type="text" name="name" value={utf8.decode(name)} onChange={(e)=>setName(e.target.value)}/>
      </div>
      <div className='profilePasswordContainer'>
        <span>Password: </span>
        <input type="password" name="password" value={password} placeholder="Password" required autoComplete="new-password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@_$%^&*-\]\[]).{8,20}" title="Minimum Length = 8 Maximum Length = 20 Should contain both Uppercase and Lowercase characters Should at least one contain special character" onChange={(e)=>setPassword(e.target.value)}/>
      </div>
      <div className='profileImageContainer'>
	  	<input type="checkbox" id="imageChange" checked={isChangeImageChecked} name="imageChange" onChange={() => setIsChangeImageChecked(!isChangeImageChecked)} style={{width: "25px", height: "25px"}}/>
    	<label htmlFor="imageChange">Change Image</label>
        <input type="file" accept='image/jpg' name="img" onChange={(event) => setImageUpload(event.target.files[0])}/>
      </div>
      <button type="submit" onClick={handleSubmit}>Save</button>
    </div>
  )
}

export default ProfileEdit;