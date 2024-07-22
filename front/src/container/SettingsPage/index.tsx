import React, { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

interface Notification {
    id: string;
    message: string;
    type: string;
    timestamp: string;
}

const SettingsPage: React.FC = () => {
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [currentEmail, setCurrentEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const handleBackClick = (event: React.MouseEvent) => {
        event.preventDefault();
        navigate(-1);
    };

    const handleChangePassword = () => {
        fetch('http://localhost:4000/settings/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: currentEmail,
                oldPassword,
                newPassword,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);
                const newNotification: Notification = {
                    id: Math.random().toString(36).substring(2, 9),
                    message: 'Password was changed',
                    type: 'warn',
                    timestamp: new Date().toLocaleTimeString()
                };
                const existingNotifications: Notification[] = JSON.parse(localStorage.getItem('notifications') || '[]');
                const updatedNotifications = [...existingNotifications, newNotification];
                localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
                navigate('/');
            })
            .catch((error) => {
                console.error('Failed to change password:', error);
                console.log(error.message);
            });
    };

    const handleChangeEmail = () => {
        fetch('http://localhost:4000/settings/change-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: currentEmail,
                newEmail,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);
                const newNotification: Notification = {
                    id: Math.random().toString(36).substring(2, 9),
                    message: 'Email was changed',
                    type: 'warn',
                    timestamp: new Date().toLocaleTimeString()
                };
                const existingNotifications: Notification[] = JSON.parse(localStorage.getItem('notifications') || '[]');
                const updatedNotifications = [...existingNotifications, newNotification];
                localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
                navigate('/');
            })
            .catch((error) => {
                console.error('Failed to change email:', error);
                console.log(error.message);
            });
    };

    const handleLogout = () => {
    fetch('http://localhost:4000/settings/logout', {
        method: 'POST',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Logout request failed');
            }
            return response.json();
        })
        .then((data) => {
            if (data && data.message) {
                console.log(data.message);
                const newNotification: Notification = {
                    id: Math.random().toString(36).substring(2, 9),
                    message: 'Logout!',
                    type: 'warn',
                    timestamp: new Date().toLocaleTimeString()
                };
                const existingNotifications: Notification[] = JSON.parse(localStorage.getItem('notifications') || '[]');
                const updatedNotifications = [...existingNotifications, newNotification];
                localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
                navigate('/');
                window.location.href = '/';
            } else {
                console.error('Empty response or missing message');
            }
        })
        .catch((error) => {
            console.error('Failed to logout:', error.message);
        });
    };

    const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="page">
            <div className="page__block">
                <header className="header__not">
                    <div onClick={handleBackClick} className="back__link">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10 6L5 12L10 18"
                                stroke="#1D1D1F"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path d="M6 12H19.5" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    <h1 className="title__signup">Settings</h1>
                </header>
                <main className="sett__main">
                    <form className="form__sett--email">
                        <h2 className="sett__title--email">Change email</h2>
                        <div className="block__email--sett">
                            <label className="label__email--change" htmlFor="currentEmail">
                                Current Email
                            </label>
                            <input
                                className="input__email--change"
                                name="currentEmail"
                                type="email"
                                placeholder="Email"
                                value={currentEmail}
                                onChange={(e) => setCurrentEmail(e.target.value)}
                            />
                        </div>
                        <div className="block__email--sett">
                            <label className="label__email--change" htmlFor="newEmail">
                                New Email
                            </label>
                            <input
                                className="input__email--change"
                                name="newEmail"
                                type="email"
                                placeholder="New Email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                        </div>
                        <button className="btn__save" onClick={handleChangeEmail}>
                            Save Email
                        </button>
                    </form>
                    <div className="divider"></div>
                    <form className="form__sett--password">
                        <h2 className="sett__title--email">Change password</h2>
                        <div className="block__email--sett">
                            <label className="label__email--change" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="input__email--change"
                                name="email"
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setCurrentEmail(e.target.value)}
                            />
                        </div>
                        <div className="block__email--sett">
                            <label className="label__email--change" htmlFor="oldPassword">
                                Old Password
                            </label>
                            <div className="password__field--change">
                                <input
                                    className="input__password--change"
                                    name="oldPassword"
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    placeholder="Old password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                />
                                <span className="icon__password" onClick={togglePasswordVisibility}>
                                    <svg
                                        width="23"
                                        height="23"
                                        viewBox="0 0 23 23"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3.6155 11.7626C3.37035 11.3144 3.37036 10.7727 3.61551 10.3244C5.17331 7.47594 8.20138 5.54358 11.6816 5.54358C15.1619 5.54358 18.19 7.476 19.7478 10.3245C19.9929 10.7728 19.9929 11.3145 19.7478 11.7628C18.19 14.6112 15.1619 16.5436 11.6817 16.5436C8.20139 16.5436 5.17328 14.6112 3.6155 11.7626Z"
                                            stroke="#1D1D1F"
                                        />
                                        <circle cx="11.6816" cy="11.0436" r="2.75" stroke="#1D1D1F" />
                                        {isPasswordVisible ? (
                                        <path d="M6.3543 6.3543L16.6071 16.6071" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        ) : null}
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className="block__email--sett">
                            <label className="label__email--change" htmlFor="newPassword">
                                New password
                            </label>
                            <div className="password__field--change">
                                <input
                                    className="input__password--change"
                                    name="newPassword"
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    placeholder="New password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <span className="icon__password" onClick={togglePasswordVisibility}>
                                    <svg
                                        width="23"
                                        height="23"
                                        viewBox="0 0 23 23"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3.6155 11.7626C3.37035 11.3144 3.37036 10.7727 3.61551 10.3244C5.17331 7.47594 8.20138 5.54358 11.6816 5.54358C15.1619 5.54358 18.19 7.476 19.7478 10.3245C19.9929 10.7728 19.9929 11.3145 19.7478 11.7628C18.19 14.6112 15.1619 16.5436 11.6817 16.5436C8.20139 16.5436 5.17328 14.6112 3.6155 11.7626Z"
                                            stroke="#1D1D1F"
                                        />
                                        <circle cx="11.6816" cy="11.0436" r="2.75" stroke="#1D1D1F" />
                                        {isPasswordVisible ? (
                                        <path d="M6.3543 6.3543L16.6071 16.6071" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        ) : null}
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <button className="btn__save" onClick={handleChangePassword}>
                            Save Password
                        </button>
                    </form>
                    <div className="divider"></div>
                    <button className="btn__logout" onClick={handleLogout}>
                        Log out
                    </button>
                </main>
            </div>
        </div>
    );
};

export default SettingsPage;




