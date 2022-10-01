import {  useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import logo from "../resources/personal-icon.png"

function Navbar() {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { user, logout, loading } = useAuth()

    const handleClick = () => {
        navigate("/")
    }

    const handleLogOut = async () => {
        logout()
        navigate("/login")
    }

    return (
        <nav className="fixed top-0 left-0 right-0 py-5 px-10 flex justify-between items-center bg-slate-50">
            <div className="leading">
                {user &&
                    <Link to="/new-post" className="text-xl font-bold">+</Link>
                }
            </div>
            <div onClick={handleClick} className="flex gap-1 items-center hover:cursor-pointer">
                <img className="h-10" src={logo} />
                <p className="text-lg font-semibold">{'{ blog }'}</p>
            </div>
            <div className="trailing">
                {user &&
                    <button onClick={handleLogOut}>Log Out</button>
                }
            </div>
        </nav>
    )
}

export default Navbar