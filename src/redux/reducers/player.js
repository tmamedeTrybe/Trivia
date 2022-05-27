import { FETCH_TOKEN, RESET_SCORE, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_TOKEN:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  case RESET_SCORE:
    return {
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
      score: action.payload.score,
      assertions: action.payload.assertions,
    };
  default:
    return state;
  }
};

export default player;
