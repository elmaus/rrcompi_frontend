import React, {useState, useRef, useEffect} from 'react';
import calendar from '../calendar';
import baseUrl from '../basedata';

export default function CreateComp() {
    const [message, setMessage] = useState('');
    const [isSave, setIsSave] = useState('');

    const comp_id = useRef('');
    const title = useRef('');
    const subtitle = useRef('');
    const image = useRef('');
    const mechanics = useRef("");
    const constraint = useRef();
    const constraintValue = useRef();

    const [criteria, setCriteria] = useState([]);
    const crit = useRef('');
    const per = useRef('');
    
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('comp-id', comp_id.current.value);
        data.append('title', title.current.value);
        data.append('file', image.current.files[0]);
        data.append('subtitle', subtitle.current.value);
        data.append('constraint', constraint.current.value);
        data.append('constraintValue', constraintValue.current.value)
        data.append('d-month', d_month.current.value);
        data.append('d-day', d_day.current.value);
        data.append('d-year', d_year.current.value);
        data.append('d-hour', d_hour.current.value);
        data.append('d-phase', d_phase.current.value);
        data.append('a-month', a_month.current.value);
        data.append('a-day', a_day.current.value);
        data.append('a-year', a_year.current.value);
        data.append('a-hour', a_hour.current.value);
        data.append('a-phase', a_phase.current.value);
        data.append('mechanics', mechanics.current.value);

        let allCriteria = '';

        for (let i=0; i<criteria.length; i++) {
            let c = criteria[i].ct;
            let p = criteria[i].pr;
            let cp = c + "@" + p + "#";
            allCriteria += cp;
        }

        data.append('criteria', allCriteria);

    if (mechanics.current.value != '' && title.current.value != '' && subtitle.current.value != '' && criteria.length != 0) {
            setMessage('Saving..')

            fetch(baseUrl + '/add-competition', {
                method:'POST',
                body:data
            })
            .then(response => response.json())
            .then(res => {
                setMessage(res.response);
                if (res.response == 'New Competition has been created') {
                    title.current.value = '';
                    subtitle.current.value = '';
                    image.current.value = '';
                    mechanics.current.value = '';
                    constraintValue.current.value = '';
                    
                    d_month.current.value = 'Jan';
                    d_day.current.value = '1';
                    d_year.current.value = '2021';
                    d_hour.current.value = '01:00';
                    d_phase.current.value = 'AM';

                    a_month.current.value = 'Jan';
                    a_day.current.value = '1';
                    a_year.current.value = '2021';
                    a_hour.current.value = '11:00';
                    a_phase.current.value = 'PM';
                }
            });
        } else {
            setMessage('Fill all the input field')
        }
    }
    

    const handleCriteria = () => {
        let critlist = [...criteria];
    
        critlist.push({
            ct:crit.current.value,
            pr:per.current.value
        });
        setCriteria([...critlist]);
        
        crit.current.value = '';
        per.current.value = '';
    }

    const deleteCriteria = name => {
        let newCriteria = [];
        for (let i=0; i<criteria.length; i++) {
            if (criteria[i].ct != name) {
                newCriteria.push(criteria[i])
            } 
        }
        setCriteria([...newCriteria])
    }

    return (
        <>
            <h3 className="title">Create Competition</h3>
            <form onSubmit={handleSubmit} enctype="multipart/from-data">
                <div className="mb-3">
                    <label className="form-label">Photo</label>
                    <input type="file" ref={image} className="form-control"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Title</label>    
                    <input type="text" ref={title} className="form-control mb-3"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Subtitle</label>    
                    <input type="text" ref={subtitle} className="form-control mb-3"/>
                </div>
                
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
                <div className="mb-3">
                    <div className="row g-2">
                        <div className="col-8">
                            <select class="form-select" ref={d_hour}>
                                {calendar.hours.map((h) => <option value={h}>{h}</option>)}
                            </select>
                        </div>
                        <div className="col-4">
                            <select class="form-select" ref={d_phase}>
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>                        
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
                <div className="mb-3">
                    <div className="row g-2">
                        <div className="col-8">
                            <select class="form-select" ref={a_hour}>
                                {calendar.hours.map((h) => <option value={h}>{h}</option>)}
                            </select>
                        </div>
                        <div className="col-4">
                            <select class="form-select" ref={a_phase}>
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Criteria</label>
                        {criteria.map((c) => 
                            <div className="row col-12 g-2">
                                <div className="col-6">
                                    {c.ct}
                                </div>
                                <div className="col-4">
                                    {c.pr} %
                                </div>
                                <div className='col-2'>
                                    <button className="btn btn-danger col-12" onClick={(name) => deleteCriteria(c.ct)}>Del</button>
                                </div>
                            </div>
                        )}
                    <div className="row col-12 g-1">
                        <div className="col-8">
                            <input className="form-control" ref={crit} placeholder="title"/>
                        </div>
                        <div className="col-2">
                            <input className='form-control' ref={per} placeholder='percent'/>
                        </div>
                        <div className="col-2">
                            <button className='btn btn-primary col-12' onClick={handleCriteria}>Add</button>
                        </div>
                    </div> 
                </div>
                <div className="row col-12 g-1 mb-3">
                    <div className='col-8'>
                        <select class="form-select mb-2" ref={constraint} aria-label="Default select example">
                            <option value='Top Rank'>Top Rank</option>
                            <option value='Passing Grade'>Passing Grade</option>
                        </select>
                    </div>
                    <div className='col-4'>
                        <input type='number' ref={constraintValue} className='form-control' placeholder='value'/>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Mechanics</label>
                    <textarea class="form-control" ref={mechanics} id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <p className>{message}</p>
                <button className="btn btn-dark col-12" type="submit"><i class="fas fa-save"></i> Create</button>
            </form>
        </>
    )
}
