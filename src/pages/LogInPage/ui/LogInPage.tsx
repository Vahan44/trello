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
//asfadgdav
    function strhash( str:string ) {
      if (str.length % 32 > 0) str += Array(33 - str.length % 32).join("z");
      var hash = '', bytes = [], i = 0, j = 0, k = 0, a = 0, dict = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','1','2','3','4','5','6','7','8','9'];
      for (i = 0; i < str.length; i++ ) {
          let ch = str.charCodeAt(i);
          bytes[j++] = (ch < 127) ? ch & 0xFF : 127;
      }
      var chunk_len = Math.ceil(bytes.length / 32);   
      for (i=0; i<bytes.length; i++) {
          j += bytes[i];
          k++;
          if ((k == chunk_len) || (i == bytes.length-1)) {
              a = Math.floor( j / k );
              if (a < 32)
                  hash += '0';
              else if (a > 126)
                  hash += 'z';
              else
                  hash += dict[  Math.floor( (a-32) / 2.76) ];
              j = k = 0;
          }
      }
      return hash;
  }


    const handleMailPasswordLogin = async () => {
      
      let pass = strhash(password)
      await dispatch(signInWithEmailPassword([email, pass]))
        navigate('/')
      
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
                <button className = {styles.button} onClick={handleMailPasswordLogin} >Log in</button>
            
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