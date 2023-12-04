
interface Comment {
    author: string;
    comment: string;
    authorImg: string;
  }
  
  export interface Card {
    content: string;
    id: string;
    comments: Comment[] ;
  }
  
  export interface Column {
    title: string;
    cards: Card[];
    id: string;
  }
  
 export interface BoardType {
    columns: Column[];
    name: string;
    id: string;
  }
  
 export interface Data {
    id: string;
    board: BoardType;
  }



export interface State{
    loading: boolean;
    error: boolean;
    boards: Data[]
}