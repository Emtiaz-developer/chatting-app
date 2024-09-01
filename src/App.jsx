import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Registration from "./pages/Registration"
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import LoogedUserRoute from "./Components/PrivateRoute/LoogedUserRoute";
import NoteLoogedUsersRoute from "./Components/PrivateRoute/NotLoogedUserRoute";
import RootLayout from "./Components/RootLayout/Index";
import MessagePage from "./pages/MessagePage";
import "cropperjs/dist/cropper.css";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<LoogedUserRoute/>}>
        <Route element={<RootLayout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/message" element={<MessagePage/>}/>
        </Route>
        </Route>
       <Route element={<NoteLoogedUsersRoute/>}>
       <Route path="/registration" element={<Registration/>}/>
       <Route path="/login" element={<LoginPage/>}/>
       </Route>
       
      </Route>
    )
  )


  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
