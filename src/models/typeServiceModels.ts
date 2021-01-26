export interface TypeServiceByIdReqModel {
    idTypeService: number;
}

export interface TypeServicesResModel {
    idTypeService: number;
    nameTypeService: string;
    actIndTypeService: boolean;
}

export interface NewTypeServiceReqModel {
    nameTypeService: string;
}

export interface DeleteTypeServiceReqModel {
    idTypeService: number;
}
