import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
    email: string,
    token: string
}

type stateType = userState | null 

const initialState: stateType = {} as stateType

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userState | null>) => {
            return action.payload
        }
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer