"use client";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBook() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const [description, setDescription] = useState("");

    const [modal, setModal] = useState(false);
    const [isMutating, setMutating] = useState(false);

    const router = useRouter();

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        setMutating(true)
        await fetch("http://localhost:5000/books", {
            method: "POST",
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

        setTitle("");
        setAuthor("");
        setYear("");
        setDescription("");
        router.refresh()
        setModal(false);
    }

    function handleChange() {
        setModal(!modal);
    }

    return (
        <div>
            <button className="btn" onClick={handleChange}>
                Add New
            </button>
            <input
                type="checkbox"
                checked={modal}
                onChange={handleChange}
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Book</h3>
                    <form onSubmit={handleSubmit}>
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
                                onChange={(e) => setYear(e.target.value)}
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
                                    Save
                                </button>
                            ) : (
                                <button type="button" className="btn loading">
                                    Saving..
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
