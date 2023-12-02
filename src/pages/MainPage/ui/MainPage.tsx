import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./MainPage.module.css"
import { FaTrello } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { RootState } from "../../../Redux/store";
import { useSelector } from 'react-redux';
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import Workspaces from "../../Workspaces/ui/Workspaces";


const MainPage: FC = () => {


  const [workspaceMenue, setworkspaceMenue] = useState<boolean>(false)
  //const {displayWorkspace, setDisplayWorkspace} = useState<string>('all')



  const user = useSelector((state: RootState) => {
    return state.user
  })

  const boards = useSelector((state: RootState) => {
    return state.boards.boards
  })
  // const workspaces = useSelector((state: RootState) => {
  //   return state.workspaces.workspaces
  // })

  function openWorkspaceMenue() {
    setworkspaceMenue(!workspaceMenue)
  }


  return (
    <div className={styles.mainPage}>
      {user.profile ?
        <div className={styles.leftSideBar}>
          <ul>
            <li>
              <Link to="/">
                <FaTrello />     Boards
              </Link>
            </li>
            <hr />
            <li className={styles.addWorkspaces}>
              <small>Workspaces</small>
              <FaPlus className={styles.plus} />
            </li>

            <div className={styles.workspaces}>
              <div onClick={openWorkspaceMenue} className={styles.workspaceHeader}>
                <img src={user.profile?.photoURL ? user.profile?.photoURL : 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'} alt="" />
                <p>{user.profile?.displayName}'s Workspaces</p>
                <RiArrowDropDownLine className={workspaceMenue ? styles.up : styles.drop} />
              </div>
              {
                workspaceMenue ? (
                  <ul className={styles.WorkspaceTools}>
                    <li>
                      <Link to="/">
                        <FaTrello />     Boards
                      </Link>
                    </li>

                    <li>
                      <Link to="/">
                        <FaRegHeart />     Hightlights
                      </Link>
                    </li>
                  </ul>
                ) : null
              }
            </div>

          </ul>


        </div> : null}

      <div className="mainPageBody">
        <Workspaces />
      </div>
    </div>
  )
}


export default MainPage;