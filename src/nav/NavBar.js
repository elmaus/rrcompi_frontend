import React from 'react';
import {Link} from 'react-router-dom';
import './nav.css';

export default function NavBar() {
    return (
        <div className="nav-absolute">
            <div className="nav-container">
                <div className="nav">
                    <Link to="/" className="tab">
                        <i className="fas fa-home fa-2x"></i>
                        Home
                    </Link>
                    <Link to="/comp" className="tab">
                        <i className="fas fa-trophy fa-2x"></i>
                        Comp
                    </Link>
                    <Link className="tab">
                        <i class="fas fa-headphones fa-2x"></i>
                        Play
                    </Link>
                    <Link to="/admin" className="tab">
                        <i className="fas fa-tools fa-2x"></i>
                        Admin
                    </Link>
                </div>
            </div>
        </div>
    )
}
