import React, {useState, useRef} from 'react'
import ScoreSheet from './ScoreSheet';

export default function ScoreSheetMain() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const email = useRef('');
    const password = useRef('');

    const handleLogin = () => {
        setIsAuthenticated(true)
    }

    const handleLogout = () => {
        setIsAuthenticated(false)
    }

    if (isAuthenticated) {
        return (
            <ScoreSheet/>
        )
    }
    return (
        <>
            <h1 className="text-center py-5">Login</h1>

            <form>
                <div className="container">
                    <select class="form-select mb-4" aria-label="Default select example">
                            <option selected>Competition</option>
                            <option value="1">RRVSS1</option>
                            <option value="2">RRVSS2</option>
                            <option value="3">RRVSS3</option>
                    </select>
                    <label className="form-label mb-2">Email</label>
                    <input type="email" ref={email} className="form-control col-12 mb-4"/>
                    <label className="form-label mb-2">Password</label>
                    <input type="password" ref={password} className="form-control col-12 mb-4"/>
                    <button className="btn btn-outline-dark col-12 mb-3" onClick={handleLogin} type="submit">Login</button>
                    <a href="#" className="mt-4">Forget Password</a>
                </div>
            </form>
        </>
    )
}
