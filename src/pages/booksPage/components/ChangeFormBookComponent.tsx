import { ErrorMessage, Field, Form, Formik } from 'formik'

import { Book } from '../../../models/book'
import { useChangeBookMutation } from '../../../connect/bookApi/bookApi'
import { ChangeBookRequest } from '../../../connect/bookApi/Requests'

import styles from './AddFormBookComponent.module.scss'

interface ChangeFormBookComponentProps {
    changedBook(book: Book): void
    book: Book
}

export const ChangeFormBookComponent = (props: ChangeFormBookComponentProps) => {
    const [changeBook] = useChangeBookMutation()

    const validateBook = (book: Book) => {
        const errors: string[] = []

        if(!book.author || !book.genre || !book.id || !book.name || !book.dateOfWritten) errors.push("book have bad property")

        return errors
    }

    return (
        <div className={styles.main}>
            <Formik
                initialValues={{
                    id: props.book.id,
                    name: props.book.name,
                    genre: props.book.genre,
                    author: props.book.author,
                    dateOfWritten: props.book.dateOfWritten
                } as ChangeBookRequest}
                //validate={values => validateBook(values as Book)}
                onSubmit={(values, { setSubmitting }) => {

                    console.log(props.book)
                    changeBook(values)

                    setSubmitting(false)
                }}
            >{({ isSubmitting }) => (     
                <Form className={styles.fields}>
                    <Field type="text" name="name" />
                    <ErrorMessage name="name" component="div" />
                    <Field type="text" name="author" />
                    <ErrorMessage name="author" component="div" />
                    <Field type="text" name="genre" />
                    <ErrorMessage name="genre" component="div" />
                    <Field type="date" name="dateOfWritten" />
                    <ErrorMessage name="dateOfWritten" component="div" />
                    <button type="submit" disabled={isSubmitting}>Submit</button>
                </Form>
            )}
            </Formik>
        </div>
    )
}