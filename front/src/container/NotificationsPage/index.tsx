import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './index.css';

interface Notification {
    id: string;
    message: string;
    type: string;
    timestamp: string;
}

interface IconProps {
    notification: Notification
}

const NotificationIcon: React.FC<IconProps> = ({ notification }) => {
    console.log(notification)
    if (notification.type === 'announce') {
        return (
            <div>
                <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.681641" y="0.0435791" width="40" height="40" rx="20" fill="#F7F7F7"/>
                    <g clip-path="url(#clip0_8_594)">
                    <path d="M19.0151 14.2102C19.0151 13.7682 19.1907 13.3443 19.5033 13.0317C19.8159 12.7192 20.2398 12.5436 20.6818 12.5436C21.1238 12.5436 21.5478 12.7192 21.8603 13.0317C22.1729 13.3443 22.3485 13.7682 22.3485 14.2102C23.3055 14.6628 24.1213 15.3672 24.7085 16.248C25.2957 17.1288 25.6322 18.1528 25.6818 19.2102V21.7102C25.7445 22.2283 25.928 22.7245 26.2175 23.1587C26.507 23.5929 26.8944 23.9531 27.3485 24.2102H14.0151C14.4693 23.9531 14.8566 23.5929 15.1461 23.1587C15.4356 22.7245 15.6191 22.2283 15.6818 21.7102V19.2102C15.7314 18.1528 16.0679 17.1288 16.6551 16.248C17.2423 15.3672 18.0581 14.6628 19.0151 14.2102" stroke="#1D1D1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18.1816 24.2102V25.0435C18.1816 25.7066 18.445 26.3425 18.9139 26.8113C19.3827 27.2801 20.0186 27.5435 20.6816 27.5435C21.3447 27.5435 21.9806 27.2801 22.4494 26.8113C22.9182 26.3425 23.1816 25.7066 23.1816 25.0435V24.2102" stroke="#1D1D1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_8_594">
                    <rect width="20" height="20" fill="white" transform="translate(10.6816 10.0436)"/>
                    </clipPath>
                    </defs>
                </svg>
            </div>
        )
    } else {
        return (
            <div>
                <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.681641" y="0.0435791" width="40" height="40" rx="20" fill="#F7F7F7"/>
                    <path d="M12.3481 24.982C12.3481 24.4759 12.4771 23.9781 12.7229 23.5356L17.8779 14.2567C18.3348 13.4343 19.1299 12.8539 20.0525 12.6694V12.6694C20.4677 12.5863 20.8953 12.5863 21.3105 12.6694V12.6694C22.2331 12.8539 23.0282 13.4343 23.4851 14.2568L28.64 23.5356C28.8858 23.9781 29.0148 24.4759 29.0148 24.982V24.982C29.0148 26.6268 27.6814 27.9602 26.0366 27.9602H15.3264C13.6816 27.9602 12.3481 26.6268 12.3481 24.982V24.982Z" stroke="#F23152" stroke-width="1.5"/>
                    <path d="M20.6816 17.5436L20.6816 20.877" stroke="#F23152" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20.6816 23.3769L20.6816 23.7936" stroke="#F23152" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        )
    }
}

const NotificationsPage: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const navigate = useNavigate();

    const handleBackClick = (event: React.MouseEvent) => {
        event.preventDefault();
        navigate(-1);  
    };

    useEffect(() => {
        const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        const lastFourNotifications = storedNotifications.slice(-4);
        setNotifications(lastFourNotifications);
    }, []);

    return (
        <div className="page">
            <div className="page__block">
                <header className="header__not">
                    <div onClick={handleBackClick} className="back__link">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 6L5 12L10 18" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 12H19.5" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    <h1 className="title__signup">Notifications</h1>
                </header>
                <main className="main__not">
                    <ul className="not__list">
                        {notifications.reverse().map((notification) => (
                            <li key={notification.id} className={`list__item--${notification.type}`}>
                                <NotificationIcon notification={notification} />
                                <div className="anno__info">
                                    <span className="contact__name">{notification.message}</span>
                                    <span className="date__status">{notification.timestamp} {notification.type === "warn" ? "Warning" : "Announcement"}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </main>
            </div>
        </div>
    );
}

export default NotificationsPage;

