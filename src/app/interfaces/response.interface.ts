import { User } from "../models/user.model";

export interface ResponseInterface {
    docs: User[],
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