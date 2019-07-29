import reducer from './initialStateReducer';
import { INITIAL_STATE } from '../../constants/authConstants';

const initialStateMock = {
	initialStateLoaded: false,
};

describe('InitialStateReducer', () => {
	it('should load initial state', () => {
		const nextState = reducer(undefined, {});
		expect(nextState).toEqual(initialStateMock);
	});

	it('should update initial state', () => {
		const nextState = reducer(initialStateMock, { type: INITIAL_STATE.SUCCESS });
		expect(nextState).toEqual({ ...initialStateMock, initialStateLoaded: true });
	});
});


