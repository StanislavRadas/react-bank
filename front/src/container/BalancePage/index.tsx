import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './index.css';

interface Transaction {
    id: string;
    name: string;
    amount: number;
    date: string;
    status: string;
    paymentSystem: string | undefined;
}

interface PaymentSystemIconProps {
    paymentSystem?: string;
}

interface AmountProps {
    transaction: Transaction;
}

const PaymentSystemIcon: React.FC<PaymentSystemIconProps> = ({ paymentSystem }) => {
    console.log('Payment system:', paymentSystem);
    switch (paymentSystem) {
        case 'Stripe':
            return <div className="contact__icon--stripe">
                <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.826721" width="48" height="48" rx="24" fill="#F7F7F7"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M23.0062 20.3604C23.0062 19.589 23.6614 19.2923 24.7464 19.2923C26.3023 19.2923 28.2677 19.7473 29.8236 20.5582V15.9099C28.1244 15.2571 26.4456 15 24.7464 15C20.5905 15 17.8267 17.0967 17.8267 20.5978C17.8267 26.0571 25.6062 25.1868 25.6062 27.5407C25.6062 28.4505 24.7874 28.7473 23.6409 28.7473C21.9417 28.7473 19.7716 28.0747 18.0519 27.1648V31.8725C19.9559 32.6637 21.8803 33 23.6409 33C27.8992 33 30.8267 30.9626 30.8267 27.422C30.8062 21.5275 23.0062 22.5758 23.0062 20.3604Z" fill="#635BFF"/>
                </svg>
            </div>;
        case 'Contact':
            return <div className="contact__icon--contact">
                <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.681641" y="0.323486" width="48" height="48" rx="24" fill="#F7F7F7"/>
                    <g clip-path="url(#clip0_8_442)">
                    <path d="M24.6816 23.3235C26.8908 23.3235 28.6816 21.5326 28.6816 19.3235C28.6816 17.1143 26.8908 15.3235 24.6816 15.3235C22.4725 15.3235 20.6816 17.1143 20.6816 19.3235C20.6816 21.5326 22.4725 23.3235 24.6816 23.3235Z" stroke="#939199" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18.6816 33.3235V31.3235C18.6816 30.2626 19.1031 29.2452 19.8532 28.4951C20.6034 27.7449 21.6208 27.3235 22.6816 27.3235H26.6816C27.7425 27.3235 28.7599 27.7449 29.5101 28.4951C30.2602 29.2452 30.6816 30.2626 30.6816 31.3235V33.3235" stroke="#939199" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_8_442">
                    <rect width="24" height="24" fill="white" transform="translate(12.6816 12.3235)"/>
                    </clipPath>
                    </defs>
                </svg>
            </div>;
        case 'Coinbase':
            return <div className="contact__icon--coinbase">
                <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.826721" width="48" height="48" rx="24" fill="#F7F7F7"/>
                    <path d="M24.9801 18.7206C27.1325 18.7206 28.8402 20.0276 29.4885 21.9716H33.8267C33.0405 17.8158 29.5568 15 25.0149 15C19.8569 15 15.8267 18.8551 15.8267 24.0171C15.8267 29.1792 19.7551 33 25.0149 33C29.455 33 33.007 30.1842 33.7932 25.9941H29.4885C28.8737 27.9382 27.166 29.2795 25.0136 29.2795C22.0415 29.2795 19.9588 27.0334 19.9588 24.0171C19.96 20.9666 22.0093 18.7206 24.9801 18.7206Z" fill="#0052FF"/>
                </svg>
            </div>;
        default:
            return <div className="contact__icon--contact">
                <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.681641" y="0.323486" width="48" height="48" rx="24" fill="#F7F7F7"/>
                    <g clip-path="url(#clip0_8_442)">
                    <path d="M24.6816 23.3235C26.8908 23.3235 28.6816 21.5326 28.6816 19.3235C28.6816 17.1143 26.8908 15.3235 24.6816 15.3235C22.4725 15.3235 20.6816 17.1143 20.6816 19.3235C20.6816 21.5326 22.4725 23.3235 24.6816 23.3235Z" stroke="#939199" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18.6816 33.3235V31.3235C18.6816 30.2626 19.1031 29.2452 19.8532 28.4951C20.6034 27.7449 21.6208 27.3235 22.6816 27.3235H26.6816C27.7425 27.3235 28.7599 27.7449 29.5101 28.4951C30.2602 29.2452 30.6816 30.2626 30.6816 31.3235V33.3235" stroke="#939199" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_8_442">
                    <rect width="24" height="24" fill="white" transform="translate(12.6816 12.3235)"/>
                    </clipPath>
                    </defs>
                </svg>
            </div>;
    }
};

const AmountClass: React.FC<AmountProps> = ({ transaction }) => {
    let amountClassName = "amount";
    if (transaction.status === 'Sending') {
        amountClassName += ' send';

        return (
                <div className={amountClassName}>
                -${transaction.amount}
                </div>
            );
    } else {
        return (
                <div className={amountClassName}>
                +${transaction.amount}
                </div>
        )
    }
};


