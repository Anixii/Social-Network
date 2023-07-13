import usersReducer, { InitialStateType, actions } from "./usersReducer"
let state:InitialStateType 
beforeEach(() => 
    state = {
        users: [ 
            {id:0, name:'ANixii', followed:false, 
            status:'no status', photos:{small:null, large:null}
            }, 
            {id:1, name:'Erbol', followed:false, 
            status:'no status', photos:{small:null, large:null}
            }, 
            {id:2, name:'SBAka', followed:true, 
            status:'no status', photos:{small:null, large:null}
            }, 
            {id:3, name:'Ippleone', followed:true, 
            status:'no status', photos:{small:null, large:null}
            },
        ],
        pageSize: 15,
        totalUsers: 10,
        currentPage: 1,
        isFetching: false,
        followingInProgress: {
            isFollowing: false,
            userId: 0
        } 
    }      
)
test("User-Reducer-Test/FollowSucces", () => { 
    const newState = usersReducer(state,actions.followAC(1)) 
    expect(newState.users[0].followed).toBeFalsy() 
    expect(newState.users[1].followed).toBeTruthy()
}) 
 
test("User-Reducer-Test/UnFollowSucces", () => { 
    const newState = usersReducer(state,actions.unfollowAC(3)) 
    expect(newState.users[2].followed).toBeTruthy() 
    expect(newState.users[3].followed).toBeFalsy()
}) 
