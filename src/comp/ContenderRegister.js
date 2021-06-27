import React, {useState, useRef, useEffect} from 'react';
import baseUrl from '../basedata';

export default function ContederRegister() {
    const [datas, setDatas] = useState('');
    const file = useRef('');
    const smuleName = useRef('');
    const lineName = useRef('');
    const email = useRef('');
    const password = useRef('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target);
        data.append('competition_id', 1);
        data.append('smule_name', smuleName.current.value);
        data.append('line_name', lineName.current.value);
        data.append('email', email.current.value);
        data.append('password', password.current.value);

        fetch(baseUrl + '/register-contender', {
            method: 'POST',
            body:data
        })
        .then(response => response.json())
        .then(res => setDatas(res.title));
    }

    return (
        <>
            <h3 className="title">Contender Registration Form</h3>
            <p>{datas}</p>
            <form onSubmit={handleSubmit} enctype="multipart/from-data">
                <div className="form-row mb-3">
                    <label>Smule Name</label>
                    <input ref={smuleName} className="form-control" name="smule_name" type="text"/>
                </div>
                <div className="form-row mb-3">
                    <label>Line Name</label>
                    <input ref={lineName} className="form-control" name="line_name" type="text"/>      
                </div>
                <div className="form-row mb-3">
                    <label>Email</label>
                    <input ref={email} className="form-control" name="email" type="email"/>
                </div>
                <div className="form-row mb-3">
                    <label>Password</label>
                    <input ref={password} className="form-control" name="password" type="password"/>
                </div>
                <div className="form-row mb-3">
                    <label>Profile</label>
                    <input ref={file} type="file" className="form-control" name="file"/>           
                </div>
                <button className="btn btn-outline-dark col-12" type='submit'><i className="fas fa-paper-plane"></i> Submit</button>
            </form>
        </>
    )
}