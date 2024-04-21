import { TacheDTO } from "./TacheDTO.models";

 
export interface TacheListForBoard {
    idStatus:number;
    labelStatus:string;
    nombreTache:number;
    listTache: TacheDTO[]; 
}
            
