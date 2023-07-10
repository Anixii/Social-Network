import { actions, followThunk } from "./usersReducer"
import { userAPI } from "../api/users-api" 
import { ResponseType, ResultCodesEnum } from "../api/api" 
const mockDispatch = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    getStateMock.mockClear()
    mockDispatch.mockClear()
})

jest.mock('../api/users-api')  

const mockUserApi = userAPI as jest.Mocked<typeof userAPI>
const result:ResponseType = { 
    data: {},
    messages: ['test 1'], 
    resultCode: ResultCodesEnum.Success, 
} 
test('user/thunk/follow/test',async () =>  { 
    mockUserApi.onFollow.mockReturnValue(Promise.resolve(result))
    const thunk = followThunk(3)   

    await thunk(mockDispatch,getStateMock, {})
    expect(mockDispatch).toBeCalledTimes(3)
    expect(mockDispatch).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true,3)) 
    expect(mockDispatch).toHaveBeenNthCalledWith(2, actions.followAC(3)) 
    expect(mockDispatch).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false,null)) 

    mockUserApi.onFollow.mockClear()
})