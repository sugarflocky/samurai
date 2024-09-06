import {Request} from "express";

export type RequestWithParams<P> = Request<P,{},{},{}>

export type RequestWithBody<B> = Request<{},{},B,{}>

export type RequestWithQuery<Q> = Request<{},{},{},Q>;

export type RequestWithParamsAndBody<P,B> = Request<P,{},B,{}>

export type RequestWithParamsAndQuery<P,Q> = Request<P,{},{},Q>;


export type Param = {
    id:string
}

export type ErrorMessagesType = {
    field: string
    message: string
}

export type ErrorType = {
    errorMessages: ErrorMessagesType[]
}

export type Pagination<I> = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: I[]
}