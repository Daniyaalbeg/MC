import axios from 'axios';

export const CREATE_RATION = "CREATE_RATION";
export const CREATE_RATION_SUCCESS = "CREATE_RATION_SUCCESS";
export const CREATE_RATION_FAILURE = "CREATE_RATION_FAILURE";

export const creatingRation = () => ({
  type: CREATE_RATION
});

export const creatingRationSuccess = () => ({
  type: CREATE_RATION_SUCCESS
});

export const creatingRationFailure = (error) => ({
  type: CREATE_RATION_FAILURE,
  payload: error
});

export function createRation(data) {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    dispatch(creatingRation());

    axios({
      method: 'post',
      url: 'http://localhost:8000/auth/createUser',
      headers: {'Content-Type': 'application/json', 'x-access-token': token},
      //Add ration info data
      // data: {
        
      // }
    })
    .then((res) => {
      dispatch(creatingRationSuccess())
    })
    .catch((error) => {
      dispatch(creatingRationFailure(error))
    })
  }
}