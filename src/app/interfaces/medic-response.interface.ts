import { HospitalInterface } from "./hospital-response.interface";

export interface MedicResponseInterface{
    docs: Medic[],
    totalPages: number,
    page: number,
    hasNextPage: boolean,
    hasPrevPage: boolean,
    nextPage: number,
    prevPage: number,
    limit: number,
    pagingCounter: number,
    totalDocs: number,
}

export interface Medic{
    _id: string,
    name: string,
    status: string,
    creation_user: _UserCreation,
    hospital: HospitalInterface,
    image?: string
}

interface _UserCreation{
    image: string;
    name: string;
    _id: string
}