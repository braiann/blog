import { db } from "../firebase"
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore/lite"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../context/authContext"
import DeleteDialog from "./DeleteDialog"

function Article() {
    const { user } = useAuth()
    const [post, setPost] = useState()
    const [deleteDialogShowing, setDeleteDialogShowing] = useState(false)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getArticle = async () => {
            const postsRef = collection(db, "posts")
            const q = query(postsRef, where("slug", "==", slug))
            const querySnapshot = await getDocs(q)
            setPost({
                ...querySnapshot.docs[0].data(),
                id: querySnapshot.docs[0].id
            })
        }

        getArticle()
    }, [])

    const handleDelete = async () => {
        await deleteDoc(doc(db, "posts", post.id))
        navigate("/")
    }

    return (
        <article className={`px-12 font-serif ${deleteDialogShowing && "overflow-y-hidden"} md:px-36 lg:px-48 xl:px-64 2xl:px-96 mb-24`}>
            {post ?
                <>
                    {deleteDialogShowing && 
                        <DeleteDialog
                            onCancel={() => setDeleteDialogShowing(false)}
                            onDelete={handleDelete}/>
                    }
                    {user &&
                        <div className="flex justify-end gap-4 font-sans py-5">
                            <Link to={`/edit/${post.id}`}>Edit</Link>
                            <button onClick={() => setDeleteDialogShowing(true)}>
                                Delete
                            </button>
                        </div>
                    }
                    <div>
                        <img src={post.imageURL} className="h-56 w-full object-cover mb-4 rounded-xl" />
                        <h1 className="text-5xl font-bold mb-4">
                            {post && post.title}
                        </h1>
                    </div>
                    <p className="text-slate-500 text-lg">{post.lede}</p>
                    {post.body.split('\\n').map((paragraph, index) =>
                        <p className="mb-5" key={index}>
                            {paragraph}
                        </p>
                    )}
                    <p className="text-right mb-3 text-slate-400 text-xs">Published on {post.createdAt.toDate().toLocaleDateString()}.</p>
                    <p className="text-right text-slate-400 text-xs">{post.updatedAt && `Updated on ${post.updatedAt.toDate().toLocaleDateString()}.`}</p>
                </>
            :
                <>
                    <div className="h-10 mb-10 bg-slate-300 rounded-lg animate-pulse"></div>
                    <div className="h-5 mb-5 bg-slate-300 rounded-lg animate-pulse"></div>
                    <div className="h-5 w-40 mb-5 bg-slate-300 rounded-lg animate-pulse"></div>
                    <div className="h-5 mb-5 bg-slate-300 rounded-lg animate-pulse"></div>
                    <div className="h-5 mb-5 bg-slate-300 rounded-lg animate-pulse"></div>
                    <div className="h-5 w-40 mb-5 bg-slate-300 rounded-lg animate-pulse"></div>
                </>
            }
        </article> 
    )
}

export default Article