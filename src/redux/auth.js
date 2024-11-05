import {createSlice} from '@reduxjs/toolkit'
import {
    deleteLocalStorage,
    getLocalStroge,
    setLocalStorage,
} from '../@core/utils/localStorage.utils'

const initialState = {
    user: getLocalStroge('user') ?? null,
}

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        logout(state) {
            state.user = null
            deleteLocalStorage('user')
        },
        login(state, action) {
            state.user = action.payload
            setLocalStorage('user', state.user)
        },
        setDefaultProfilePic(state, action) {
            state.user.find(user => user.isOnline).defaultProfilePic = action.payload
            setLocalStorage('user', state.user)
        },
    },
})

export const tokenActions = tokenSlice.actions
export default tokenSlice.reducer
