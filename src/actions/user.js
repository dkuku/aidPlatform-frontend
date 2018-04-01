import { LOGIN, SIGNUP, LOGOUT } from 'constants/ActionTypes'
import { createAction } from 'redux-actions'

export const login = createAction(LOGIN)

export const logout = createAction(LOGOUT)

export const signup = createAction(SIGNUP)
