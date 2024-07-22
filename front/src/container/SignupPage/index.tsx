import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import './index.css';

interface AuthContextProps {
  dispatch: React.Dispatch<any>;
}

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    throw new Error('AuthContext не визначений');
  }

  const { dispatch } = authContext;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('User already exists');
      }

      const data = await response.json();
      if (data.session.token) {
        dispatch({
          type: 'LOGIN',
          payload: { token: data.session.token, user: data.session.user },
        });
        navigate('/signup-confirm');
      } else {
        throw new Error('Token not received');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleBackClick = (event: React.MouseEvent) => {
        event.preventDefault();
        navigate(-1);  
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  
  return (
    <div className="page">
      <div className="page__block">
        <div onClick={handleBackClick} className="back__link">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 6L5 12L10 18" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 12H19.5" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <header className="header__block">
          <h1 className="title__signup">Sign up</h1>
          <p className="description">Choose a registration method</p>
        </header>
        <main className="main__signup">
          <form className="form" onSubmit={handleSubmit}>
            <div className="email__item">
              <label htmlFor="email" className="label__email">Email</label>
              <input
                name="email"
                type="email"
                className="input__email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="password__item">
              <label className="label__password" htmlFor="password">Password</label>
              <div className="password__field">
                <input
                  className="password__input"
                  name="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="Your password!"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="icon__password" onClick={togglePasswordVisibility}>
                  <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.6155 11.7626C3.37035 11.3144 3.37036 10.7727 3.61551 10.3244C5.17331 7.47594 8.20138 5.54358 11.6816 5.54358C15.1619 5.54358 18.19 7.476 19.7478 10.3245C19.9929 10.7728 19.9929 11.3145 19.7478 11.7628C18.19 14.6112 15.1619 16.5436 11.6817 16.5436C8.20139 16.5436 5.17328 14.6112 3.6155 11.7626Z" stroke="#1D1D1F" />
                    <circle cx="11.6816" cy="11.0436" r="2.75" stroke="#1D1D1F" />
                    {isPasswordVisible ? (
                      <path d="M6.3543 6.3543L16.6071 16.6071" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    ) : null}
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <span className="link__prefix">
                Already have an account? <a href="/signin" className="signin__link">Sign In!</a>
              </span>
            </div>
            <button type="submit" className="btn__submit--signup">Continue</button>
            {error && <span className="alert__error--signup">{error}</span>}
          </form>
        </main>
      </div>
    </div>
  );
};

export default SignupPage;