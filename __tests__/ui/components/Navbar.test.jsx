import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../src/auth';
import { Navbar } from '../../../src/ui';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUseNavigate,
}));

describe('Tests on <Navbar />', () => {

	const contextValue = {
		logged: true,
		user: {
			name: 'Luffy',
		},
		logout: jest.fn(),
	}

	beforeEach( () => jest.clearAllMocks() );

	test('debe de cargar el nombre que recibe', () => {

		render( 
			<AuthContext.Provider value={ contextValue }>
				<MemoryRouter>
					<Navbar /> 
				</MemoryRouter>
			</AuthContext.Provider>
		);

		expect( screen.getByText('Luffy') ).toBeTruthy();

	})

	test('debe de llamar el logout y el navigate cuando se hace click en el botón', () => {

		render( 
			<AuthContext.Provider value={ contextValue }>
				<MemoryRouter>
					<Navbar /> 
				</MemoryRouter>
			</AuthContext.Provider>
		);
		
		const btnLogout = screen.getByRole( 'button' );
		fireEvent.click(btnLogout);

		expect( contextValue.logout ).toHaveBeenCalled();
		expect( mockedUseNavigate ).toHaveBeenLastCalledWith('/login', { 'replace': true });

	})

});
