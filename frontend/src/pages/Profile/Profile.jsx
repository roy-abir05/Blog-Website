import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
// import './Profile.css'
import axios from 'axios'
import NavBar from '../../components/NavBar/NavBar'
import utf8 from 'utf8'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'


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
      return true;
    }

    useEffect(() => {
       getUserInfo();
      //  hideUserEmail();
    }, []);

  return (
    <div className='w-screen'>
    <NavBar/>
    <Card className="w-1/3 m-auto">
      <CardHeader className='w-full'>
        <div className='w-full flex flex-col items-center justify-between'>
          <div className='w-2/5 mb-5'>
            <img src={userImg} className='w-full'/>
          </div>
          <div className='w-2/5 flex justify-center mt-5'>
            <CardTitle className='text-tertiary'>{userName}</CardTitle>
          </div>
        </div>
        <CardDescription className='w-full flex justify-center'>{userEmail}</CardDescription>
      </CardHeader>
      <CardContent className='w-full flex justify-center'>
        {checkLoggedIn() ? <Link to={`/profile/${userId}/edit`}><Button className='font-semibold'>Edit</Button></Link> : <></>}
      </CardContent>
    </Card>
    </div>
    // <div className="profilePageContainer w-full flex flex-col items-center content-center">
    //   <NavBar />
    //   {/* <img src="../../../public/EditIcon.png"/> */}
    //   <div className="profilePageBoxContainer">
    //   <div className='profilePageMainContainer'>
    //     <div className="imgContainer">
    //       <div className='userImgBlankBackground w-full flex items-center content-center'>
    //         {/* <img src="../../public/blankProfilePicture.png"/> */}
    //         <img src={userImg} className='w-30 h-20'/>
    //         <div className='userNameContainer'>
    //           <h2>{utf8.decode(userName)}</h2>
    //         </div>
    //       </div>
    //     </div>
    //     <div className='profilePageInfoContainer'>
    //       <div className="userEmailContainer">
    //         {userEmail}
    //       </div>
    //       <div className="userAboutContainer">
    //         <h3>About</h3>
    //         <p>
    //           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto aperiam eos distinctio sapiente iusto esse? Dolores hic nam fuga ut beatae sed cum earum, impedit, et itaque exercitationem, tempore delectus cumque harum eum! Tenetur tempora reiciendis numquam nisi perspiciatis placeat!
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    //   </div>
    //   {checkLoggedIn() ? <Link to={`/profile/${userId}/edit`}><div className='editContainer'><img src="../../../public/EditIcon.png"/></div></Link> : <></>}
    // </div>
  )
}

export default Profile