import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import {FC} from 'react'
import "./Board.css"
interface CardType {
  id: string;
  content: string;
}

interface ColumnType {
  id: string;
  title: string;
  cards: CardType[];
}

const initialColumns: ColumnType[] = [
  {
    id: 'col-1',
    title: 'To Do',
    cards: [{id: 'c-1', content: 'Task 1'}, {id: 'c-2', content: 'Task 2'}, {id: 'c-3', content: 'Task 3'}]
  },
  {
    id: 'col-2',
    title: 'In Progress',
    cards: [{id: 'c-4', content: 'Task 4'}, {id: 'c-5', content: 'Task 5'}, {id: 'c-6', content: 'Task 6'}]
  },
  {
    id: 'col-3',
    title: 'Done',
    cards: [{id: 'c-7', content: 'Task 7'}]
  }
]

interface boardProps{
    board: string
}

 const Board:FC<boardProps> = ({board}) => {
  const [columns, setColumns] = useState<ColumnType[]>(initialColumns);

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;
    
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceColumn: ColumnType = columns.find((column) => column.id === source.droppableId) as ColumnType;
    const destinationColumn: ColumnType = columns.find((column) => column.id === destination.droppableId) as ColumnType;

    const newSourceCards: CardType[] = Array.from(sourceColumn?.cards as CardType[])
    const [removedCard] = newSourceCards.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      newSourceCards.splice(destination.index, 0, removedCard);
      
      const newColumn: ColumnType = {
        ...sourceColumn,
        cards: newSourceCards,
      };

      setColumns(columns.map(column => column.id === newColumn.id ? newColumn : column))
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
      

      setColumns(columns.map(column => {
        if (column.id === newSourceColumn.id) return newSourceColumn;
        if (column.id === newDestinationColumn.id) return newDestinationColumn;
        return column
      }))
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="Board">
        {
          columns.map((col, index) => {
            return (
              <Droppable droppableId={col.id} key={col.id}>
                {
                  (provided) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className='column'
                      >
                        <h2>{col.title}</h2>
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
                                        className='card'
                                      >
                                        {card.content}
                                      </div>
                                    )
                                  }
                                }
                              </Draggable>
                            )
                          })
                        }
                      </div>
                    )
                  }
                }
              </Droppable>
            )
          })
        }
      </div>
    </DragDropContext>
  );
}

export default Board