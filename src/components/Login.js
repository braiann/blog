import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleChange = ({target: {name, value}}) => {
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(user.email, user.password)
        navigate("/")
    }

    return (
        <main className="grid place-content-center h-full">
            <h1 className="text-3xl font-black">Log In</h1>
            <form
                className="flex flex-col bg-white p-10 mt-3 shadow-xl rounded-2xl w-80"
                onSubmit={handleSubmit}>
                <input onChange={handleChange} name="email" className="border rounded-md p-2 mb-4 focus:outline-none" type="email" placeholder="Email" required/>
                <input onChange={handleChange} name="password" className="border rounded-md p-2 mb-4 focus:outline-none" type="password" placeholder="Password" required/>
                <input className="p-2 rounded-md bg-slate-700 text-slate-100 hover:cursor-pointer" type="submit" value="Continue" />
            </form>
        </main>
    )
}

export default Login