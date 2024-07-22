import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './index.css';

interface Notification {
    id: string;
    message: string;
    type: string;
    timestamp: string;
}

const RecoveryPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:4000/recovery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                const newNotification: Notification = {
                    id: Math.random().toString(36).substring(2, 9),
                    message: 'You restore your account!',
                    type: 'warn',
                    timestamp: new Date().toLocaleTimeString()
                };
                const existingNotifications: Notification[] = JSON.parse(localStorage.getItem('notifications') || '[]');
                const updatedNotifications = [...existingNotifications, newNotification];
                localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
            }

            if (!response.ok) {
                throw new Error('Failed to generate recovery code');
            }

            const data = await response.json();
            console.log(`Recovery code for ${email}: ${data.recoveryCode}`);

            setSuccess('Recovery email sent successfully');
            navigate('/recovery-confirm');
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
                    <p className="description">Choose a recovery method</p>
                </header>
                <div className="recovery__block">
                    <form className="recovery__form" onSubmit={handleSubmit}>
                        <div className="email__item">
                            <label className="label__email" htmlFor="email">Email</label>
                            <input
                                className="input__email"
                                type="email"
                                name="email"
                                placeholder="Your email!"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        {error && <span className="alert--error">{error}</span>}
                        {success && <span className="alert--success">{success}</span>}
                        <button type="submit" className="btn__submit--recovery">Send code</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RecoveryPage;
