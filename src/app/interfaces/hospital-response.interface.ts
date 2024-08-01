
export interface HospitalReponseInterface{
    docs: HospitalInterface[],
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

export interface HospitalInterface{
    _id: string;
    name: string;
    status: string;
    image?: string;
    creation_user: _UserCreation;
}

interface _UserCreation{
    image: string;
    name: string;
    _id: string
}