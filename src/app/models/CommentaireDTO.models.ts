export interface CommentaireDTO {
    id: Number ,
    description:string ;
    date: Date,
    isActive: boolean,
    creePar: string,
    username: string,
    nom: string,
    prenom: string,
    idTache: Number,
    userImage : string,
    tacheTitle: string
}