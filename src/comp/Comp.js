import React, {useState, useEffect} from 'react';
import baseUrl from '../basedata';
import EntryForm from './EntryForm';
import {Link} from 'react-router-dom';
import Result from './Result';

export default function Comp() {
    const [competitions, setCompetitions] = useState([]);
    const [page, setPage] = useState('');
    const [resultFor, setResultFor] = useState('');

    const getComp = () => {fetch(baseUrl + '/get-active-competitions', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(res => setCompetitions([...res.response]))}

    useEffect(getComp, [])

    const handleView = (v) => {
        setResultFor(v);
        setPage('result')
    }

    if (page == "result") {
        return <Result data={resultFor} back={setPage}/>
    }

    return (
        <div className="container">

            <h3 className="title">Competition</h3>
            {competitions.map((c) =>
                <> 
                    <div className="card w-100 mb-3">
                        <img src={baseUrl + c.image} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h3 className="card-title">{c.title}</h3>
                            <p>{c.subtitle}</p>
                            <small>Entry submission deadline:</small>
                            <p className="ms-5"> {c.deadline}</p>
                            <small>Result release:</small>
                            <p className="ms-5"> {c.result}</p>
                            <div className="btn-group col-12 mt-3">
                                <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal">Submit Entry</button>
                                <button type="button" class="btn btn-light" onClick={(v) => handleView(c.title)}>View result</button>
                            </div>
                        </div>
                    </div>

                    <div class="modal fade mt-5" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">{c.title}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <EntryForm comp_id={c.id} round_name={c.current_round}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div class="list-group">
                <Link to="/contender-register" className="list-group-item list-group-item-action p-3">
                    Contender Registration Form
                </Link>
                <Link to="/judge-register" className="list-group-item list-group-item-action p-3">
                    Judge Registration Form
                </Link>
                <Link to="/scoresheet" className="list-group-item list-group-item-action p-3">
                    Score Sheet
                </Link>
            </div>
            {/* <ContenderRegister/> */}
        </div>
    )
}
