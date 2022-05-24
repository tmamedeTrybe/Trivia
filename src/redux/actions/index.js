export const FETCH_TOKEN = 'FETCH_TOKEN';

const fetchToken = (data) => ({
  type: FETCH_TOKEN,
  payload: data,
});

export const fetchTokenThunk = () => async (dispatch) => {
  const apiData = await fetch('https://opentdb.com/api_token.php?command=request');
  const result = await apiData.json();
  dispatch(fetchToken(result));
};
