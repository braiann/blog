import { useEffect, useState } from "react"
import { addDoc, collection, doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore/lite"
import generateSlug from "../utils/generateSlug"
import { db } from "../firebase"
import { useNavigate, useParams } from "react-router-dom"

function NewPost() {
    const navigate = useNavigate()
    const { id } = useParams()

    const [article, setArticle] = useState({
        title: "",
        lede: "",
        body: "",
        imageURL: "",
        slug: ""
    })

    useEffect(() => {
        const getArticle = async () => {
            const docRef = doc(db, "posts", id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const docData = docSnap.data()
                setArticle({
                    title: docData.title,
                    lede: docData.lede,
                    body: docData.body.replaceAll("\\n", "\n"),
                    imageURL: docData.imageURL,
                    slug: docData.slug
                })
            }
        }
        if (id) {
            getArticle()
        }
    }, [])

    const handleChange = ({target: {name, value}}) => {
        setArticle({
            ...article,
            [name]: value 
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(id)
        if (id) {
            const docRef = doc(db, "posts", id)
            await updateDoc(docRef, {
                title: article.title,
                lede: article.lede,
                body: article.body.replaceAll(/\r\n|\r|\n/g,"\\n"),
                imageURL: article.imageURL,
                slug: article.slug,
                updatedAt: Timestamp.now()
            })
        } else {
            article.slug = generateSlug(article.title)
            article.body = article.body.replaceAll(/\r\n|\r|\n/g,"\\n")
            await addDoc(collection(db, "posts"), {
                title: article.title,
                lede: article.lede,
                body: article.body,
                imageURL: article.imageURL,
                slug: article.slug,
                createdAt: Timestamp.now()
            })
        }
        navigate("/")
    }

    return (
        <form className="flex flex-col p-5" onSubmit={handleSubmit}>
            <input
                className="self-end px-5 py-2 bg-slate-400 rounded-md"
                type="submit"
                value="Done"/>
            <input
                className="font-serif text-5xl bg-transparent focus:outline-none"
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleChange}
                defaultValue={article && article.title}
                required/>
            <input
                className="font-serif bg-transparent focus:outline-none my-5"
                type="text"
                placeholder="This is the lead. Write a short summary of your article here."
                name="lede"
                onChange={handleChange}
                defaultValue={article && article.lede}
                required/>
            <textarea
                className="font-serif bg-transparent focus:outline-none"
                type="text"
                placeholder="This is the body. Write your article here."
                name="body"
                onChange={handleChange}
                defaultValue={article && article.body}
                rows="15"
                required/>
            <input
                className="bg-slate-200 placeholder-slate-400 rounded-lg px-5 py-2 mt-5 focus:outline-none"
                type="url"
                placeholder="Paste the URL of your article's image here."
                name="imageURL"
                onChange={handleChange}
                defaultValue={article && article.imageURL}
                required/>
        </form>
    )
}

export default NewPost