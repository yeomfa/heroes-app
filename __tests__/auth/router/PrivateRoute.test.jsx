import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../../src/auth';
import { PrivateRoute } from '../../../src/router';

describe('Tests on <PrivateRoute />', () => {

	test('debe de mostrar el children si está autenticado', () => {

		Storage.prototype.setItem = jest.fn();

		const contextValue = {
			logged: true,
			user: {
				name: 'Luffy',
			}
		}

		render( 
			<AuthContext.Provider value={ contextValue }>
				<MemoryRouter initialEntries={['/marvel']}>
					<Routes>

						<Route path='marvel' element={
							<PrivateRoute>
								<div>Hola, soy una ruta privada</div>
							</PrivateRoute>
						} />
						
					</Routes>
				</MemoryRouter>
			</AuthContext.Provider> 
		);

		expect( screen.getByText('Hola, soy una ruta privada') ).toBeTruthy();
		expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastPath', '/marvel');
		
	})

});
