export interface TacheDTO {
    id: number,
    tacheTitre:string,
    tacheDescription:  string,
    chargeEstime: number,
    chargeReele: number,
    dateDebut: Date ,
    dateFin: Date,
    idUtilisateur: string,
    username: string,
    nom: string,
    prenom: string,
    idPriorite: number,
    prioriteLabel: string,
    idStatus: number,
    statusLabel: string,
    idType: number,
    typeLabel: string,
    idProjet: number,
    titreProjet: string,
    idTacheParent: number,
    retard : string
}