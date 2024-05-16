import { lazy, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import styles from "./Board.module.css"
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { BoardType, Column } from '../../../Redux/stateInterface';
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { MdDelete, MdOutlineClose } from "react-icons/md";

import { FC } from 'react'
import { createPost, deletePost, fetchPost, fetchPosts, updatePost } from '../../../Redux/boardsSlice';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { FaComment } from "react-icons/fa";
import { createDecipheriv } from 'crypto';
import UserInfoModal from '../../../app/widgets/userInfoModal/userInfoModal';


interface CardType {
  id: string;
  content: string;

}

interface ColumnType {
  id: any;
  title: string;
  cards: CardType[];
}





const Board: FC = () => {

  const { id } = useParams<{ id: any }>();


  const dispatch = useAppDispatch()




  const boards = useSelector((state: RootState) => {
    return state.boards.boards
  });

  const loding = useSelector((state: any) => {
    return state.boards.loding
  });


  const user = useSelector((state: any) => {
    return state.user.profile
  });

  let board = boards.find((boardData: any) => boardData.id === id)?.board

  const [columns, setColumns] = useState<any>(board?.columns);

  const [addingTascButton, setAddingTascButton] = useState<string>("");
  const [addingTascInput, setAddingTascInput] = useState<string>('');

  const [isCardChanging, setIsCardChanging] = useState<string[]>(['', ''])
  const [changingCardValue, updateChangingCardValue] = useState<string>('')

  const [addingList, setAddingList] = useState<boolean>(false);
  const [newListTitle, setNewListTitle] = useState<string>('')

  const [commentValue, setCommentValue] = useState<string>('');

  const [commentModalIsOpen, setCommentModalIsOpen] = useState<string[]>(['', ''])
  

  const [comment1, setComment1] = useState<any>('');

  useEffect(() => {
    if (id && !board) {
      dispatch(fetchPost(id))
      
    }
    setColumns(board?.columns)
    console.log(board)
  }, [dispatch, board, id]);




  useEffect(() => {
    if(board?.columns.length === 0){
      setAddingList(true)
  }})


  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;


    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceColumn: ColumnType = columns?.find((column:any) => column.id === source.droppableId) as ColumnType;
    const destinationColumn: ColumnType = columns?.find((column:any) => column.id === destination.droppableId) as ColumnType;

    const newSourceCards = Array.from(sourceColumn?.cards)
    const [removedCard] = newSourceCards.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      newSourceCards.splice(destination.index, 0, removedCard);

      const newColumn = {
        ...sourceColumn,
        cards: newSourceCards,
      };

       setColumns(columns?.map((column:any) => column.id === newColumn.id ? newColumn : column))
    } else {
      const newDestinationCards: CardType[] = Array.from(destinationColumn.cards);
      newDestinationCards.splice(destination.index, 0, removedCard);


      const newSourceColumn: ColumnType = {
        ...sourceColumn,
        cards: newSourceCards
      }

      const newDestinationColumn: ColumnType = {
        ...destinationColumn,
        cards: newDestinationCards
      }


      setColumns(columns.map((column: any) => {
        if (column.id === newSourceColumn.id) return newSourceColumn;
        if (column.id === newDestinationColumn.id) return newDestinationColumn;
        return column
      }))
    }
    let newBoard: any = JSON.parse(JSON.stringify(board))
      if(1){
        newBoard.columns = columns
debugger

        // if (id && newBoard) {
           dispatch(updatePost({ id, newBoard }))
  
  
        //}
      }
    
  }





  const handleAddCard = (e: any) => setAddingTascButton(e.target.name)



  const saveNewTasc = async (e: any) => {
    if (addingTascInput !== "") {
      let newBoard: any = JSON.parse(JSON.stringify(board))
      let lastCardid: string = newBoard.columns?.find((col: Column) => col.id === e.target.name)?.cards.at(-1)?.id
      newBoard.columns.find((col: Column) => col.id === e.target.name)?.cards.push(
        { id: `${addingTascButton}c-${1 + (Number(lastCardid ? lastCardid[lastCardid?.length - 1] : 0))}`, content: addingTascInput, comments: [] }
      )

      if (id && newBoard) {
        await dispatch(updatePost({ id, newBoard }))


      }

      setAddingTascButton('')
      setAddingTascInput('')
    }


  }
  const addCardInput = (e: any) => {
    setAddingTascInput(e.target.value)

  }


  const changeCard = ([colId, cardId]: string[]) => {
    setIsCardChanging([colId, cardId])
  }

  const changingCard = (e: any) => {
    updateChangingCardValue(e.target.value)
  }

  const saveChanges = async () => {
    if (changingCardValue !== "") {
      let newBoard: any = JSON.parse(JSON.stringify(board))

      if (newBoard && newBoard.columns) {
        let column = newBoard.columns.find((col: Column) => col.id === isCardChanging[0])
        if (column && column.cards) {
          let card = column.cards.find((card: any) => card.id === isCardChanging[1])
          if (card) {
            card.content = changingCardValue
          }
        }
      }

      if (id && newBoard) {
        await dispatch(updatePost({ id, newBoard }))
      }

      setIsCardChanging(['', ''])
      updateChangingCardValue('')
    }


  }


  const deleteCard = async () => {
    let newBoard: any = JSON.parse(JSON.stringify(board))
    if (newBoard && newBoard.columns) {
      let column = newBoard.columns.find((col: Column) => col.id === isCardChanging[0])
      if (column && column.cards) {
        let index = column.cards.findIndex((card: any) => card.id === isCardChanging[1])
        column.cards.splice(index, 1)
      }


      if (id && newBoard) {
        await dispatch(updatePost({ id, newBoard }))
      }

      setIsCardChanging(['', ''])
      updateChangingCardValue('')
    }
  }


  const deleteList = async () => {
    let newBoard: any = JSON.parse(JSON.stringify(board))
    if (newBoard && newBoard.columns) {
      let colIndex = newBoard.columns.findIndex((col: Column) => col.id === isCardChanging[0])

      newBoard.columns.splice(colIndex, 1)


      if (id && newBoard) {
        await dispatch(updatePost({ id, newBoard }))
      }

      setIsCardChanging(['', ''])
      updateChangingCardValue('')
    }
  }

  const addListButton = () => {
    setAddingList(true)
  }

  const updateNewListTitle = (e: any) => {
    setNewListTitle(e.target.value)
  }

  const confirmAddingList = async () => {
    if (newListTitle !== '') {
      let newBoard: any = JSON.parse(JSON.stringify(board))
      if (newBoard && newBoard.columns) {
        let colId = newBoard.columns[newBoard.columns.length - 1]?.id || 'col-1'
        let columns = newBoard.columns
        columns.push({
          title: newListTitle,
          cards: [],
          id: colId.slice(0, 4) + (1 + Number(colId.at(-1)))
        })


        if (id && newBoard) {
          await dispatch(updatePost({ id, newBoard }))
        }
        console.log(board)
        setAddingList(false)
      }
    }

  }

  const commentChange = (e: any) => {
    setCommentValue(e.target.value)
  }

  const addComment = async () => {
if(commentValue !== ''){
  let newBoard: any = JSON.parse(JSON.stringify(board))
  newBoard?.columns?.find((col: Column) => col.id === commentModalIsOpen[0])
    ?.cards?.find((card: any) => card.id === commentModalIsOpen[1])
    ?.comments?.push(
      {
        author: user.displayName,
        comment: commentValue,
        authorImg: user.photoURL
      }
    )
    setCommentValue('')

  if (id && newBoard) {
    await dispatch(updatePost({ id, newBoard }))
  }

}
  }


  const openUserInfoModal = (comment:any) => {
    if(comment1==''){
          setComment1(comment)

    }else{
          setComment1('')
    }
  }
  return (

    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {!loding && board ? <>
          <h1 className={styles.boardName}>{board.name}</h1>
          <hr />
          <div className={styles.Board}>
            {
              !loding && board.columns ?
                columns?.map((col:any, index:any) => {
                  return (
                    <Droppable droppableId={col.id} key={col.id}>
                      {
                        (provided) => {
                          return (
                            <div

                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className={styles.column}
                            >
                              <div className={styles.titleContainer}>
                                <h4 className={styles.colName}>{col.title}</h4>
                                <button onClick={deleteList} className={styles.delButton}>
                                  <MdDelete />
                                </button>

                              </div>
                              {
                                col.cards.map((card:any, index:any) => {
                                  return (
                                    <Draggable key={card.id} draggableId={card.id} index={index}>
                                      {
                                        (provided) => {
                                          return (

                                            <div

                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              className={styles.card}

                                            >
                                              {!(isCardChanging[1] === card.id) ? <>
                                                <button className={styles.pen} onClick={() => changeCard([col.id, card.id])}>
                                                  <FaPencil />
                                                </button>

                                                <p>{card.content}</p>

                                                <button className={styles.commentButton} onClick={() => setCommentModalIsOpen([col.id, card.id])}>
                                                  <small>{card.comments.length}</small><FaComment />
                                                </button>
                                              </> : <>
                                                <input onChange={changingCard} type="text" value={changingCardValue || card.content} className={styles.changeCardInput} />
                                                <button onClick={saveChanges} className={styles.save}>Save</button>
                                                <button onClick={deleteCard} className={styles.deleteCard}>Delete</button>
                                              </>

                                              }
                                            </div>
                                          )
                                        }
                                      }
                                    </Draggable>

                                  )
                                })
                              }{col.id === addingTascButton ? <div className={styles.addCardContainer}>
                                <input className={styles.newTaskInput} type="text" placeholder='New task' onChange={addCardInput} />
                                <button className={styles.save} name={col.id} onClick={saveNewTasc}>Add</button>
                              </div>
                                : null}

                              <button onClick={handleAddCard} name={col.id} className={styles.addCard}><FaPlus />Add a Card</button>

                            </div>
                          )
                        }
                      }
                    </Droppable>
                  )
                })



                : null}
            {!loding && board?.columns ?
              <div className={addingList ? styles.addListContainer : styles.not}>
                {!addingList ?
                  <button onClick={addListButton} className={styles.add}><FaPlus /></button> :
                  <><input className={styles.newTaskInput} type="text" placeholder='Title' onChange={updateNewListTitle} />
                    <button className={styles.confirmAddingList} onClick={confirmAddingList}>Add</button></>
                }

              </div>
              : null}
          </div>
        </>
          : <><h1 className={styles.boardName}>loding...</h1> <hr /></>}

      </DragDropContext>
      {commentModalIsOpen[0] ?
        <div className={styles.commentSection}>
          <button onClick={() => { setCommentModalIsOpen(['', '']) }} className={styles.closeModal}>
            <MdOutlineClose />
          </button>
          
          <ul className={styles.commentsList}>
          <h1>
              {board?.columns?.find((col: Column) => col.id === commentModalIsOpen[0])
                ?.cards?.find((card: any) => card.id === commentModalIsOpen[1])?.content}
            </h1>
            {

              board?.columns?.find((col: Column) => col.id === commentModalIsOpen[0])
                ?.cards?.find((card: any) => card.id === commentModalIsOpen[1])
                ?.comments?.reduce((jsx: any, comment) => {
                  const witchUser = comment.author === user?.displayName
                  return (
                    <>
                      {jsx}
                      <li className={!witchUser ? styles.comment : styles.mycomment}>
                        <div className={styles.obautauthor}>
                            <div className={styles.blok}>
                            <img loading={'lazy'}src={comment.authorImg} alt="" onClick={()=>openUserInfoModal(comment)}/>
                            </div>
                          <p>{comment.comment}</p>
                        </div>


                      </li>
                    </>

                  );
                }, <></>)

            }

            {
              board?.columns?.find((col: Column) => col.id === commentModalIsOpen[0])
                ?.cards?.find((card: any) => card.id === commentModalIsOpen[1])
                ?.comments?.length === 0 ? <h1 className={styles.noComment}>No Comments Yet</h1> : null
            }
          </ul>
          <div className={styles.writeCommentContainer}>

            <input id='commentInput' className={styles.commentInput} type="text" onChange={commentChange} placeholder='Write a comment' value={commentValue} />
            <button onClick={addComment} className={styles.submitComment}>Submit</button>

          </div>


        </div>
        : null
      }

        {comment1 ? <UserInfoModal profile={comment1}/> : null}

    </>

    
  );
}

export default Board