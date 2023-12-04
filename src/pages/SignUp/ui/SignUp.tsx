import React, {FC, useState, useEffect, ChangeEvent} from "react";
import { FaGithub } from "react-icons/fa";
import { SiTrello } from "react-icons/si";
import styles from '../../LogInPage/ui/LogInPage.module.css'
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import {GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import {useNavigate } from 'react-router-dom';
import { loginWithGithub, loginWithGoogle, signUpWithMailPassword } from "../../../Redux/userSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

const SignUp: FC = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");


    const dispatch = useAppDispatch()


    const handleGoogleLogin = async () => {
      await dispatch(loginWithGoogle())
      navigate('/');
    }



    const handleGithubLogin = async () => {
      await dispatch(loginWithGithub())
      navigate('/');
    }

      const signUp = () => {
        dispatch(signUpWithMailPassword([email, password]))
      };


      const navigate = useNavigate();

      const goToMainPage = () => {
        navigate('/');
      };


      const emailEvent = (e:ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
      }

      const passwordEvent = (e:ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
      }

    return (
        <div className={styles.LogInPage}>
            <div className={styles.container}>
            <h1><SiTrello/>  Trello</h1>
            <div className={styles.body}>
                <h4>Sign up to continuee</h4>
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
                <button onClick={signUp}
                className = {styles.button} 
                >Continue</button>
            
                <p>Or continue with:</p>
                <div className={styles.buttons}>
                <button onClick={handleGoogleLogin}><img src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.518/google-logo.5867462c.svg" alt="" className={styles.Gico}/>Google</button>
                <button onClick={handleGithubLogin}><FaGithub className={styles.Gico}/>GitHub</button>
                </div>
            </div>
        </div>
        </div>
    )
}


export default SignUp