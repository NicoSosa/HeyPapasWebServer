export interface CategoryByIdReqModel {
    idCategory: number;
}

// export interface CategoryNewReqModel {
//     nameUser: string;
//     nameCategory: string;
//     descriptCategory: string;
// }

// export interface CategoryUpdateReqModel extends CategoryNewReqModel {
//     idCategory: number;
// }

// export interface CategoryDeleteReqModel {
//     nameUser: string;
//     idCategory: number;
// }


export interface CategoryResModel {
    idCategory: number;
    codCategory: string;
    nameCategory: string;
    descriptCategory: string;
    actIndCategory: boolean;
}