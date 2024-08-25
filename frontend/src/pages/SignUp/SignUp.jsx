import React, { useState } from 'react'
import axios from 'axios'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../configurations/firebase.js";
import './SignUp.css';

const SignUp = () => {

  const [formData, setFormData] = useState({name:"", email:"", password:"", imgUrl:""});
  const [imageUpload, setImageUpload] = useState(null);

  const uploadFile = async (name) => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `userProfileImages/${name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        console.log(url);
        await axios.patch(`${import.meta.env.VITE_API_URL}/api/users/update/profilePicture/${name}`, url, {
          withCredentials: true,
          headers: {
            'Content-Type': 'text/plain'
          }
        })
        .then((response) => {
          console.log(response);
          console.log(url);
          setCookie("imgUrl", url);
        })
      });
    });
  };

  const handleChange = (e) => {

    const { name, value } = e.target;
    
    setFormData({...formData, [name]: value });
    
  };

  const setCookie = (name, value) => {
    let expires = "";
    document.cookie = name + "=" + (value || "") + "; path=/";
};

  const handleSubmit = async () => {

    let obj = formData;
    obj.imgUrl = "";

    console.log(obj);

    await axios.post(`${import.meta.env.VITE_API_URL}/signup`, obj, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(async (response) => {
        if(response.data === "User Already Exists"){
            alert("Email is already registered");
            return;
        }
        console.log(response.data);
        let loginObj = {email: obj.email, password: obj.password}
        console.log(loginObj);
        await axios.post(`${import.meta.env.VITE_API_URL}/login`, loginObj, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then((response) => {
          console.log(response);
        })
        await uploadFile(response.data.userId);
    })
    .catch((error) => {
        alert(`Error:\n${error}`);
    })
  }

  return (
    <>
    <div className="quote">
        <h2>THE COMMUNITY AWAITS YOU</h2>
        <p>Login to join the discussions and share your thoughts</p>
    </div>

    <div className="formContainer">

            <div className="formContent">

                <div className="inputFields">

                    <div className="name">
                        <input type="text" name="name" placeholder="Name" required maxLength="16" onChange={handleChange}/>
                    </div>

                    <div className="email">
                        <input type="email" name="email" placeholder="Email" required onChange={handleChange}/>
                    </div>

                    <div className="password">
                        <input type="password" name="password" placeholder="Password" required autoComplete="new-password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@_$%^&*-\]\[]).{8,20}" title="Minimum Length = 8 Maximum Length = 20 Should contain both Uppercase and Lowercase characters Should at least one contain special character" onChange={handleChange}/>
                    </div>

                    <div className="img">
                        {/* <input type="url" name="imgUrl" className="img"/> */}
                        <input type="file" accept='image/jpg' onChange={(event) => {setImageUpload(event.target.files[0]);}}/>
                    </div>

                </div>

                <div className="submit">
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                    {/* <input type="submit" value="Submit" onClick={handleSubmit}/> */}
                </div>

            </div>

        <div className="login">
            <p className="loginText">Already Have an Account?</p><a href={`${import.meta.env.VITE_API_URL}/login.html`} className="loginLink">Login</a>
        </div>

    </div>
    </>
  )
}

export default SignUp