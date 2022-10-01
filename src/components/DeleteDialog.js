function DeleteDialog({ onCancel, onDelete }) {
    return (
        <div
            className="font-sans overflow-y-hidden grid place-content-center fixed h-screen w-screen bg-opacity-30 bg-black backdrop-blur-xl -my-28 -mx-12 md:-mx-36 lg:-mx-48 xl:-mx-64 2xl:-mx-96"
            onClick={onCancel}>
            <div
                className="flex flex-col text-center justify-between bg-slate-50 w-80 p-5 rounded-2xl shadow-xl">
                <h3 className="font-bold">Delete this article?</h3>
                <h3 className="text-center m-5">Are you sure? This action cannot be undone.</h3>
                <div>
                    <button onClick={onCancel} className="mr-10 bg-slate-100 px-5 py-2 rounded-md">Cancel</button>
                    <button onClick={onDelete} className="text-red-700 bg-slate-100 px-5 py-2 rounded-md">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteDialog