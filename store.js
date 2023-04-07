import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import uniReducer from './reducers/uniReducer'
import courseReducer from './reducers/courseReducer'
import lecturerReducer from './reducers/lecturerReducer'

const rootReducer = combineReducers({
	uniReducer,
	//authReducer,
	lecturerReducer,
	courseReducer,
	//ratingReducer,
})

export const store = createStore(
	rootReducer,
	{
		uniReducer: uniReducer.initialState,
		courseReducer: courseReducer.initialState,
		lecturerReducer: lecturerReducer.initialState,
	},
	applyMiddleware(thunkMiddleware)
)
