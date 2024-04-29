export interface SousTache {

    id : number ; 
    tacheTitre : string ; 
    tacheDescription : string ;
     chargeEstime : number ;
     chargeReele : number ; 
     dateDebut : Date ;
     dateFin : Date ; 
     isActive : boolean  ;
     idUtilisateur : string ;
     idPriorite : number ; 
     idStatus : number ; 
     idType : number ; 
     idProjet : number  ;
     idTacheParent : Number ;

}