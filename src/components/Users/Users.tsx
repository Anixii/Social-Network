
import React, { FC } from 'react';
import { UserActionType } from '../../redux/usersReducer';
import Paginator from './Paginator';
import User from './User';
type PropsType = { 
    totalUsers: number 
    pageSize:number 
    setCurrentPage: (number:number) => void 
    currentPage: number
    users: Array<UserActionType>
    followThunk: (id:number) => void 
    unfollowThunk: (id:number) => void 
    isFollowing: any
}
const Users:FC<PropsType> = ({totalUsers,pageSize, setCurrentPage,currentPage, users,...props}) =>{   
    return( 
        <div>  
            <div> 
                <Paginator totalUsers={totalUsers} setCurrentPage={setCurrentPage} pageSize={pageSize} currentPage={currentPage}/>
            </div>
            <div> 
                {users.map((i, index) => <User key={index} isFollowing={props.isFollowing} item={i} followThunk={props.followThunk} unfollowThunk={props.unfollowThunk} />)}
            </div>
        </div>
    )
} 
export default Users