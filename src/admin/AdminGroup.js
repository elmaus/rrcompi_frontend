import React, {useState} from 'react'
import WorkBench from './WorkBench';

export default function AdminGroup() {
    const [page, setPage] =  useState('add-member');
    

    const handleOnSelect = (e) => {
        setPage(e)
    }

    return (
        <div>
            <h3 className="title">Manage RR Group</h3>
            <select class="form-select" onClick={(e) => handleOnSelect(e.target.value)} aria-label="Default select example">
                <option selected value='add-member'>Add New Member</option>
                <option selected value='edit-member'>Edit Member</option>
            </select>

            <WorkBench value={page}/>
        </div>
    )
}
