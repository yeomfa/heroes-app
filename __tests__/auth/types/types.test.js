import { types } from '../../../src/auth/types/types';

describe('Tests on "types"', () => {

	test('debe de regresar los types definidos', () => {

		expect( types ).toEqual({
			login: '[Auth] login',
			logout: '[Auth] logout',
		})
		
	})

});
