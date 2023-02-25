
import dialogsReducer from "./dialogsReducer"
import profileReducer from "./profileReducer"


const store = { 
    _state : { 
        dialogPage:{
            dialogItem : [ 
                {id:1,name: 'Yusuf'}, 
                {id:2,name: 'Aza'}, 
                {id:3,name: 'Alexey'}, 
                {id:4,name: 'Beka'},
            ],   
            messageItem :[ 
                {message:'What up'}, 
                {message:'Wow'}
            ] ,  
            newMessageText: '2028'
            
        }, 
        postPage : {
            myPostItem : [ 
                {id:1, message:'How are u?', likes: 1547,},  
                {id:2, message:'Whats up maan', likes: 147,},  
                {id:3, message:'dude', likes: 4547,},  
                {id:4, message:'bruh', likes: 17,}, 
            ], 
            newPostText: 'BSA',  
            
        },
    } ,    
    _renderEntireTree(){ 
        alert('hi') 
    },  

    getState(){ 
        return this._state
    }, 
    subscride (observer) { 
        this._renderEntireTree = observer
    },
    dispatch(action){ 
        this._state.postPage = profileReducer( this._state.postPage, action) 
        this._state.dialogPage = dialogsReducer(this._state.dialogPage, action)
         
        this._renderEntireTree()
    }
}

export default store