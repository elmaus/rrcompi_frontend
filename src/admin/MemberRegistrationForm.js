import React, {useRef} from 'react';
import calendar from '../calendar'

export default function MemberRegistrationForm() {
    const name = useRef()
    const location = useRef()
    const genre = useRef()
    const month = useRef()
    const day = useRef()
    const year = useRef()
    const image = useRef()

    return (
        <>
            <h3 className='title'>Registration Form</h3>
            <form>
                <div className="row mb-3">
                    <label className="form-label">Name</label>
                    <input className="form-control" ref={name}/>
                </div>
                <div className="row mb-3">
                    <label className="form-label">Location</label>
                    <input className="form-control" ref={location}/>
                </div>
                <div className="row mb-3">
                    <label className="form-label">Favorite Genre</label>
                    <input className="form-control" ref={genre}/>
                </div>
                <div className="row mb-3">
                    <label className="form-label"></label>Birthday
                    <div className="row g-2">
                        <div className="col-6">
                            <select class="form-select" ref={month} aria-label="Default select example">
                                {calendar.month.map((m) => <option value={m}>{m}</option>)}
                            </select>
                        </div>
                        <div className="col-2">
                            <select class="form-select" ref={day} aria-label="Default select example">
                                {calendar.dates.map((d) => <option value={d}>{d}</option>)}
                            </select>
                        </div>
                        <div className="col-4">
                            <input type="text" ref={year} className="form-control col-4" placeholder='yyyy'/>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="form-label">Photo</label>
                    <input type="file" ref={image} className="form-control"/>
                </div>
                <button className="btn btn-outline-dark col-12" type="submit">Register</button>
            </form>
        </>
    )
}
