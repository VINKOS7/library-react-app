import { ErrorMessage, Field, Form, Formik } from 'formik'
import styles from './SignInFormComponent.module.scss'
import { ActivationRequest, SignUpEmailRequest } from '../../../connect/authApi/Requests'
import { useSignUpMutation, useActivationMutation } from '../../../connect/authApi/authApi'
import { useState } from 'react'
import { useNavigate } from 'react-router'

export const SignUpFormComponent = () => {
    const [waitCode, SetWaitCode] = useState(false) 
    
    const [signUp] = useSignUpMutation()
    const [activate] = useActivationMutation()

    const navigate = useNavigate()
    
    return (
        <div className={styles.main}>
        {waitCode &&
            <Formik
                initialValues={{
                    nickname: '',
                    phoneNumber: '',
                    email: '',
                    password: '',
                } as SignUpEmailRequest}
                //validate={values => validateBook(values as Book)}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true)

                    const data = await signUp(values).unwrap()

                    if(data) SetWaitCode(true)
                }}

            >{({ isSubmitting }) => (     
                <Form className={styles.fields}>
                    <Field type="text" name="nickname" placeholder="nickname"/>
                    <ErrorMessage name="nickname" component="div" />
                    <Field type="text" name="phoneNumber" placeholder="phone"/>
                    <ErrorMessage name="phoneNumber" component="div" />
                    <Field type="email" name="email" placeholder="email"/>
                    <ErrorMessage name="email" component="div" />
                    <Field type="password" name="password" placeholder="password"/>
                    <ErrorMessage name="password" component="div" />
                    <button type="submit" disabled={isSubmitting}>Submit</button>
                </Form>
            )}
            </Formik>
        }
        {!waitCode &&
            <Formik
                initialValues={{code: ''} as ActivationRequest}
                onSubmit={async (values, { setSubmitting }) => {

                    setSubmitting(true)

                    const data = await activate(values).unwrap()

                    if(data) {
                        localStorage.setItem('library.token', data.token)

                        navigate('/')
                    } 
                    else alert("code is bad")
                }}
                >{({ isSubmitting }) => (     
                    <Form className={styles.fields}>
                        <Field type="text" name="code" placeholder="code"/>
                        <ErrorMessage name="code" component="div" />
                        <button type="submit" disabled={isSubmitting}>Submit</button>
                    </Form>
                )}
            </Formik>
        }
    </div> 
    )
}
