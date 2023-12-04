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
import { server } from "typescript";
const Header: FC = () => {

  const user = useSelector((state: RootState) => {
    return state.user
  })


  const boards = useSelector((state: RootState) => {
    return state.boards.boards
  })

  const [isUserMenuOpen, setUserMenuOpen] = useState<boolean>(false)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [search, searchChange] = useState<string>('')
  const navigate = useNavigate()

  const dispach = useAppDispatch()



  const toggleUserMenu = (): void => {
    setUserMenuOpen(!isUserMenuOpen);
  }

  const toggleCloaseUserMenu = (event: any) => {
    if (event.target.className !== styles.userImage && event.target.className !== styles.search) {
      setUserMenuOpen(false);
      setIsSearching(false)
    }
  }



  const toggleCloaseSearchBar = (event: any) => {
    if (event.target.className !== styles.search) {
      setIsSearching(false)
    }
  }



  const onSearch = (event: any) => {
    searchChange(event.target.value)
  }

  document.addEventListener('click', toggleCloaseSearchBar);
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
          {user?.profile ? (
            <>
              <input onChange={onSearch} onClick = {()=>setIsSearching(true)} className={styles.search} type="text" placeholder="search" />
              {isSearching ? <div className={styles.results}>
                <ul>
                  {boards.reduce((jsx: any, {id, board}) => {
                    return (
                      <>
                       
                      {jsx}
                      {board.name.includes(search) ? 
                      <li key = {board.id} className = {styles.searchItem}>
                        <Link onClick={()=>{setIsSearching(false)}} to={{pathname:`/board/${id}`}}>
                             {board.name}
                          </Link>
                          <hr />
                      </li>: null}</>
                    ) 
                  }, <></>)}
                </ul>
              </div>: null}


              <img loading = "lazy" onClick={toggleUserMenu}
                src={user.profile.photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW6M4NWghKPuAh1lEjThjCMcdSp9cn029guiwej3QjFg&s'}
                alt=""
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
