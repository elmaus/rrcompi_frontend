import React, {useRef} from 'react'

export default function JudgeRegistrationForm() {
    const name = useRef('');
    const email = useRef('');
    const password = useRef('');
    const file = useRef('');

    return (
        <div>
            <h3 className="title">Judge Registration Form</h3>
            <form>
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
                    <label>Profile</label>
                    <input ref={file} type="file" className="form-control" name="file"/>           
                </div>
                <button className="btn btn-outline-dark col-12" type='submit'><i className="fas fa-paper-plane"></i> Submit</button>
            </form>
      
        </div>
    )
}
