import React, {useRef, useState, useEffect} from 'react'
import baseUrl from '../basedata';

export default function EntryForm(props) {
    const [competitions, setCompetitions] = useState([]);
    const [message, setMessage] = useState('');
    const [isSave, setIsSave] = useState('')
    const title = useRef('');
    const link = useRef('');
    const password = useRef('');
    const smuleName = useRef('');

    const getComp = () => {fetch('http://127.0.0.1:5000/entry-submission/' + props.id, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(res => setCompetitions([...res.response]))}

    useEffect(getComp, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('round-name', props.round_name);
        data.append('competition-id', props.comp_id)
        data.append('title', title.current.value);
        data.append('link', link.current.value);
        data.append('password', password.current.value);
        data.append('smule-name', smuleName.current.value);

        fetch(baseUrl + '/entry-submission', {
            method: "POST",
            body:data
        })
        .then(response => response.json())
        .then(res => setIsSave(res.response));

        setMessage('Sending...')
    }

    useEffect(() => {
        setMessage(isSave);
        title.current.value ='';
        link.current.value='';
        password.current.valueord ='';
        smuleName.current.valueName ='';
    },  [isSave])

    return (
        <div>
            <h3 className="title">Entry Submition Form</h3>
            <form onSubmit={handleSubmit}>
                
                <div className="form-row mb-3">
                    <label>Contender</label>
                    <select class="form-select" ref={smuleName} aria-label="Default select example">
                        <option selected>Your Smule name</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div className="form-row mb-3">
                    <label>Tile</label>
                    <input type="text" ref={title} className="form-control"/>
                </div>
                <div className="form-row mb-3">
                    <label>Link</label>
                    <input type="text" ref={link} className="form-control"/>
                </div>
                <div className="form-row mb-3">
                    <label>Password</label>
                    <input type="text" ref={password} className="form-control"/>
                </div>
                <p>{message}</p>
                <button className="btn btn-outline-dark col-12" type='submit'><i className="fas fa-paper-plane"></i> Submit</button>
            </form>    
        </div>
    )
}
