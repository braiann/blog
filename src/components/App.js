import Navbar from "./Navbar"
import Articles from "./Articles"
import Article from "./Article"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Login"
import { AuthProvider } from "../context/authContext"
import NewPost from "./NewPost"
import PageNotFound from "./PageNotFound"

function App() {
  return (
    <BrowserRouter>
      <div className="font-sans bg-slate-50 text-slate-700 py-28 h-screen">
        <AuthProvider>
          <Navbar />
          <Routes>            
            <Route path="/" element={<Articles />}/>
            <Route path="/article/:slug" element={<Article />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/new-post" element={<NewPost />} />
            <Route path="/edit/:id/" element={<NewPost />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <footer className="h-24"></footer>
        </AuthProvider>
      </div>
    </BrowserRouter>
  )
}

export default App
