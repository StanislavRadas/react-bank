import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './index.css';

interface Transaction {
    id: string;
    name: string;
    amount: number;
    date: string;
    status: string;
    paymentSystem: string;
}

interface AmountProps {
    transaction: Transaction;
}

const AmountClass: React.FC<AmountProps> = ({ transaction }) => {
    let amountClassName = "balance__transaction";
    if (transaction.status === 'Received') {
        amountClassName += ' recieve';

        return (
                <div className={amountClassName}>
                +${transaction.amount}
                </div>
            );
    } else {
        return (
                <div className={amountClassName}>
                -${transaction.amount}
                </div>
        )
    }
};

const TransactionPage: React.FC = () => {
    const { transactionId } = useParams<{ transactionId: string }>();
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const handleBackClick = (event: React.MouseEvent) => {
        event.preventDefault();
        navigate(-1);
    };

    useEffect(() => {
        const fetchTransaction = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:4000/transaction/${transactionId}`);
                if (response.ok) {
                    const data = await response.json();
                    setTransaction(data.transaction);
                } else {
                    console.error('Failed to fetch transaction');
                }
            } catch (error) {
                console.error('Error fetching transaction:', error);
            }
            setLoading(false);
        };

        fetchTransaction();
    }, [transactionId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!transaction) {
        return <div>Transaction not found</div>;
    }

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
                    <h1 className="title__signup">Transaction</h1>
                </header>
                <AmountClass transaction={transaction} />
                <main className="main__transaction">
                    <ul className="list__transaction">
                        <li className="list__trans--item">
                            <p className="data__item">Date</p>
                            <p className="data__item">{transaction.date}</p>
                        </li>
                        <li className="list__trans--item">
                            <p className="data__item">Address</p>
                            <p className="data__item">{transaction.paymentSystem || transaction.name}</p>
                        </li>
                        <li className="list__trans--item">
                            <p className="data__item">Status</p>
                            <p className="data__item">{transaction.status}</p>
                        </li>
                    </ul>
                </main>
            </div>
        </div>
    );
}

export default TransactionPage;
