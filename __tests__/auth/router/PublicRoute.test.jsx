import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../../src/auth';
import { PublicRoute } from '../../../src/router/PublicRoute';

describe('Tests on <PublicRoute />', () => {

	test('debe de mostrar el children si no está autenticado', () => {

		render( 
			<AuthContext.Provider value={{ logged: false }}>
				<PublicRoute>
					<div>Hola, soy una ruta pública</div>
				</PublicRoute>
			</AuthContext.Provider> 
		);

		expect( screen.getByText('Hola, soy una ruta pública') ).toBeTruthy();
		
	})

	test('debe de navegar si el usuario no está autenticado', () => {

		const contextValue = {
			logged: true,
			user: { name: 'Molly' },
		}

		render( 
			<AuthContext.Provider value={ contextValue }>
				<MemoryRouter initialEntries={['/login']}>

					<Routes>

						<Route path="marvel" element={ <h1>Página Marvel</h1> } />
						<Route path="login" element={
							<PublicRoute>
								<div>Hola, soy una ruta pública</div>
							</PublicRoute>
						}/>

					</Routes>

				</MemoryRouter>
			</AuthContext.Provider> 
		);

		expect( screen.getByText('Página Marvel') ).toBeTruthy();

	})


});
