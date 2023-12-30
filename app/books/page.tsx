import AddBook from "./addbook"
import DeleteBook from "./deletebook"
import UpdateBook from "./updatebook"

type Book = {
    id : number
    title : string
    author : string
    year : number
    description : string
}

async function getBooks() {
    const res = await fetch('http://localhost:5000/books', { cache: 'no-store' })
    return res.json()
}

export default async function BookList() {
    const books: Book[] = await getBooks()
    return (
        <div className="py-10 px-10">
            <div className="py-2">
                <AddBook />
            </div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title Books</th>
                        <th>Author</th>
                        <th>Year Book</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((books, index) => (
                        <tr key={books.id}>
                            <td>{index + 1}</td>
                            <td>{books.title}</td>
                            <td>{books.author}</td>
                            <td>{books.year}</td>
                            <td>{books.description}</td>
                            <td className="flex">
                                <UpdateBook {...books} />
                                <DeleteBook {...books} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
