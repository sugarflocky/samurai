import {Request} from "express";

export type RequestWithParams<P> = Request<P,{},{},{}>

export type RequestWithBody<B> = Request<{},{},B,{}>

export type RequestWithParamsAndBody<P,B> = Request<P,{},B,{}>

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