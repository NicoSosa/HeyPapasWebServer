export interface PackageByIdReqModel {
    idPackage: number;
}

export interface PackagesResModel {
    idPackage: number;
    codPackage: string;
    namePackage: string;
    descriptPackage: string;
    urlImg: string;
    costPackage: number;
    state: boolean;
    actIndPackage: boolean;
}