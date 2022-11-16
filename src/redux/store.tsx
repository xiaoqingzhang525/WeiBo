import { configureStore } from '@reduxjs/toolkit'
import {commonReducer} from './commonReducer'

export const store = configureStore({
  reducer: commonReducer
})
