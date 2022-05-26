export const FETCH_TOKEN = 'FETCH_TOKEN';

export const fetchToken = (data) => ({
  type: FETCH_TOKEN,
  payload: data,
});
