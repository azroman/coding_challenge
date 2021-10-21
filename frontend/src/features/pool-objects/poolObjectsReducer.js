import {
  SET_POOL_OBJECTS,
} from './poolObjectsAction'

const initialState = {
  data: [],
}

const poolObjectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POOL_OBJECTS:
      return {
        ...state,
        data: action.payload,
      }
    default:
      return state
  }
}

export default poolObjectsReducer
