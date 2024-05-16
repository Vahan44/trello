import React, { FC, useEffect, useState } from 'react';
import { useSelector } from "react-redux"
import { RootState } from "../../../Redux/store"
import { FaPlus } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri"
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from "./Workspaces.module.css"
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { createPost, deletePost, fetchPost, fetchPosts } from '../../../Redux/boardsSlice';
import { MdDelete } from 'react-icons/md';


const Workspaces: FC = () => {
  const navigate = useNavigate()
  const boards = useSelector((state: RootState) => state.boards.boards)
  const user = useSelector((state: RootState) => state.user.profile)

  const loding = useSelector((state: any) => {
    return state.boards.loading;
  });

  const error = useSelector((state: any) => {
    return state.boards.error
    
  });
  const [newBoardName, setNewBoardName] = useState<string>('')


  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPosts());
    console.log(boards)

  }, [dispatch]);

  const [addingBoard, updatingBoard] = useState<boolean>(false)

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const param1 = params.get('creatingBoard');

  useEffect(() => {
    if(param1){
      updatingBoard(true)
    }
  }, [])

  const creatingBoard = () => {
    updatingBoard(true)
  }


  const addBoard = (cancle: boolean) => {
    if(cancle){
      if (newBoardName) {
        dispatch(createPost({
          board: {
            name: newBoardName,
            id: boards.length + 1,
            columns: []
          }
        })
  
        ).then(() => {
          updatingBoard(false)
          navigate('/mainPage')
        })
      } 
    }else {
      updatingBoard(false)
      navigate('/mainPage')
    }

  }

  const deleteBoard = (boardId: any) => {
    dispatch(deletePost(boardId))
  }


  const onNewBoargName = (e: any) => {
    setNewBoardName(e.target.value);
  }
  return (
    <ul className={styles.work}>workspaces
      {loding ? <h1>loding... </h1> : null}
      {error ? <h1>error 404 </h1> : null}
      {!loding && !error && boards.every(board => board) ?

        <div className={styles.workspaces}>
          <div className={styles.workspaceHeader}>
            <img
              src={user?.photoURL ? user?.photoURL : 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'}
              alt='' />
            <p>{user?.displayName}'s Workspaces</p>
            <RiArrowDropDownLine className={styles.drop} />
          </div>
          <hr />
          <ul className={styles.boards}>


            {boards.reduce((tsx, { id, board }) => {
              return (
                <>
                  {tsx}
                  <li className={styles.Bli} >
                    <button className={styles.deleteBoard} onClick={() => deleteBoard(id)} name={id}>
                      <MdDelete />
                    </button>
                    <Link className={styles.board} to={`/board/${id}`}>
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
                    <input type="text" className={styles.BoardNameInput} onChange={onNewBoargName} placeholder='Board name' />
                    <button className={styles.addBoard} onClick={() => addBoard(true)}>Add board</button>
                    <button className={styles.addBoard} onClick={() => addBoard(false)}><small>cancle</small></button>
                  </div> :
                  <button onClick={creatingBoard}>Create new board <FaPlus className={styles.plus} /></button>

              }

            </li>
          </ul>

        </div>
        : null}
    </ul>
  )
}

export default Workspaces


