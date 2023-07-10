import { ResultCodeForCaptchaEnum, ResultCodesEnum, securityAPI } from "../api/api"
import { authAPI } from "../api/auth-api"
import { InferActionTypes, ThunkActionsType } from "./redux-store"
import { Nullable } from "../types/types"

const SET_USER_DATA = 'AUTH_PAGE_SET_USER_DATA'
const ERROR_MESSAGE = 'AUTH_PAGE_ERROR_MESSAGE'
const GET_CAPTCHA = 'AUTH_PAGE_GET_CAPTCHA'
export type initialStateType = {
    email: Nullable<string>
    userId: Nullable<number>
    login: Nullable<string>
    isAuth: boolean
    error: Nullable<string>
    captchaUrl: Nullable<string>
}
let initialState: initialStateType = {
    email: null,
    userId: null,
    login: null,
    isAuth: false,
    error: '',
    captchaUrl: null
}

const authreducer = (state = initialState, action: AllActionCreatorsType): initialStateType => {

    switch (action.type) {
        case SET_USER_DATA: {
            return { ...state, ...action.data }
        }
        case ERROR_MESSAGE: {
            return {
                ...state,
                error: action.error
            }
        }
        case GET_CAPTCHA: {
            return { ...state, captchaUrl: action.url }
        }
        default:
            return state
    }
}
type AllActionCreatorsType = InferActionTypes<typeof actions>
const actions = {
    errorAC:(error: string) => ({ type: ERROR_MESSAGE, error }) as const ,   
    setUserDataAC:(userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({ type: SET_USER_DATA, data: { userId, email, login, isAuth } } as const) ,
    getCaptchaUrlAC:(url: string) => ({ type: GET_CAPTCHA, url } as const)
}

type ThunkType = ThunkActionsType<AllActionCreatorsType>
export const loginThunkCreator = (): ThunkType => async (dispatch) => {
    let response = await authAPI.me()
    if (response.resultCode === ResultCodesEnum.Success) {
        let {id,login,email } = response.data.data
        dispatch(actions.setUserDataAC(id, email, login, true))
    };
}
export const loginTC = (email: string, password: string, rememberMe: boolean, setError: Function, captcha: string | null = null): ThunkType => async (dispatch) => {
    let response = await authAPI.authLogin(email, password, rememberMe, captcha)
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(loginThunkCreator())
    } else {
        if (response.data.resultCode === ResultCodeForCaptchaEnum.Captcha) {
            dispatch(getCaptchaUrl())
        }
        setError('server', {
            type: 'custom',
            message: response.data.messages
        });
    }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let response = await securityAPI.getCaptcha()
    dispatch(actions.getCaptchaUrlAC(response.data.url))
}
export const logoutTC = (): ThunkType => async (dispatch) => {
    let response = await authAPI.authLogout()
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setUserDataAC(null, null, null, false))
    }
}

export default authreducer