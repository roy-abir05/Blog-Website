import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import ListBlogs from './pages/ListBlogs/ListBlogs.jsx';
import CreateBlogs from './pages/CreateBlogs/CreateBlogs.jsx';
import MyBlogs from './pages/MyBlogs/MyBlogs.jsx';
import ShowBlog from './pages/ShowBlog/ShowBlog.jsx';
import Profile from './pages/Profile/Profile.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import Login from './pages/Login/Login.jsx';
import ProfileEdit from './pages/ProfileEdit/ProfileEdit.jsx';
import { ThemeProvider } from "@/components/theme-provider"
import NavBar from './components/NavBar/NavBar.jsx';
import About from './pages/About/About.jsx';

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path="/blogs/listBlogs" element={<ListBlogs/>}></Route>
          <Route path="/blogs/myBlogs" element={<MyBlogs />}></Route>
          <Route path="/blogs/showBlog" element={<ShowBlog />}></Route>
          <Route path="/blogs/createBlogs" element={<CreateBlogs/>}></Route>
          <Route path="/profile/:userId" element={<Profile />}></Route>
          <Route path='/profile/:userId/edit' element={<ProfileEdit />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App
