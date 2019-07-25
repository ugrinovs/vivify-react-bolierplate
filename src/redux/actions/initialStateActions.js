import { INITIAL_STATE } from '../../constants/authConstants';

export const fetchInitialState = () => ({
	type: INITIAL_STATE.REQUEST,
});

export const successInitialState = () => ({
	type: INITIAL_STATE.SUCCESS,
});
