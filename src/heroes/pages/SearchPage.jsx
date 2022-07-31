import { HeroCard } from '../components';
import queryString from 'query-string';
import { useForm } from '../../hooks/useForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { getHeroesByName } from '../helpers';

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);
  const heroes = getHeroesByName( q );

  const showSearch = (q.length === 0);
  const showError = (q.length !== 0) && heroes.length === 0;

  const { searchText, onInputChange } = useForm({
    searchText: q,
  })

  const onSearchSubmit = ( event ) => {
    event.preventDefault();
    // if ( searchText.trim().length <= 1 ) return;

    navigate( `?q=${ searchText }` );
    // onResetForm();
    
  }

  return (
    <>
      <h1>Search</h1>
      <div className="col-5">
        <form 
          aria-label="form"
          className="d-flex"
          onSubmit={ onSearchSubmit }
        >
          <input
            type="text"
            placeholder="Search a hero"
            className="form-control"
            name="searchText"
            autoComplete="off"
            onChange={ onInputChange }
            value={ searchText }
          />
          <button type='submit' className="btn btn-primary">
            Search
          </button>
        </form>
      </div>
      <hr />

      <h4>Results</h4>
      <div className="row row-cols-1 row-cols-md-3 g-3">
        
        {/* { q === '' */}
        {/*   ? <div className="alert alert-primary"> Search a hero </div> */}
        {/*   : heroes.length === 0 && <div className="alert alert-danger"> No hero with <b>{ q }</b> </div> */}
        {/* } */}

        <div 
          aria-label="alert-search"
          className="alert alert-primary"
          style={{ display: showSearch ? '' : 'none' }}
        > 
          Search a hero 
        </div>
        <div 
          aria-label="alert-error"
          className="alert alert-danger"
          style={{ display: showError ? '' : 'none' }}
        > 
          No hero with <b>{ q }</b>
        </div>

        { heroes.map( hero => (
            <HeroCard 
              key={ hero.id }
              { ...hero }
            />
        ) ) }

      </div>

    </>
  )
}
