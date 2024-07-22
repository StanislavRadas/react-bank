import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './index.css';

const SendPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState("");

    const handleBackClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        navigate(-1);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, amount }),
            });

            if (response.ok) {
                const newNotification = {
                    id: Date.now().toString(),
                    message: `You sent ${amount} to ${email}`,
                    type: "announce",
                    timestamp: new Date().toLocaleTimeString(),
                };

                const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
                const updatedNotifications = [...storedNotifications, newNotification];
                localStorage.setItem('notifications', JSON.stringify(updatedNotifications));

                navigate('/balance');
            } else {
                console.error('Transaction failed');
            }
        } catch (error) {
            console.error('Error sending transaction:', error);
        }
    };

    return (
        <div className="page">      
            <div className="page__block">
                <header className="header__not">
                    <div className="back__link" onClick={handleBackClick}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 6L5 12L10 18" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 12H19.5" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    <h1 className="title__signup">Send</h1>
                </header>
                <form className="send__form" onSubmit={handleSubmit}>
                    <div className="email__item">
                        <label className="label__email" htmlFor="email">Email</label>
                        <input
                            className="input__email"
                            name="email"
                            type="email"
                            placeholder="Type email!"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="password__item">
                        <label className="label__password" htmlFor="sum">Sum</label>
                        <div className="password__field">
                            <input
                                className="password__input"
                                name="sum"
                                type="text"
                                placeholder="Amount!"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn__submit--send">Send</button>
                </form>
            </div>
        </div>
    );
}

export default SendPage;



