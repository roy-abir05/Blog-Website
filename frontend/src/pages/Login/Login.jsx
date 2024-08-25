import axios from 'axios';
import React, { useState } from 'react'

const Login = () => {

  const [formData, setFormData] = useState({email:"", password:""});

  const handleSubmit = async () => {

    console.log("Inside Submit");
    
    await axios.post(`${import.meta.env.VITE_API_URL}/login`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then((response) => {
        console.log(response.data);
    })

  }

  const handleChange = (e) => {

    const { name, value } = e.target;
    
    setFormData({...formData, [name]: value });
    
  };

  return (
    <>
        <div className="quote">
            <h2>THE COMMUNITY AWAITS YOU</h2>
            <p>Login to join the discussions and share your thoughts</p>
        </div>

    <div className="formContainer">

            <div className="formContent">

                <div className="inputFields">

                    <div className="email">
                        <input type="text" name="email" placeholder="Email" required autoFocus onChange={handleChange}/>
                    </div>

                    <div className="password">
                        <input type="password" name="password" placeholder="Password" required autoComplete="current-password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@_$%^&*-\]\[]).{8,20}" onChange={handleChange}/>
                    </div>

                </div>

                <div className="submit">
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </div>

            </div>

        <div className="googleOAuth">
            <a href={`${import.meta.env.VITE_API_URL}/oauth2/authorization/google`}><img src="./googleLogo.png" alt=""/></a>
            <a href={`${import.meta.env.VITE_API_URL}/oauth2/authorization/google`} className="googleSignIn">Sign In With Google</a>
        </div>

        <div className="signup">
            <p className="signupText">New Here?</p><a href={`${import.meta.env.VITE_URL}/signup`} className="signupLink">Sign Up</a>
        </div>
    </div>
    </>
  )
}

export default Login