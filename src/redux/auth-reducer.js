import { authAPI } from "../api/api" 
 
 
let SET_USER_DATA = 'SET_USER_DATA' 
 
 
let initialState = { 

    email: null,    
    userId: null,   
    login: null,
    isAuth: false
}  
 const authreducer= (state = initialState, action) =>{ 

    switch(action.type){ 
        case SET_USER_DATA: 
        console.log(action.data) 
        return {...state, ...action.data, isAuth : true}  
        default: 
        return state
    }
} 
export const setUserDataAC= (userId, email, login) => ({type: SET_USER_DATA, data:{userId,email,login}}) 
 
export const loginThunkCreator = () =>{ 
    return (dispatch) =>{ 
         authAPI.logIn() 
           .then(response =>{   
                if(response.data.resultCode === 0){ 
                    let {id,email,login} = response.data.data
                    dispatch(setUserDataAC(id,email,login))
                    //можно стянуть аву
                }}) ;
    }
}

export default authreducer