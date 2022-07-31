import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../../src/auth';
import { HeroPage } from '../../../src/heroes';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockUseNavigate,
}))

describe('Test on HeroPage', () => {

	const contextValue = {
		logged: true,
		user: {
			name: 'Luffy',
		}
	}

	test('debe de mostrar el hero seleccionado', () => {

		const hero = {
			id: 'dc-arrow',
			name: 'Green Arrow',
		}

		render( 
			<AuthContext.Provider value={ contextValue }>
				<MemoryRouter initialEntries={[`/hero/${ hero.id }`]}>
					<Routes>

						<Route path='hero/:heroId' element={ <HeroPage /> } />

					</Routes>
				</MemoryRouter>
			</AuthContext.Provider>
		);

		expect( screen.getByText( hero.name ) ).toBeTruthy();
		
	})

	test('debe retornar a la página de marvel si el hero no existe', () => {

		const hero = {
			id: 'dc-arro',
			name: 'Green Arrow',
		}

		render( 
			<AuthContext.Provider value={ contextValue }>
				<MemoryRouter initialEntries={[`/hero/${ hero.id }`]}>
					<Routes>

						<Route path='hero/:heroId' element={ <HeroPage /> } />
						<Route path='marvel' element={ <h1>Página de marvel</h1> } />

					</Routes>
				</MemoryRouter>
			</AuthContext.Provider>
		);

		expect( screen.getByText('Página de marvel') ).toBeTruthy();
		
	})

	test('debe de navegar a la página anterior si se pulsa el botón back', () => {

		const hero = {
			id: 'dc-arrow',
			name: 'Green Arrow',
		}

		render( 
			<AuthContext.Provider value={ contextValue }>
				<MemoryRouter initialEntries={[`/hero/${ hero.id }`]}>
					<Routes>

						<Route path='hero/:heroId' element={ <HeroPage /> } />
						<Route path='marvel' element={ <h1>Página de marvel</h1> } />

					</Routes>
				</MemoryRouter>
			</AuthContext.Provider>
		);

		const btnBack = screen.getByRole('button');
		fireEvent.click( btnBack );

		expect( mockUseNavigate ).toHaveBeenCalledWith(-1);
		
	})

});
