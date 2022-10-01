import { useEffect, useState } from "react"
import { collection, getDocs, orderBy, query } from "firebase/firestore/lite"
import ArticleThumbnail from "./ArticleThumbnail"
import { db } from "../firebase"
import { useAuth } from "../context/authContext"

function Articles() {
    const [articles, setArticles] = useState()
    const {user, loading} = useAuth()

    useEffect(() => {
        const getArticles = async () => {
            const articlesCol = collection(db, "posts")
            const articlesSnap = await getDocs(query(articlesCol, orderBy("createdAt", "desc")))
            setArticles(articlesSnap.docs.map(doc => doc.data()))
        }
        
        getArticles()
    }, [])
    return (
        <div className="px-10 md:px-40 md:mx-auto lg:px-44 grid lg:grid-cols-2 gap-10 xl:grid-cols-3">
            {articles ?
                articles.map(article =>
                    <ArticleThumbnail
                        key={article.id}
                        id={article.id}
                        imageUrl={article.imageURL}
                        title={article.title}
                        lede={article.lede}
                        slug={article.slug}
                    />) :
                <>
                    <div className="h-40 mb-3 mt-10 bg-slate-300 rounded-3xl animate-pulse"></div>
                    <div className="h-10 mb-3 bg-slate-300 rounded-xl animate-pulse"></div>
                    <div className="h-5 mb-1 bg-slate-300 rounded-xl animate-pulse"></div>
                    <div className="h-5 w-20 bg-slate-300 rounded-xl animate-pulse"></div>
                </>
            }
        </div>
    )
}

export default Articles