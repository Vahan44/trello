import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import styles from "./Board.module.css"
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { BoardType } from '../../../Redux/stateInterface';
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

import { FC } from 'react'
import { fetchPost, fetchPosts, updatePost } from '../../../Redux/boardsSlice';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { FaComment } from "react-icons/fa";



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

  let board = boards.find((boardData: any) => boardData.id === id)?.board

  const [columns, setColumns] = useState(board?.columns);
  const [addingTascButton, setAddingTascButton] = useState<boolean>(false);
  const [addingTascInput, setAddingTascInput] = useState<string>('');
  




  useEffect(() => {
    if (id && !board) {
      dispatch(fetchPost(id))
      
    }
    setColumns(board?.columns)
    console.log(board)
  }, [dispatch, board, id]);




  
 

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;


    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceColumn: ColumnType = columns?.find((column) => column.id === source.droppableId) as ColumnType;
    const destinationColumn: ColumnType = columns?.find((column) => column.id === destination.droppableId) as ColumnType;

    const newSourceCards = Array.from(sourceColumn?.cards)
    const [removedCard] = newSourceCards.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      newSourceCards.splice(destination.index, 0, removedCard);

      const newColumn = {
        ...sourceColumn,
        cards: newSourceCards,
      };

      // setColumns(columns?.map(column => column.id === newColumn.id ? newColumn : column))
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


      // setColumns(columns.map(column => {
      //   if (column.id === newSourceColumn.id) return newSourceColumn;
      //   if (column.id === newDestinationColumn.id) return newDestinationColumn;
      //   return column
      // }))
    }
  }





  const handleAddCard = (e: any) => setAddingTascButton(true)
  


  const saveNewTasc = (e: any) => {
    let cardid = columns?.find((col: any) => col.id === e.target.name)?.cards.length
     let newBoard = JSON.parse(JSON.stringify(board))
     newBoard.columns?.find((col: any) => col.id === e.target.name)?.cards.push(
{id: `c-${2+Number(cardid)}`, content: addingTascInput, comments: []}
    )

    console.log(newBoard, 123456)
    if(id && newBoard){
      dispatch(updatePost({id, newBoard}))
    }
    
    setAddingTascButton(false)
    setAddingTascInput('')

  }
  const addCardInput = (e: any) => {
    setAddingTascInput(e.target.value)
    
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {!loding ? <>
      <h1 className={styles.boardName}>{board?.name}</h1>
      <hr />
      <div className={styles.Board}>
        {
          !loding && board?.columns ? 
          columns?.map((col, index) => {
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
                        <h4 className={styles.colName}>{col.title}</h4>
                        {
                          col.cards.map((card, index) => {
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
                                        <FaPencil className={styles.pen}/>
                                        <p>{card.content}</p>   <FaComment/>
                                      </div>
                                    )
                                  }
                                }
                              </Draggable>

                            )
                          })
                        }{addingTascButton ? <>
                        <input type="text" placeholder='New task' onChange={addCardInput}/>
                        <button name = {col.id}onClick={saveNewTasc}>Save</button>
                        </>
                          : null}
                        
                        <button onClick = {handleAddCard} className={styles.addCard}><FaPlus/>Add a Card</button>
                      </div>
                    )
                  }
                }
              </Droppable>
            )
          })
          
       : null }
       {!loding && board?.columns ? 
      <button className={styles.add}><FaPlus/></button> 
      : null}
      </div>
      </>
    : <><h1 className={styles.boardName}>loding...</h1> <hr/></>}

    </DragDropContext>
    
  );
}

export default Board