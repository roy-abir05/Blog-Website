import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import ListBlogs from './pages/ListBlogs/ListBlogs.jsx';
import CreateBlogs from './pages/CreateBlogs/CreateBlogs.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/blogs/listBlogs" element={<ListBlogs/>}></Route>
        <Route path="/blogs/createBlogs" element={<CreateBlogs/>}></Route>
      </Routes>
    </Router>
  );
};

export default App
