
export interface HospitalReponseInterface{
    docs: HospitalInterface[],
    totalPages: number,
    page: number,
    hasNextPage: boolean,
    hasPrevPage: boolean,
    nextPage: number | null,
    prevPage: number | null,
    limit: number,
    pagingCounter: number,
    totalDocs: number,
}

export interface HospitalInterface{
    name: string;
    status: string;
    image: string;
    creation_user: _UserCreation;
}

interface _UserCreation{
    image: string;
    name: string;
    _id: string
}