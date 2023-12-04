import React, { FC, useEffect, useState } from 'react';
import { useSelector } from "react-redux"
import { RootState } from "../../../Redux/store"
import { FaPlus } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri"
import { Link, Navigate, useParams } from 'react-router-dom';
import styles from "./Workspaces.module.css"
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { createPost, fetchPost, fetchPosts } from '../../../Redux/boardsSlice';


const Workspaces: FC = () => {
  const boards = useSelector((state: RootState) => state.boards.boards)
  const user = useSelector((state: RootState) => state.user.profile) 

  const loding = useSelector((state: any) => {
    return state.boards.loading;
  });

  const [newBoardName, setNewBoardName] = useState<string>('')
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    if (!boards[0]) {
      dispatch(fetchPosts());
      console.log(boards)
    }

  }, [dispatch, boards]);

  const [addingBoard, updatingBoard] = useState<boolean>(false)

  console.log(boards, 1000)
  

 
const creatingBoard = () => {
  updatingBoard(true)
}
  

  const addBoard = () => {
if(newBoardName){
  dispatch(createPost({
    board:{
      name: newBoardName,
      id: boards.length + 1,
      columns: []
    }
  })
  
  ).then(() => {
    updatingBoard(false)
  })
}

  }

  const onNewBoargName = (e: any) => {
    setNewBoardName(e.target.value);
  }
  return (
    <ul className={styles.work}>workspaces
      {loding ? <h1>loding... </h1> : null}
      {!loding && boards.every(board => board) ? 

          <div className={styles.workspaces}>
            <div className={styles.workspaceHeader}>
              <img
                src={user?.photoURL ? user?.photoURL : 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'}
                loading="lazy" 
                alt=''/>
                <p>{user?.displayName}'s Workspaces</p>
              <RiArrowDropDownLine className={styles.drop} />
            </div>
            <hr />
            <ul className={styles.boards}>
    
            
              {boards.reduce((tsx, {id, board}) => {
                return (
                  <>
                    {tsx}
                    <li className={styles.Bli} >
                      
                      <Link className={styles.board} to = {`/board/${id}`}>
                      <h4>{board.name}</h4> 
                      </Link>
                     
                    </li>
                    
                  </>
                )
              }, <></>)}
              <li className={styles.Bcr}>

                {
                  addingBoard ? 
                  <div>
                    <input type="text" className={styles.BoardNameInput} onChange={onNewBoargName} placeholder='Board name'/>
                    <button className = {styles.addBoard}onClick={addBoard}>Add board</button>
                  </div> :
                  <button onClick={creatingBoard}>Create new board <FaPlus className={styles.plus}/></button>

                }
                
              </li>
            </ul>
    
          </div>
: null}
    </ul>
  )
}

export default Workspaces


