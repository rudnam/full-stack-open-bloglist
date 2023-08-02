import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useMatch } from "react-router-dom";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import Error from "./components/Error";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import UserList from "./components/UserList";
import User from "./components/User";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userReducer";
import { setCurrentUser } from "./reducers/currentUserReducer";
import Menu from "./components/Menu";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const [foundUser, setFoundUser] = useState(null);
  const [foundBlog, setFoundBlog] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setCurrentUser(user));
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);

  const users = useSelector((state) => state.users);
  const userMatch = useMatch("/users/:id");
  useEffect(() => {
    if (userMatch && users.length > 0) {
      const user = users.find((user) => user.id === userMatch.params.id);
      setFoundUser(user);
    }
  }, [userMatch, users]);

  const blogs = useSelector((state) => state.blogs);
  const blogMatch = useMatch("/blogs/:id");
  useEffect(() => {
    if (blogMatch && blogs.length > 0) {
      const blog = blogs.find((blog) => blog.id === blogMatch.params.id);
      setFoundBlog(blog);
    }
  }, [blogMatch, blogs]);

  return (
    <div className="flex flex-col bg-gray-900 text-gray-300 h-screen overflow-auto">
      {currentUser === null ? (
        <LoginForm />
      ) : (
        <>
          <Menu user={currentUser} />
          <main className="flex flex-col grow gap-3 py-8 px-16 w-full max-w-5xl h-auto mx-auto border-x border-x-gray-700">
            <Notification />
            <Error />
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:id" element={<User user={foundUser} />} />
              <Route path="/blogs/:id" element={<Blog blog={foundBlog} />} />
            </Routes>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
