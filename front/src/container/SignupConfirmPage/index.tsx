import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import './index.css';

const SignupConfirmPage: React.FC = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is not defined');
  }

  const { state, dispatch } = authContext;

  useEffect(() => {
    if (state.user?.isConfirm) {
      navigate('/balance');
    }
  }, [state.user, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error('Invalid token');
      }

      const data = await response.json();

      if (data.success) {
        dispatch({ type: 'CONFIRM_USER' });
        navigate('/balance');
      } else {
        throw new Error('Confirmation failed');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleBackClick = (event: React.MouseEvent) => {
        event.preventDefault();
        navigate(-1);  
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
        <main className="main__confirm">
          <p className="title__confirm">Confirm account</p>
          <p className="description__confirm">Write the code you received</p>
          <form className="form__confirm" onSubmit={handleSubmit}>
            <div className="confirm__block">
              <label className="label__confirm" htmlFor="confirm">Code</label>
              <input
                className="input__confirm"
                type="text"
                name="confirm"
                placeholder="1234"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </div>
            <button className="btn__confirm">Confirm</button>
            {error && <span className="alert__error--signup">{error}</span>}
          </form>
        </main>
      </div>
    </div>
  );
};

export default SignupConfirmPage;