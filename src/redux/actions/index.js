export const FETCH_TOKEN = 'FETCH_TOKEN';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const fetchToken = (data) => ({
  type: FETCH_TOKEN,
  payload: data,
});

export const updateScore = (score) => ({
  type: UPDATE_SCORE,
  payload: score,
});
