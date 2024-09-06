import React, { useState, useEffect } from 'react'; 
import './navb.css';
import Modal from './Modal';
import Login from './Login';
import Signp from './Signp';
import { useNavigate } from 'react-router-dom';

const Navb = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginView, setIsLoginView] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);                  
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleSwitchToSignup = () => setIsLoginView(false);
    const handleSwitchToLogin = () => setIsLoginView(true);
  
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark custom-navbar"> 
                <a className="navbar-brand" href="#">Password-Manager</a>

                <form className="form-inline"> 
                    {!isLoggedIn ? (
                        <button
                            className="btn btn-outline-success"
                            type="button"
                            onClick={() => { setIsModalOpen(true); setIsLoginView(true); }}
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            className="btn btn-outline-success"
                            type="button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    )}
                </form>
            </nav>
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                {isLoginView ? (
                    <Login
                        onClose={() => setIsModalOpen(false)}
                        onSwitchToSignup={handleSwitchToSignup}
                    />
                ) : (
                    <Signp
                        onClose={() => setIsModalOpen(false)}
                        onSwitchToLogin={handleSwitchToLogin}
                    />
                )}
            </Modal>
        </div>
    );
}

export default Navb;
