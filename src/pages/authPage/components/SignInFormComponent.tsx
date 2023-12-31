import { ErrorMessage, Field, Form, Formik } from 'formik'

import { SignInEmailRequest } from '../../../connect/authApi/Requests'


import styles from './SignInFormComponent.module.scss'
import { useAddBookMutation } from '../../../connect/bookApi/bookApi'
import { useSignInMutation } from '../../../connect/authApi/authApi'
import { useNavigate } from 'react-router'

export const SignInFormComponent = () => {
    const [signIn] = useSignInMutation()

    const navigate = useNavigate()

    return (
        <div className={styles.main}>
        <Formik
            initialValues={{
                email: '',
                password: '',
            } as SignInEmailRequest}
            //validate={values => validateBook(values as Book)}
            onSubmit={ async (values, { setSubmitting }) => {
                setSubmitting(false)

                const data = await signIn(values).unwrap()

                localStorage.setItem(`library.token`, data.token)

                navigate("/")
            }}
        >{({ isSubmitting }) => (     
            <Form className={styles.fields}>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
                <button type="submit" disabled={isSubmitting}>Submit</button>
            </Form>
        )}
        </Formik>
    </div> 
    )
}