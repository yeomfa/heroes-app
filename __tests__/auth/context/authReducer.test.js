import { authReducer } from '../../../src/auth';
import { types } from '../../../src/auth/types/types';

describe('Tests on authReducer', () => {

	const initialState = {
		logged: false,
	}
	
	const user = {
		id: 'ABC',
		name: 'Luffy',
	}

	test('debe de retornar el estado por defecto', () => {

		const state = authReducer( initialState, {});
		expect( state ).toBe(initialState);
		 
	});

	test('debe de (login) autenticar y establecer user', () => {

		const action = {
			type: types.login,
			payload: user,
		}

		const state = authReducer( initialState, action );
		expect( state.logged ).toBeTruthy();
		expect( state.user ).toBe( user );

	});

	test('debe de (logout) borrar el nombre del usuario y logged en false', () => {

		const action = {
			type: types.logout,
			payload: user,
		}

		const state = authReducer( initialState, action );
		expect( state.logged ).toBeFalsy();
		expect( state.user ).toBeFalsy();

	});

});
