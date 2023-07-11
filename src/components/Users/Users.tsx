
import { FC, useEffect } from 'react';
import { FilterUserType,  getUsersThunkCreator } from '../../redux/usersReducer';
import Paginator from './Paginator';
import User from './User'; 
import { useSelector,useDispatch } from 'react-redux';
import { UsersSearchForm } from './UsersSearchForm';
import { getCurrentPage, getIsFollow, getPageSize, getTotalUserCount, getUserFilterSelector, getUsers } from '../../redux/users-selecors';
import { AppDispatch, } from '../../redux/redux-store';
import { AnyAction } from 'redux';
type PropsType = { 
    // setCurrentPage: (number:number) => void 
    // users: Array<UserActionType>
    // followThunk: (id:number|null) => void 
    // unfollowThunk: (id:number|null) => void 
    // isFollowing: any 
    // onFilterChanged:(filter:FilterUserType) => void
}
export const Users:FC<PropsType> = ({...props}) =>{   
    useEffect(() =>{ 
        dispatch(getUsersThunkCreator(currentPage, pageSize, filter)) 
    }, [])
    const totalUsers = useSelector(getTotalUserCount) 
    const currentPage = useSelector(getCurrentPage) 
    const pageSize = useSelector(getPageSize)
    const users = useSelector(getUsers) 
    const isFollowing = useSelector(getIsFollow) 
    const filter = useSelector(getUserFilterSelector) 
    const dispatch:AppDispatch= useDispatch() 

    const setCurrentPage = (pageNum:number) =>{     
        dispatch(getUsersThunkCreator(pageNum, pageSize, filter))
        
      } 
    const onFilterChanged = (filter: FilterUserType) => { 
        dispatch(getUsersThunkCreator(1,pageSize,filter))
      } 
    const followThunk = (id:number|null) => { 
        dispatch(followThunk(id)as unknown as AnyAction)
    } 
    const unfollowThunk = (id:number|null) => { 
        dispatch(unfollowThunk(id)as unknown as AnyAction)
    }  
    return( 
        <div>   
            <div> 
                <UsersSearchForm onFilterChanged={onFilterChanged}/>
            </div>
            <div> 
                <Paginator totalUsers={totalUsers} setCurrentPage={setCurrentPage} pageSize={pageSize} currentPage={currentPage}/>
            </div>
            <div> 
                {users.map((i, index) => <User key={index} isFollowing={isFollowing} item={i} followThunk={followThunk} unfollowThunk={unfollowThunk} />)}
            </div>
        </div>
    )
} 
