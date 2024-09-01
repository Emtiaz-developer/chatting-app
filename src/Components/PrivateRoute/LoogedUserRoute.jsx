import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";

const LoogedUserRoute = () =>{
const user = useSelector((user) => user.logIn.loginValues)
 return user ? <Outlet/> : <LoginPage/>
}

export default LoogedUserRoute;