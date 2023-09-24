import { ErrorMessage, Field, Form, Formik } from 'formik'

import { Book } from '../../../models/book'
import { useAddBookMutation } from '../../../connect/bookApi/bookApi'
import { AddBookRequest } from '../../../connect/bookApi/Requests'

import styles from './AddFormBookComponent.module.scss'

interface AddFormBookComponentProps {
    addingBook(book: Book): void
}

export const AddFormBookComponent = (props: AddFormBookComponentProps) => {
    const [addBook] = useAddBookMutation()

    const validateBook = (book: Book) => {
        const errors: string[] = []

        if(!book.author || !book.genre || !book.id || !book.name || !book.dateOfWritten) errors.push("book have bad property")

        return errors
    }

    return (
        <div className={styles.main}>
            <Formik
                initialValues={{
                    id: '',
                    name: '',
                    genre: '',
                    author: '',
                    dateOfWritten: new Date(Date.now())
                } as AddBookRequest}
                //validate={values => validateBook(values as Book)}
                onSubmit={ async (values, { setSubmitting }) => {
                    setSubmitting(false)

                    const book = values as Book

                    await addBook(values).unwrap()
                        .then(payload => {
                            book.id = payload
                        });


                    props.addingBook(book)
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