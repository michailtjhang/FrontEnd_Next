"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Book = {
    id : number
    title : string
    author : string
    year : number
    description : string
}

export default function DeleteBook(books: Book) {
    const [modal, setModal] = useState(false);
    const [isMutating, setMutating] = useState(false);

    const router = useRouter();

    async function handleDelete(booksId: number) {
        setMutating(true)
        await fetch(`http://localhost:5000/books/${booksId}`, {
            method: "DELETE",
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
            <button className="btn btn-error btn-sm" onClick={handleChange}>
                Delete
            </button>
            <input
                type="checkbox"
                checked={modal}
                onChange={handleChange}
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are sure to delete this data {books.title}?</h3>
                        <div className="modal-action">
                            <button type="button" onClick={handleChange} className="btn">
                                Close
                            </button>
                            {!isMutating ? (
                                <button type="button" onClick={(e) => handleDelete(books.id)} className="btn btn-primary">
                                    Delete
                                </button>
                            ) : (
                                <button type="button" className="btn loading">
                                    Deleting..
                                </button>
                            )}
                        </div>
                </div>
            </div>
        </div>
    );
}