const BalancePage: React.FC = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [balance, setBalance] = useState<number>(0);

    const fetchTransactions = async () => {
    try {
        const response = await fetch(`http://localhost:4000/transaction`);
        if (response.ok) {
            const data = await response.json();
            console.log(data.transactions); 
            setTransactions(data.transactions);
        } else {
            console.error('Не вдалося отримати транзакції');
        }
    } catch (error) {
        console.error('Помилка під час отримання транзакцій:', error);
    }
};

    useEffect(() => {
        fetchTransactions();
    }, []);

    useEffect(() => {
        const calculateBalance = () => {
            const initialBalance = transactions.reduce((total, transaction) => {
                if (transaction.status === "Received") {
                    return total + transaction.amount;
                } else if (transaction.status === "Sending") {
                    return total - transaction.amount;
                }
                else {
                    return total;
                }
            }, 0);
            setBalance(initialBalance);
        };
        calculateBalance();
    }, [transactions]);

    const handleMenuClick = () => {
        navigate('/settings');
    };

    const handleBellClick = () => {
        navigate('/notifications');
    };

    const handleReceiveClick = () => {
        navigate('/recive');
        setBalance(prevBalance => prevBalance + 100);
    };

    const handleSendClick = () => {
        navigate('/send');
        setBalance(prevBalance => prevBalance - 50);
    };

    const handleListItemClick = (transactionId: string) => {
        navigate(`/transaction/${transactionId}`);
    };

    return (
        <div className="page">
            <div className="page__block">
                <header className="header__balance">
                    <div className="balance__menu">
                        <span className="menu__icon" onClick={handleMenuClick}>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="3.20166" y1="6.57349" x2="5.70166" y2="6.57349" stroke="#F3F5FF" stroke-width="1.5" stroke-linecap="round"/>
                                <line x1="21.7017" y1="17.0735" x2="19.2017" y2="17.0735" stroke="#F3F5FF" stroke-width="1.5" stroke-linecap="round"/>
                                <line x1="12.2017" y1="6.57349" x2="21.7017" y2="6.57349" stroke="#F3F5FF" stroke-width="1.5" stroke-linecap="round"/>
                                <line x1="12.7017" y1="17.0735" x2="3.20166" y2="17.0735" stroke="#F3F5FF" stroke-width="1.5" stroke-linecap="round"/>
                                <circle cx="8.95166" cy="6.82349" r="2.75" stroke="#F3F5FF" stroke-width="1.5"/>
                                <circle cx="3.5" cy="3.5" r="2.75" transform="matrix(-1 0 0 1 19.4517 13.3235)" stroke="#F3F5FF" stroke-width="1.5"/>
                            </svg>
                        </span>
                        <span className="menu__title">Main wallet</span>
                        <span className="bell__icon" onClick={handleBellClick}>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_8_425)">
                                <path d="M10.4517 5.32349C10.4517 4.79305 10.6624 4.28435 11.0374 3.90927C11.4125 3.5342 11.9212 3.32349 12.4517 3.32349C12.9821 3.32349 13.4908 3.5342 13.8659 3.90927C14.2409 4.28435 14.4517 4.79305 14.4517 5.32349C15.6001 5.86651 16.5791 6.71181 17.2837 7.76879C17.9884 8.82576 18.3921 10.0546 18.4517 11.3235V14.3235C18.5269 14.9452 18.7471 15.5405 19.0945 16.0616C19.4419 16.5827 19.9067 17.0149 20.4517 17.3235H4.45166C4.9966 17.0149 5.46147 16.5827 5.80885 16.0616C6.15623 15.5405 6.3764 14.9452 6.45166 14.3235V11.3235C6.51122 10.0546 6.91496 8.82576 7.61961 7.76879C8.32426 6.71181 9.30325 5.86651 10.4517 5.32349" stroke="#F3F5FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9.45166 17.3235V18.3235C9.45166 19.1191 9.76773 19.8822 10.3303 20.4448C10.8929 21.0074 11.656 21.3235 12.4517 21.3235C13.2473 21.3235 14.0104 21.0074 14.573 20.4448C15.1356 19.8822 15.4517 19.1191 15.4517 18.3235V17.3235" stroke="#F3F5FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_8_425">
                                <rect width="24" height="24" fill="white" transform="translate(0.45166 0.323486)"/>
                                </clipPath>
                                </defs>
                            </svg>
                        </span>
                    </div>
                    <span className="balance__status">$ {balance.toFixed(2)}</span>
                    <div className="btn__work">
                        <div className="recive__btn" onClick={handleReceiveClick}>
                            <span className="recive__icon">
                                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.2852 8.49011L8.61849 20.1568" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8.61816 9.65686L8.61816 20.1569L19.1182 20.1569" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </span>
                            <span className="btn__text--icon">Receive</span>
                        </div>
                        <div className="send__btn" onClick={handleSendClick}>
                            <span className="send__icon">
                                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.285 11.9902C16.5402 11.9902 18.3683 10.162 18.3683 7.90682C18.3683 5.65166 16.5402 3.82349 14.285 3.82349C12.0298 3.82349 10.2017 5.65166 10.2017 7.90682C10.2017 10.162 12.0298 11.9902 14.285 11.9902Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
                                    <path d="M23.7852 17.8235V23.6568" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M26.1183 20.1568L23.785 17.8235L21.4517 20.1568" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M17.9517 16.6569H13.8683C13.7136 16.6569 13.6362 16.6569 13.5708 16.6579C9.25496 16.7286 5.77336 20.2102 5.70273 24.526C5.70166 24.5914 5.70166 24.6688 5.70166 24.8235V24.8235H17.9517" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </span>
                            <span className="btn__text--icon">Send</span>
                        </div>
                    </div>
                </header>
                <main className="main__balance">
                    <div className="balance__list">
                        <ul className="contact__list">
                            {transactions.slice(-6).reverse().map((transaction) => (
                                <li key={transaction.id} className="balance__list--item" onClick={() => handleListItemClick(transaction.id)}>
                                    <div className="list__item--block">
                                        <PaymentSystemIcon paymentSystem={transaction.paymentSystem} />
                                        <div className="contact__info">
                                            <span className="contact__name">{transaction.name || transaction.paymentSystem}</span>
                                            <span className="date__status">{transaction.date} {transaction.status}</span>
                                        </div>
                                    </div>
                                    <AmountClass transaction={transaction} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default BalancePage;





