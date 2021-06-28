import React, {useState, useRef, useEffect, useCallback} from 'react';
import calendar from '../calendar';
import baseUrl from '../basedata';

export default function CreateComp() {
    const [message, setMessage] = useState('');
    const [isSave, setIsSave] = useState('');

    const comp_id = useRef('');
    const title = useRef('');
    const subtitle = useRef('');
    const image = useRef('');
    const passingGrade = useRef('');
    const passingTop = useRef('')
    const mechanics = useRef("")

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
        data.append('passing-grade', passingGrade.current.value);
        data.append('passing-top', passingTop.current.value);
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
            fetch(baseUrl + '/add-competition', {
                method:'POST',
                body:data
            })
            .then(response => response.json())
            .then(res => setIsSave(res.response));

            setMessage('Saving..')
        } else {
            setMessage('Fill all the input field')
        }
    }
    
    useEffect(() => {
        if (message != "Saving...") {
            setMessage(isSave);
            title.current.value = '';
            subtitle.current.value = '';
            image.current.value = '';
            passingGrade.current.value = '';
            passingTop.current.value = '';
            mechanics.current.value = '';
            
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
    }, [isSave])

    const handleCriteria = () => {
        let critlist = [...criteria];
    
        critlist.push({
            ct:crit.current.value,
            pr:per.current.value
        });
        setCriteria([...critlist]);
        
        console.log(criteria)
        crit.current.value = '';
        per.current.value = '';
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
                            <div className="row col-12">
                                <div className="col-8">
                                    {c.ct}
                                </div>
                                <div className="col-4">
                                    {c.pr} %
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
                            <button className='btn btn-dark' onClick={handleCriteria}>Add</button>
                        </div>
                    </div> 
                </div>
                <div className="row col-12 g-1 mb-3">
                    <div className="col-6">
                        <label className="form-label">Passing Grade</label>
                    </div>
                    <div className='col-6'>
                        <input type="number" ref={passingGrade} className="form-control"/>
                    </div>
                    <div className="col-6">
                        <label className="form-label col-10">Passing Top</label>   
                    </div>
                    <div className='col-6'>
                        <input type="number" ref={passingTop} className="form-control col-2"/>
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
