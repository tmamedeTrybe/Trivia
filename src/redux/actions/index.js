export const TIPO_AQUI = 'TIPO_AQUI';

const fetchType = (data) => ({
  type: TIPO_AQUI,
  payload: data,
});

export const fetchTypeThunk = () => async (dispatch) => {
  const apiData = await fetch('URL-AQUI');
  const result = await apiData.json();
  dispatch(fetchType(result));
};
