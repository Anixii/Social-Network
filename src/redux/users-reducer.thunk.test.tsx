import { followThunk } from "./usersReducer"
import { userAPI } from "../api/users-api" 
import { ResponseType, ResultCodesEnum } from "../api/api"
jest.mock('../api/users-api') 
const mockUserApi = userAPI  
const result:ResponseType = { 
    resultCode: ResultCodesEnum.Success, 
    messages: [], 
    data: []
} 
//@ts-ignore
mockUserApi.onFollow.mockReturnValue(Promise.resolve(result))
test('user/thunk/follow/test',async () =>  { 
    const thunk = followThunk(1)   
    const mockDispatch = jest.fn()  
    //@ts-ignore
    await thunk(mockDispatch)
    expect(mockDispatch).toBeCalledTimes(3)
})