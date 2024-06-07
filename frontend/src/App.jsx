import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import ListBlogs from './pages/ListBlogs/ListBlogs.jsx';
import CreateBlogs from './pages/CreateBlogs/CreateBlogs.jsx';
import MyBlogs from './pages/MyBlogs/MyBlogs.jsx';
import ShowBlog from './pages/ShowBlog/ShowBlog.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/blogs/listBlogs" element={<ListBlogs/>}></Route>
        <Route path="/blogs/myBlogs" element={<MyBlogs />}></Route>
        <Route path="/blogs/showBlog" element={<ShowBlog />}></Route>
        <Route path="/blogs/createBlogs" element={<CreateBlogs/>}></Route>
      </Routes>
    </Router>
  );
};

export default App
