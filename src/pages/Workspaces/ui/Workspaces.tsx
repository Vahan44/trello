import React, { FC, useEffect } from 'react';
import { useSelector } from "react-redux"
import { RootState } from "../../../UserData/store"
import { FaPlus } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri"
import { Link } from 'react-router-dom';
import styles from "./Workspaces.module.css"


const Workspaces: FC = () => {

  const workspaces = useSelector((state: RootState) => {
    return state.workspaces.workspaces
  })

  useEffect(() => {
    console.log(workspaces.workspace1)
  })

  const page = Object.entries(workspaces).reduce((tsx, [workspacename, { name, img, boards }]) => {
    return (
      <div className={styles.workspaces}>
        {tsx}
        <div className={styles.workspaceHeader}>
          <img src={img} alt="" />
          <p>{name}'s Workspaces</p>
          <RiArrowDropDownLine className={styles.drop} />
        </div>
        <hr />
        <ul className={styles.boards}>

        
          {Object.entries(boards).reduce((tsx, [boardName]) => {
            return (
              <>
                {tsx}
                <li className={styles.Bli} >
                  <Link className={styles.board} to = {"/" + boardName.replace(/\s/g, '') + "Board"}>
                  <h4>{boardName}</h4> 
                  </Link>
                 
                </li>
                
              </>
            )
          }, <></>)}
          <li className={styles.Bcr}>
            <Link className={styles.createNew} to = {"/creatNewBoard"}>
            <h5>Create new board <FaPlus className={styles.plus}/></h5>
            </Link>
            
          </li>
        </ul>

      </div>
    )
  }, <></>)
  return (
    <ul className={styles.work}>
      {page}
    </ul>
  )
}

export default Workspaces