import profileReducer, { addPostActionCreator } from "./profileReducer";
let state = { 
    myPostItem : [ 
        {id:1, message:'How are u?', likes: 1547,},  
        {id:2, message:'Whats up maan', likes: 147,},  
        {id:3, message:'dude', likes: 4547,},  
        {id:4, message:'bruh', likes: 17,}, 
    ],   
}
it('test of posts', ()=>{  
    let action = addPostActionCreator('hello')
    let newState = profileReducer(state,action)
    expect( newState.myPostItem.length).toBe(5)
})
it('length of deleting', ()=>{  
    let action = addPostActionCreator('hello')
    let newState = profileReducer(state,action)
    expect( newState.myPostItem.length).toBe(5)
})