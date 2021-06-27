import React, {useState, useRef} from 'react';
import calendar from '../calendar';

export default function EditRound() {
    const title = useRef('');
    const image = useRef('');
    
    const d_month = useRef('');
    const d_day = useRef('');
    const d_year = useRef('');
    const d_hour = useRef('');
    const d_phase = useRef('');

    const a_month = useRef('');
    const a_day = useRef('');
    const a_year = useRef('');
    const a_hour = useRef('');
    const a_phase = useRef('');

    
    return (
        <>
            <h3 className="title">Edit Round</h3>
            <form>
                
                <div className="col-12 mb-5">
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Competition</option>
                        <option value="1">RRVSS1</option>
                        <option value="2">RRVSS2</option>
                        <option value="3">RRVSS3</option>
                    </select>
                </div>

                <div className="col-12 mb-5">
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Round</option>
                        <option value="1">Title of the Round</option>
                        <option value="2">Another Title of the Round</option>
                        <option value="3">More Title of the Round</option>
                    </select>
                </div>
                    

                <div className="mb-5">
                    <label className="form-label">Photo</label>
                    <input type="file" ref={image} className="form-control"/>
                </div>
                <div className="mb-5">
                    <label className="form-label">Title</label>    
                    <input type="text" ref={title} className="form-control mb-3"/>
                </div>
                {/* <DateForm value={{label:"Deadline", deadline:deadline, setdeadline:(e) => setDeadline(e)}}/> */}
                {/* <DateFrom props={announcement}/> */}
                
                <div className="mb-2">
                    <label className="form-label">Deadline of Submittion</label>
                    <div className="row g-2">
                        <div className="col-6">
                            <select class="form-select" ref={d_month} aria-label="Default select example">
                                {calendar.month.map((m) => <option value={m}>{m}</option>)}
                            </select>
                        </div>
                        <div className="col-2">
                            <select class="form-select" ref={d_day} aria-label="Default select example">
                                {calendar.dates.map((d) => <option value={d}>{d}</option>)}
                            </select>
                        </div>
                        <div className="col-4">
                            <input type="text" ref={d_year} className="form-control col-4" placeholder='yyyy'/>
                        </div>
                    </div>
                </div>
                <div className="mb-5">
                    <div className="row g-2">
                        <div className="col-8">
                            {/* <input type="text"  className="form-control col-4" placeholder='hh'/> */}
                            <select class="form-select" ref={d_hour}>
                                {calendar.hours.map((h) => <option value="h">{h}</option>)}
                            </select>
                        </div>
                        <div className="col-4">
                            <select class="form-select" ref={d_phase}>
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                            {/* <input type="text" ref={d_min} className="form-control col-4" placeholder='mm'/>    */}
                        </div>
                        {/* <div className="col-4">
                            <input type="text" ref={d_sec} className="form-control col-4" placeholder='ss'/>
                        </div> */}
                    </div>
                </div>
                <div className="mb-2">
                    <label className="form-label">Result Release Date</label>
                    <div className="row g-2">
                        <div className="col-6">
                            <select class="form-select" ref={a_month} aria-label="Default select example">
                                {calendar.month.map((m) => <option value={m}>{m}</option>)}
                            </select>
                        </div>
                        <div className="col-2">
                            <select class="form-select" ref={a_day} aria-label="Default select example">
                                {calendar.dates.map((d) => <option value={d}>{d}</option>)}
                            </select>
                        </div>
                        <div className="col-4">
                            <input type="text" ref={a_year} className="form-control col-4" placeholder='yyyy'/>
                        </div>
                    </div>
                </div>
                <div className="mb-5">
                    <div className="row g-2">
                        <div className="col-8">
                            {/* <input type="text" ref={a_hour} className="form-control col-4" placeholder='hh'/> */}
                            <select class="form-select" ref={a_hour}>
                                {calendar.hours.map((h) => <option value="h">{h}</option>)}
                            </select>
                        </div>
                        <div className="col-4">
                            {/* <input type="text" ref={a_min} className="form-control col-4" placeholder='mm'/> */}
                            <select class="form-select" ref={a_phase}>
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>
                        {/* <div className="col-4">
                            <input type="text" ref={a_sec} className="form-control col-4" placeholder='ss'/>
                        </div> */}
                    </div>
                </div>
                <div class="mb-5">
                    <label for="exampleFormControlTextarea1" class="form-label">Mechanics</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                
                <button className="btn btn-outline-dark col-12" type="submit"><i class="fas fa-save"></i> Update</button>
            </form>
        </>
    )
}

