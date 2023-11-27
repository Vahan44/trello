import { FC, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MainPage.module.css"
import { FaTrello } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { RootState } from "../../../UserData/store";
import { useSelector, useDispatch } from 'react-redux'; 
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import Workspaces from "../../Workspaces/ui/Workspaces";
const MainPage: FC = () => {

    //const {displayWorkspace, setDisplayWorkspace} = useState<string>('all')
    const user = useSelector((state: RootState) => {
        return state.user.user
      })

      const workspaces = useSelector((state: RootState) => {
        return state.workspaces.workspaces
      })


    return (
    <div className={user ?  styles.mainPage : styles.logIn}>
            {user ? 
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
                    <FaPlus className={styles.plus}/>
                </li>
                {Object.entries(workspaces).reduce((tsx, [workspacename, { name, img }]) => {
    return (
      <div className={styles.workspaces}>
        {tsx}
        <div className={styles.workspaceHeader}>
          <img src={img} alt="" />
          <p>{name}'s Workspaces</p>
          <RiArrowDropDownLine className={styles.drop} />
        </div>
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
      </div>
    )
  }, <></>)}
            </ul>

            
        </div> : null}
        
        <div className="mainPageBody">
           <Workspaces/>
        </div>
        </div>
    )
} 


export default MainPage;