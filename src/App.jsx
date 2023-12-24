import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
``;
import RootLayout from "./layout/RootLayout";
import { ThemeProvider } from "./contexts/ThemeContext";
import AuthProvider from "./contexts/AuthContext";
import ProtectedRoute from "./view/protect/ProtectedRoute";
import ProfileNavbar from "./view/userprofile/ProfileNavbar";
import ProfilePage from "./view/userprofile/ProfilePage";
import PostDetails from "./view/posts/PostDetails/PostDetails";
import CreatePostsPage from "./view/posts/CreatePosts/CreatePostsPage";
import RegisterPage from "./auth/Register/RegisterPage";
import LoginPage from "./auth/LoginPage";
import PostLists from "./view/posts/HomePage/PostLists";
import UserPostLists from "./view/userprofile/UserPostLists";
import ApiDataProvider from "./contexts/ApiDataContext";
import { Logout } from "./view/userprofile/Logout";
import { PageNotFound } from "./PageNotFound";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<PostLists />} />
        <Route path="/post_details/:id" element={<PostDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route
          path="/create_posts"
          element={
            <ProtectedRoute>
              <CreatePostsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit_posts/:id"
          element={
            <ProtectedRoute>
              <CreatePostsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user_profile"
          element={
            <ProtectedRoute>
              <ProfileNavbar />
            </ProtectedRoute>
          }
        >
          <Route index element={<ProfilePage />} exact />
          <Route path="user_posts" element={<UserPostLists />} exact />
          <Route path="logout" element={<Logout />} exact />
        </Route>
      </Route>
    )
  );

  return (
    <ThemeProvider>
      <AuthProvider>
        <ApiDataProvider>
          <RouterProvider router={router} />
        </ApiDataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
