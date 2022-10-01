import { useNavigate } from "react-router-dom"

function ArticleThumbnail({ id, imageUrl, title, lede, slug }) {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/article/${slug}`)
    }

    return (
        <div className="font-serif hover:cursor-pointer" onClick={handleClick}>
            <img className="rounded-3xl mb-3 shadow-xl shadow-slate-400 w-full h-40 object-cover" src={imageUrl}/>
            <h2 className="font-bold text-3xl px-1">{title}</h2>
            <p className="px-1">{lede}</p>
        </div>
    )
}
 
export default ArticleThumbnail