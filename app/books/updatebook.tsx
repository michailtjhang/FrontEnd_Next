"use client";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Book = {
    id : number
    title : string
    author : string
    year : number
    description : string
}

export default function UpdateBook(books: Book) {
    const [title, setTitle] = useState(books.title);
    const [author, setAuthor] = useState(books.author);
    const [year, setYear] = useState(books.year);
    const [description, setDescription] = useState(books.description);

    const [modal, setModal] = useState(false);
    const [isMutating, setMutating] = useState(false);

    const router = useRouter();

    async function handleUpdate(e: SyntheticEvent) {
        e.preventDefault();
        setMutating(true)
        await fetch(`http://localhost:5000/books/${books.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                { 
                    title: title, 
                    author: author, 
                    year: year, 
                    description: description
                },
            ),
        });

        setMutating(false)

        router.refresh()
        setModal(false);
    }

    function handleChange() {
        setModal(!modal);
    }

    return (
        <div>
            <button className="btn btn-info btn-sm" onClick={handleChange}>
                Edit
            </button>
            <input
                type="checkbox"
                checked={modal}
                onChange={handleChange}
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit {books.title}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control">
                            <label className="label font-bold">Title Book</label>
                            <input
                                type="text"
                                className="input w-full input-bordered"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Book Name"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Author Book</label>
                            <input
                                type="text"
                                className="input w-full input-bordered"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder="Author Name"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Year Book</label>
                            <input
                                type="text"
                                className="input w-full input-bordered"
                                value={year}
                                onChange={(e) => setYear(Number(e.target.value))}
                                placeholder="Year Name"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Description Book</label>
                            <input
                                type="text"
                                className="input w-full input-bordered"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description Name"
                            />
                        </div>
                        <div className="modal-action">
                            <button type="button" onClick={handleChange} className="btn">
                                Close
                            </button>
                            {!isMutating ? (
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                            ) : (
                                <button type="button" className="btn loading">
                                    Updating..
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
