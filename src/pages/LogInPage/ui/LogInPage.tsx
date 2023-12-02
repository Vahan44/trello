import React, {FC, useState, useEffect, ChangeEvent} from "react";
import { FaGithub } from "react-icons/fa";
import { SiTrello } from "react-icons/si";
import styles from './LogInPage.module.css'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import {GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import {useNavigate } from 'react-router-dom';
import { loginWithGithub, loginWithGoogle, signInWithEmailPassword } from '../../../Redux/userSlice'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
const LogInPage: FC = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const goToMainPage = () => {
      navigate('/');
    };

    const handleGoogleLogin = async () => {
      await dispatch(loginWithGoogle())
      navigate('/');
    }



    const handleGithubLogin = async () => {
      await dispatch(loginWithGithub())
      navigate('/');
    }

    const handleMailPasswordLogin = async () => {
      await dispatch(signInWithEmailPassword([email, password]))
      navigate('/');
    }



      const emailEvent = (e:ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
      }

      const passwordEvent = (e:ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
      }

    return (
            <div className={styles.container}>
            <h1><SiTrello/>  Trello</h1>
            <div className={styles.body}>
                <h4>Log in to continue</h4>
                <form onSubmit={handleMailPasswordLogin}>
                <input 
                className = {styles.email_input}
                type="email" 
                placeholder="Enter your email"
                onChange={emailEvent}/>
                
                <input className = {
                    styles.email_input}
                    type="password" 
                    placeholder="Enter your password"
                    onChange={passwordEvent}/>
                <button className = {styles.button} type = 'submit' >Continue</button>
                </form>
            
                <p>Or continue with:</p>
                <div className={styles.buttons}>
                <button onClick={handleGoogleLogin}><img src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.518/google-logo.5867462c.svg" alt="" className={styles.Gico}/>Google</button>
                <button onClick={handleGithubLogin}><FaGithub className={styles.Gico}/>GitHub</button>
                </div>
            </div>
        </div>
    )
}


export default LogInPage