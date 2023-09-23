import { useNavigate } from "react-router-dom";
import styles from './AuthButtonComponent.module.scss'

export const AuthButtonComponent = () => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate("/auth")}>
            <div className={styles.AuthButton}>LOGIN</div>
        </div>
    )
}