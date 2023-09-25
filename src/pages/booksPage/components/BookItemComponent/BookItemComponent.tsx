import { useLazyDeleteBookQuery } from "../../../../connect/bookApi/bookApi"
import { getAccessToken } from "../../../../connect/getAccessToken"
import { Book } from "../../../../models/book"
import styles from "./BookItemComponent.module.scss"
import { BookChangeButtonComponent } from "./components/BookChangeButtonComponent"
import { BookDeleteButtonComponent } from "./components/BookDeleteButtonComponent"

interface BookItemComponentProps {
    deleteBook(id: string): void
    changeBook(id: string): void
    book: Book
}

export const BookItemComponent = (props: BookItemComponentProps) => {
    const token = getAccessToken()

    const [deleteBook] = useLazyDeleteBookQuery();

    const removeBook = () => {
        deleteBook(props.book.id)

        props.deleteBook(props.book.id)
    }

    return (
        <div className={styles.item}>
            <div className={styles.bookInfo}>
                <div>Название: {props.book.name}</div>
                <div>Жанр: {props.book.genre}</div>
                <div>Автор: {props.book.author}</div>
                <div>Год: {new Date(props.book.dateOfWritten).getFullYear()}</div>
            </div>
            {token && 
                <div className={styles.buttons}>
                    <div onClick={() => props.changeBook(props.book.id)}>
                        <BookChangeButtonComponent/>
                    </div>
                    <div onClick={removeBook}>
                        <BookDeleteButtonComponent/>
                    </div>
                </div>
            }
        </div>
    )
}