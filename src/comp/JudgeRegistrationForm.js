import React, {useRef, useState} from 'react'
import baseUrl from '../basedata';

export default function JudgeRegistrationForm() {
    const name = useRef('');
    const email = useRef('');
    const password = useRef('');
    const password2 = useRef('');
    const file = useRef('');
    const [message, setMessage] = useState('')

    const handleSubmit = e => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', name.current.value);
        data.append('email', email.current.value);
        data.append('password', password.current.value);
        data.append('file', file.current.files[0]);

        if (name.current.value != '' && email.current.value != '' && password.current.value != '') {
            if (password.current.value == password2.current.value) {
                setMessage('Saving...')
                fetch(baseUrl + '/register-judge', {
                    method:'POST',
                    body:data
                })
                .then(response => response.json())
                .then(res => {
                    if (res.response == 'success') {
                        setMessage = "You are now registered";
                        name.current.value = '';
                        email.current.value = '';
                        password.current.value = '';
                        password2.current.value = '';
                    }
                })
            } else {
                setMessage('Password does not matched!')
            }
        }
    }

    return (
        <div>
            <h3 className="title">Judge Registration Form</h3>
            <form onSubmit={handleSubmit} enctype="multipart/from-data">
                <div className="form-row mb-3">
                    <label>Name</label>
                    <input ref={name} className="form-control" name="name" type="text"/>      
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
                    <label>Re-type Password</label>
                    <input ref={password2} className="form-control" name="password" type="password"/>
                </div>
                <div className="form-row mb-3">
                    <label>Profile</label>
                    <input ref={file} type="file" className="form-control" name="file"/>           
                </div>
                <p>{message}</p>
                <button className="btn btn-outline-dark col-12" type='submit'><i className="fas fa-paper-plane"></i> Submit</button>
            </form>
      
        </div>
    )
}
