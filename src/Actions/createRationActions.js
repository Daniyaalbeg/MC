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

export function creatingNewRation(data) {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    dispatch(creatingRation());

    axios({
      method: 'post',
      url: 'http://localhost:8000/rationEvent/create',
      headers: {'Content-Type': 'application/json', 'x-access-token': token},
      //Add ration info data
      data: {
        name: data.name,
        description: data.description,
        totalNumberOfItems: data.totalNumberOfItems,
        itemsDescription: data.itemsDescription,
        location: data.location,
        date: data.date
      }
    })
    .then((res) => {
      dispatch(creatingRationSuccess())
    })
    .catch((error) => {
      console.log(error.response)
      dispatch(creatingRationFailure(error))
    })
  }
}