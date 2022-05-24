import { FETCH_TOKEN } from '../actions';

const INITIAL_STATE = {
  player: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_TOKEN:
    return {
      ...state,
      token: action.payload.token,
    };
  default:
    return state;
  }
};

export default player;
