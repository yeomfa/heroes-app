import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockUseNavigate,
}))

beforeEach(() => {
	jest.clearAllMocks();
})

describe('Tests on <SearchPage />', () => {

	test('debe de mostrarse correctamente con valores por defecto', () => {

		const { container } = render(
			<MemoryRouter>
				<SearchPage />
			</MemoryRouter>
		);

		expect( container ).toMatchSnapshot();

	})

	test('debe de mostrar al batman y el input con el valor del queryString', () => {

		render(
			<MemoryRouter initialEntries={['/?q=batman']}>
				<SearchPage />
			</MemoryRouter>
		);

		const input = screen.getByRole( 'textbox' );
		expect( input.value ).toBe( 'batman' );

		const img = screen.getByRole( 'img' );
		expect( img.src ).toContain('/assets/heroes/dc-batman.jpg');

		const alertSearch = screen.getByLabelText('alert-search');
		expect( alertSearch.style.display ).toBe( 'none' );
		
	})

	test('debe de mostrar un error si no encuentr el hero (batman123)', () => {

		render(
			<MemoryRouter initialEntries={['/?q=batman123']}>
				<SearchPage />
			</MemoryRouter>
		);

		const alertError = screen.getByLabelText('alert-error');
		expect( alertError.style.display ).toBe( '' );
		
	})

	test('debe de llamar el navigate a la pantalla nueva', () => {

		render(
			<MemoryRouter>
				<SearchPage />
			</MemoryRouter>
		);

		const input = screen.getByRole('textbox');
		const form = screen.getByLabelText('form');

		fireEvent.change( input, { target: { value: 'goku' } } );
		fireEvent.submit( form );

		expect( mockUseNavigate ).toHaveBeenCalledWith('?q=goku');
		
	})

});
