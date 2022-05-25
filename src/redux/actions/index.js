// import md5 from 'crypto-js/md5';

export const FETCH_TOKEN = 'FETCH_TOKEN';

const fetchToken = (data) => ({
  type: FETCH_TOKEN,
  payload: data,
});

export const fetchTokenThunk = (state) => async (dispatch) => {
  const apiData = await fetch('https://opentdb.com/api_token.php?command=request');
  const result = await apiData.json();
  localStorage.setItem('token', result.token);
  /* const hash = md5(state.email).toString();
  const gravatarImg = await fetch(`https://www.gravatar.com/avatar/${hash}`); */
  dispatch(fetchToken(state));
};

// O localStorage deve conter as chaves ranking e token com a seguinte estrutura:

// {
//   ranking: [
//     { name: nome_da_pessoa, score: 10, picture: url_da_foto_no_gravatar }
//   ],
//   token: token_recebido_pela_API
// }
