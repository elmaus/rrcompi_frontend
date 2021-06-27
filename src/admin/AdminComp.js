import React, {useState, useEffect} from 'react'
import WorkBench from './WorkBench';

export default function AdminComp() {
    const [page, setPage] =  useState('create-competition');
    

    const handleOnSelect = (e) => {
        setPage(e)
    }
    
    return (
        <div>
            <h3 className="title">Manage Competition</h3>
            <select class="form-select" onClick={(e) => handleOnSelect(e.target.value)} aria-label="Default select example">
                <option selected value='create-competition'>Create Competition</option>
                <option value='edit-competition'>Edit Competition</option>
                <option value="edit-round">Edit Round</option>
            </select>

            <WorkBench value={page}/>
        </div>
    )
}

// <li><button className="btn btn-light col-12" onClick={() => setPage('create-competition')}>Create New Competition</button></li>
//                         <li><button className="btn btn-light col-12" onClick={() => setPage('create-competition')}>Edit Competition</button></li>
//                         <li><button className="btn btn-light col-12" onClick={() => setPage('add-round')}>Create Round</button></li>
//                         <li><button className="btn btn-light col-12" onClick={() => setPage('create-competition')}>Edit Round</button></li>
//                         <li><button className="btn btn-light col-12" onClick={() => setPage('create-competition')}>Grant Contender</button></li>
//                         <li><button className="btn btn-light col-12" onClick={() => setPage('create-competition')}>Evict Contender</button></li>
                        