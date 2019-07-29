import createReducer from '../createReducer';
import { INITIAL_STATE } from '../../constants/authConstants';

const initialState = {
  initialStateLoaded: false,
};

export default createReducer(
  {
    [INITIAL_STATE.SUCCESS]: updateInitialState,
  },
  initialState
);

function updateInitialState(state) {
  return {
    ...state,
    initialStateLoaded: true,
  };
}
