
import Paginator from './Paginator';
import User from './User';

function Users({totalUsers,pageSize, setCurrentPage,currentPage, users,...props}){   
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