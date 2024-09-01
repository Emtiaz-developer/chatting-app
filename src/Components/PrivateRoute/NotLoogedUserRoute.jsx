import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const NoteLoogedUsersRoute = () =>{
    const user = useSelector((user) => user.logIn.loginValues)
    return user ? <Navigate to="/"/> : <Outlet/>
}

export default NoteLoogedUsersRoute