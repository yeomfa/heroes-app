import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context';

export const LoginPage = () => {

  const { login } = useContext( AuthContext );
  const navigate = useNavigate();

  const [ inputValue, setInputValue ] = useState('');

  const onChangeInput = ({ target }) => {
    setInputValue( target.value );
  }

  const onSubmitLogin = (e) => {
    e.preventDefault();

    const lastPath = localStorage.getItem('lastPath') || '/';
    login( inputValue );

    navigate(lastPath, {
      replace: true,
    });
  }

  return (
    <div className="container mt-5 g-1">
      <h1>Welcome to HeroesApp</h1>
      <hr />
      <form 
        onSubmit={ onSubmitLogin }
        className="d-flex flex-column" 
      >
        <input 
          className='form-control'
          type="text"
          onChange={ onChangeInput }
          value={ inputValue }
          placeholder="Ingrese su nombre"
        />

        <button 
          type='submit'
          className="btn btn-primary mt-3"
        >
          Login
        </button>
      </form>
    </div>
  )
}
