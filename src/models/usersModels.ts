export interface UserResModel {
    idUser: number;
    codUser: string;
    nameUser: string;
    passUser: string;
    idUserRole: number;
    codUserRole: string;
    descriptUserRole: string;
    actIndUser: boolean;
    avatarUrlUser: string;
}

export interface UserByIdReqModel {
    idUser: number;
}