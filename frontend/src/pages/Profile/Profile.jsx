import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import './Profile.css'
import axios from 'axios'
import NavBar from '../../components/NavBar/NavBar'

const Profile = () => {
    const {userId} = useParams();

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userImg, setUserImg] = useState('../../../blankProfilePicture.png');

    const hideUserEmail = (userEmail) => {
      if(userEmail.length==0) return;
      let email = userEmail[0];
      let last=userEmail.length;
      for(let i=userEmail.length-1; i>=0; i--){
        if(userEmail[i]=='@'){
          last = i; break;
        }
      }
      for(let i=1; i<last; i++) email += '*';
      for(let i=last; i<userEmail.length; i++) email += userEmail[i];

      return email;
    }

    const getUserInfo = async () => {
        await axios.get(`http://localhost:8080/api/users/get/getUserById/${userId}`)
        .then((response) => {
            console.log(response.data);
            setUserName(response.data.name);
            setUserEmail(hideUserEmail(response.data.email));
            if(response.data.imgUrl==null) return;
            setUserImg(response.data.imgUrl);
        })
        .catch((e) => {
            alert(`Error in fetching user information at this moment\n${e}`);
        })
    }

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
      console.log("hello");
      return true;
    }

    useEffect(() => {
       getUserInfo();
      //  hideUserEmail();
    }, []);

  return (
    <div className="profilePageContainer">
      <NavBar />
      {/* <img src="../../../public/EditIcon.png"/> */}
      <div className="profilePageBoxContainer">
      <div className='profilePageMainContainer'>
        <div className="imgContainer">
          <div className='userImgBlankBackground'>
            {/* <img src="../../public/blankProfilePicture.png"/> */}
            <img src={userImg}/>
          </div>
        </div>
        <div className='profilePageInfoContainer'>
          <div className='userNameContainer'>
            <h2>{userName}</h2>
          </div>
          <div className="userEmailContainer">
            {userEmail}
          </div>
          <div className="userAboutContainer">
            <h3>About</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto aperiam eos distinctio sapiente iusto esse? Dolores hic nam fuga ut beatae sed cum earum, impedit, et itaque exercitationem, tempore delectus cumque harum eum! Tenetur tempora reiciendis numquam nisi perspiciatis placeat!
            </p>
          </div>
        </div>
      </div>
      </div>
      {checkLoggedIn() ? <Link to={`/profile/${userId}/edit`}><div className='editContainer'><img src="../../../public/EditIcon.png"/></div></Link> : <></>}
    </div>
  )
}

export default Profile