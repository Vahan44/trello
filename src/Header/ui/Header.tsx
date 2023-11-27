import React, { FC, useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import { FaTrello } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { HeaderProps } from "./Header.interface";
import { RootState } from "../../UserData/store";
import { useSelector, useDispatch } from 'react-redux';

const Header: FC<HeaderProps> = ({ handleSingOut }) => {

  const user = useSelector((state: RootState) => {
    return state.user.user
  })


  const [isUserMenuOpen, setUserMenuOpen] = useState<boolean>(false)

  const toggleUserMenu = (): void => {
    setUserMenuOpen(!isUserMenuOpen);
  }

  // useEffect(() => console.log(user))
  const app: HTMLElement | null = document.getElementById('app')
  app.addEventListener('click', () => {
    setTimeout(() => {
      if(isUserMenuOpen){
        toggleUserMenu();
      }
    }, 1000)
       
  });
  
  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <ul className={styles.mainMenu}>
          <li>
            <Link className = {styles.link} to='/'>
              <FaTrello />
              <h1>Trello</h1>
            </Link>
          </li>
          {user ? <li>
            <Link className = {styles.link}to='/Workspaces'>
              <h3 >Workspace</h3>
              <RiArrowDropDownLine />
            </Link>
          </li> : null}
          <li>
            {user ? <Link className={styles.create} to='/creatNewBoard'>
              Create
            </Link> : null}
          </li>
          <li>
          </li>
        </ul>


        <div className={styles.userContainer}>
          <Link to='https://www.atlassian.com/legal/privacy-policy#what-this-policy-covers' className={styles.questiones}>
            <AiOutlineQuestionCircle />
          </Link>
          <input className={styles.search} type="text" placeholder="search" />

          {user ? (
            <>
              <img onClick={toggleUserMenu}
                src={user.photoURL ? user.photoURL : 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'}
                alt="user name"
                className={styles.userImage}
                
              />

              {
                isUserMenuOpen ? (
                  <div className={styles.userMenu}>
                    <ul>
                      <li>
                        <div>Trello</div>
                      </li>
                      <li>
                        <div>Workspace</div>
                      </li>
                      <li>
                        <button className={styles.create} onClick={handleSingOut}>Sign Out</button>
                      </li>
                    </ul>

                  </div>
                ) : null
              }
            </>
          ) : (
            <div className={styles.registers}>
              <Link className={styles.loginButton} to='/logInPage'>Log in</Link>
              <Link className={styles.loginButton} to='/SignUpPage'>Sign Up</Link>

            </div>
          )}

        </div>
      </nav>
    </header>
  )
}

export default Header