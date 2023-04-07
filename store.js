import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import uniReducer from './reducers/uniReducer'

const rootReducer = combineReducers({
	uniReducer,
	// auth: authReducer,
	// lecturer: lecturersReducer,
	// course: coursesReducer,
	// rating: ratingReducer,
})

export const store = createStore(
	rootReducer,
	uniReducer.initialState,
	applyMiddleware(thunkMiddleware)
)
