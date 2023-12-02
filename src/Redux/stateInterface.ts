
interface Comment {
    author: string;
    comment: string;
    authorImg: string;
  }
  
  interface Card {
    content: string;
    id: string;
    comments: Comment[] ;
  }
  
  interface Column {
    title: string;
    cards: Card[];
    id: string;
  }
  
 export interface BoardType {
    columns: Column[];
    name: string;
    id: any;
  }
  
 export interface Data {
    name: string;
    id: string;
    board: BoardType;
  }



export interface State{
    loading: boolean;
    error: boolean;
    boards: Data[]
}