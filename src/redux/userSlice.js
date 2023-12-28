import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { loginApi } from '../services/UserService'

const data = JSON.parse(localStorage.getItem('data'))

const initialState = {
  value: data || { email: '', auth: false, token: '' },
  isLoading: false,
}

export const handleLogin = createAsyncThunk(
  'user/fetchUserLoginStatus',
  async (email, password) => {
    try {
      const { token } = await loginApi(email, password)
      if (token) {
        toast.success('Login successful')
        localStorage.setItem(
          'data',
          JSON.stringify({ email, auth: true, token }),
        )
        return { email, auth: true, token }
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.message || error)
      console.error(error)
    }
  },
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('data')
      state.value = { email: '', auth: false, token: '' }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleLogin.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(handleLogin.fulfilled, (state, action) => {
      state.value = action.payload
      state.isLoading = false
    })

    builder.addCase(handleLogin.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
