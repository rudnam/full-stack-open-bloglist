import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "./reducers/errorReducer";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import currentUserReducer from "./reducers/currentUserReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    errorMessage: errorReducer,
    blogs: blogReducer,
    currentUser: currentUserReducer,
    users: userReducer,
  },
});

export default store;
