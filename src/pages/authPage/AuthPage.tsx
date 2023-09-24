import { useState } from "react"

import { SignUpFormComponent } from "./components/SignUpFormComponent"
import { SignInFormComponent } from "./components/SignInFormComponent"

import styles from "./AuthPage.module.scss"

export const AuthPage = () => {
    const [signUp, SetSignUp] = useState(false)

    return (
        <div className={styles.main}>
            <div className={styles.formConteiner}>
                <div className={styles.form}>
                    {!signUp && <SignInFormComponent/>}
                </div>
                <div className={styles.form}>
                    {signUp && <SignUpFormComponent/>}
                </div>
                {!signUp && <div onClick={() => SetSignUp(true)} className={styles.signUp}>sign up</div>}
                {signUp && <div onClick={() => SetSignUp(false)} className={styles.signUp}>sign in</div>}
            </div>
           
        </div>
       
    )
}