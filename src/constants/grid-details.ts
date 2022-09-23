import { HEIGHT, SQUARE_SIZE, WIDTH } from "./dimensions";

 /** 3*squareSize = total margin of left + right  */
 export const ROW_COUNT = Math.floor((HEIGHT-3*SQUARE_SIZE)/SQUARE_SIZE);
 export const COLUMN_COUNT = Math.floor((WIDTH-3*SQUARE_SIZE)/SQUARE_SIZE);

 /** coords of start and finish initial nodes */
 export const START_NODE_ROW = Math.floor(ROW_COUNT/2);
 export const START_NODE_COL = Math.floor(COLUMN_COUNT/4);
 export const FINISH_NODE_ROW = Math.floor(ROW_COUNT/2);
 export const FINISH_NODE_COL = Math.floor(3*COLUMN_COUNT/4);