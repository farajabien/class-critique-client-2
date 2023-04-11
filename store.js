import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import uniReducer from './reducers/uniReducer'
import courseReducer from './reducers/courseReducer'
import lecturerReducer from './reducers/lecturerReducer'
import reviewReducer from './reducers/reviewReducer'

const rootReducer = combineReducers({
	uniReducer,
	//authReducer,
	lecturerReducer,
	courseReducer,
	reviewReducer,
})

export const store = createStore(
	rootReducer,
	{
		uniReducer: uniReducer.initialState,
		courseReducer: courseReducer.initialState,
		lecturerReducer: lecturerReducer.initialState,
		reviewReducer: reviewReducer.initialState,
	},
	applyMiddleware(thunkMiddleware)
)
