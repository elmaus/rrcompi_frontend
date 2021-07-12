import React, {useState, useRef} from 'react';
import CreateComp from './CreateComp';
import '../App.css';
import {Link} from 'react-router-dom'
import WorkBench from './WorkBench';
import AdminComp from './AdminComp';
import AdminGroup from './AdminGroup';

const passwordForCompititionPage = "competition";
const passwordForAdmin = 'rrcreators';

export default function Admin() {
    const [page, setPage] = useState('');
    const [is_allowed, setIs_Allowed] = useState(true);
    const passwordComp = useRef('')
    const passwordAdmin = useRef('');

    const handleLogin = (part) => {
        console.log(passwordComp.current.value)
        setPage(part);
        if (part == 'admin-comp' && passwordComp.current.value == passwordForCompititionPage) {
            setIs_Allowed(true);
        } else if (part == 'admin' && passwordAdmin.current.value == passwordForAdmin) {
            setIs_Allowed(true);
        }
         
    }

    if (is_allowed && page == 'admin-comp') {
        return (
            <AdminComp/>
        )
    } else if (is_allowed && page == "admin") {
        return (
            <AdminGroup/>
        )
    }

    return (
        <>
            <h3 className="title">RR Admin Page</h3>

            <div className='container bg-light p-3'>
                <h4 className="text-center mb-3">Manage Member</h4>
                <input className="form-control mb-3" ref={passwordAdmin} placeholder="Password"/>
                <button className="btn btn-outline-dark col-12" onClick={(part) => handleLogin('admin')}>Enter <i className="fas fa-sign-in-alt"></i></button>
            </div>

            <div className='container bg-light p-3 mt-5'>
                <h4 className="text-center mb-3">Manage Competition</h4>
                <input className="form-control mb-3" ref={passwordComp} placeholder="Password"/>
                <button className="btn btn-outline-dark col-12" onClick={(part) => handleLogin('admin-comp')}>Enter <i className="fas fa-sign-in-alt"></i></button>
            </div>

            {/* <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                <div className="btn-group" role="group">
                    <button id="btnGroupDrop1" type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Manage Members
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                        <li><button className="btn btn-light col-12" onClick={() => setPage('create-competition')}>View All Members Information</button></li>
                        <li><button className="btn btn-light col-12" onClick={() => setPage('add-member')}>Manually Add Memeber</button></li>
                        <li><button className="btn btn-light col-12" onClick={() => setPage('create-competition')}>Delete Member</button></li>
                        <li><button className="btn btn-light col-12" onClick={() => setPage('create-competition')}>Edit Member's Information</button></li>
                    </ul>
                    <button id="btnGroupDrop2" type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Competition
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="btnGroupDrop2"> */}
                        {/* <li><button className="btn btn-light col-12" onClick={() => setPage('create-competition')}>Create New Competition</button></li>
                        <li><button className="btn btn-light col-12" onClick={() => setPage('create-competition')}>Edit Competition</button></li>
                        <li><button className="btn btn-light col-12" onClick={() => setPage('add-round')}>Create Round</button></li>
                        <li><button className="btn btn-light col-12" onClick={() => setPage('create-competition')}>Edit Round</button></li>
                        <li><button className="btn btn-light col-12" onClick={() => setPage('create-competition')}>Grant Contender</button></li>
                        <li><button className="btn btn-light col-12" onClick={() => setPage('create-competition')}>Evict Contender</button></li>
                         */}
                    {/* </ul>
                </div>
            </div> */}

            {/* <WorkBench value={page}/> */}
            
        </>
    )
}
