import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../src/auth';
import { AppRouter } from '../../../src/router';

describe('Tests on <AppRouter />', () => {
	test('debe de mostrar el login si no está autenticado', () => {

		render( 
			<AuthContext.Provider value={{ logged: false }}>
				<MemoryRouter initialEntries={['/marvel']}>
					<AppRouter />
				</MemoryRouter>
			</AuthContext.Provider>
		);
		
		expect( screen.getByText( 'Welcome to HeroesApp' ) ).toBeTruthy();	

	})

	test('debe de mostrar la página de Marvel si está autenticado', () => {

		render( 
			<AuthContext.Provider value={{ logged: true }}>
				<MemoryRouter initialEntries={['/login']}>
					<AppRouter />
				</MemoryRouter>
			</AuthContext.Provider>
		);

		expect( screen.getByText( 'Marvel Comics' ) ).toBeTruthy();	
		
	})

});
