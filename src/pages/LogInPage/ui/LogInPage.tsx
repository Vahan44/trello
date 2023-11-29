import React, {FC, useState, useEffect, ChangeEvent} from "react";
import { FaGithub } from "react-icons/fa";
import { SiTrello } from "react-icons/si";
import styles from './LogInPage.module.css'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import {GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import {useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
const LogInPage: FC = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    const goToMainPage = () => {
      navigate('/');
    };


    const signinWithGoogle = async () => {
        const GoogleProvider = new GoogleAuthProvider();
    
        try {
            await signInWithPopup(auth, GoogleProvider)
             goToMainPage()
        }
        catch (error) {
            console.log(error)
        }
      }


      const signinWithGithub = async () => {
        const GithubProvider = new GithubAuthProvider();
    
        try {
            await signInWithPopup(auth, GithubProvider)
              goToMainPage()
        }
        catch (error) {
            console.log(error, 55)
        }
      }


  const signIn = (event: any) => {
    event.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
         goToMainPage()
      })
      .catch((error) => {
        console.log(error);
      });
  };



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
                <form onSubmit={signIn}>
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
                <button onClick={signinWithGoogle}><img src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.518/google-logo.5867462c.svg" alt="" className={styles.Gico}/>Google</button>
                <button onClick={signinWithGithub}><FaGithub className={styles.Gico}/>GitHub</button>
                </div>
            </div>
        </div>
    )
}


export default LogInPage