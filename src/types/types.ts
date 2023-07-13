import { Message, MultipleFieldErrors, Ref, } from "react-hook-form"  
export type FieldError = {
    type: string
    ref?: Ref
    types?: MultipleFieldErrors
    message?: Message
}  
export type Nullable<T> = null | T