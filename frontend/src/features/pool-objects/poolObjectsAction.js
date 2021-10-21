import { fetchPoolObjects, fetchCreatePoolObject, fetchFreePoolObject, fetchGetPoolObject } from './poolObjectsAPI'
export const SET_POOL_OBJECTS = 'SET_POOL_OBJECTS'


export const setPoolObjects = (payload) => ({
  type: SET_POOL_OBJECTS,
  payload,
})

export const getAllPoolObjects = () => dispatch => {
  fetchPoolObjects().then(r => dispatch(setPoolObjects(r)))
}

export const addPoolObject = (number) => dispatch => {
  fetchCreatePoolObject(number).then(() => dispatch(getAllPoolObjects())).catch(
    () => alert(`You already have object with number ${number}`)
  )
}

export const freePoolObject = (number) => dispatch => {
  fetchFreePoolObject(number).then(() => dispatch(getAllPoolObjects())).catch(
    () => alert(`Poll Object with number ${number} doesn't exists`)
  )
}

export const getPoolObject = (number) => dispatch => {
  fetchGetPoolObject(number).then(() => dispatch(getAllPoolObjects())).catch(
    () => alert(`Poll Object with number ${number} already is busy or doesn't exists`)
  )
}

