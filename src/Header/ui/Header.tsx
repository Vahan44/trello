import React, { FC, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { FaTrello } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { RootState } from "../../Redux/store";
import { useSelector } from 'react-redux';
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { handleSingOut } from "../../Redux/userSlice";
const Header: FC = () => {

  const user = useSelector((state: RootState) => {
    return state.user
  })


  const [isUserMenuOpen, setUserMenuOpen] = useState<boolean>(false)

  const navigate = useNavigate()

  const dispach = useAppDispatch()



  const toggleUserMenu = (): void => {
    setUserMenuOpen(!isUserMenuOpen);
  }

  const toggleCloaseUserMenu = (event: any) => {
    if (event.target.className !== styles.userImage) {
      setUserMenuOpen(false);
    }
  }

  document.addEventListener('click', toggleCloaseUserMenu);

  const logOut = () => {

    dispach(handleSingOut())
    navigate('/LogInPage')
  }
  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <ul className={styles.mainMenu}>
          <li>
            <Link className={styles.link} to='/'>
              <FaTrello />
              <h1>Trello</h1>
            </Link>
          </li>
          {user.profile ? <li>
            <Link className={styles.link} to='/Workspaces'>
              <h3 >Workspace</h3>
              <RiArrowDropDownLine />
            </Link>
          </li> : null}
          <li>
            {user.profile ? <Link className={styles.button} to='/creatNewBoard'>
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
          {user.profile ? (
            <>
              <input className={styles.search} type="text" placeholder="search" />


              <img loading="lazy" onClick={toggleUserMenu}
                src={user.profile?.photoURL ? user.profile?.photoURL : 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'}
                alt="user name"
                className={styles.userImage}

              />

              {
                isUserMenuOpen ? (
                  <div onClick={toggleUserMenu} className={styles.userMenu}>
                    <ul>
                      <li>
                        <div>Trello</div>
                      </li>
                      <li>
                        <div>Workspace</div>
                      </li>
                      <button className={styles.signOutButton} onClick={logOut}>Sign Out</button>
                    </ul>

                  </div>
                ) : null
              }
            </>
          ) : (
            <div className={styles.registers}>
              <Link className={styles.button} to='/logInPage'>Log in</Link>
              <Link className={styles.button} to='/SignUpPage'>Sign Up</Link>

            </div>
          )}

        </div>
      </nav>
    </header>
  )
}

export default Header
