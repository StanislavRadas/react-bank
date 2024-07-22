import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './index.css';

const RecoveryConfirmPage: React.FC = () => {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(''); 

        try {
            const response = await fetch('http://localhost:4000/recovery-confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, newPassword }),
            });

            if (!response.ok) {
                throw new Error('Failed to confirm recovery');
            }
            window.location.href = '/balance';

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
                <header className="header__signin">
                    <h1 className="title__signup">Recover password</h1>
                    <p className="description">Write the code you received</p>
                </header>
                <div className="recovery__block">
                    <form className="recovery__form" onSubmit={handleSubmit}>
                        <div className="email__item">
                            <label className="label__email" htmlFor="code">Code</label>
                            <input
                                className="input__email"
                                type="text"
                                name="code"
                                placeholder="Enter your code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                            />
                        </div>
                        <div className="password__item">
                            <label className="label__password" htmlFor="password">New password</label>
                            <div className="password__field">
                                <input
                                    className="password__input"
                                    name="newPassword"
                                    type="password"
                                    placeholder="New password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <span className="icon__password">
                                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.6155 11.7626C3.37035 11.3144 3.37036 10.7727 3.61551 10.3244C5.17331 7.47594 8.20138 5.54358 11.6816 5.54358C15.1619 5.54358 18.19 7.476 19.7478 10.3245C19.9929 10.7728 19.9929 11.3145 19.7478 11.7628C18.19 14.6112 15.1619 16.5436 11.6817 16.5436C8.20139 16.5436 5.17328 14.6112 3.6155 11.7626Z" stroke="#1D1D1F" />
                                        <circle cx="11.6816" cy="11.0436" r="2.75" stroke="#1D1D1F" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        {error && <span className="alert--error">{error}</span>}
                        <button type="submit" className="btn__submit--recovery">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RecoveryConfirmPage;
