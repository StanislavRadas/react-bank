import React from "react";
import { Link } from "react-router-dom";
import './index.css';

const WellcomePage: React.FC = () => {
    return (
        <div className="page">
            <div className="page__block">
                <main className="main">
                    <h1 className="title">Hello!</h1>
                    <p className="text">Welcome to bank app</p>
                    <div className="second__bg"></div>
                </main>
                <div className="button__block">
                    <Link to="/signup" className="btn__sign-up">
                        Sign Up
                    </Link>
                    <Link to="/signin" className="btn__sign-in">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default WellcomePage;