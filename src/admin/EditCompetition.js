import React, {useRef, useEffect, useState, useMemo} from 'react'
import baseUrl from '../basedata';
import calendar from '../calendar';

export default function EditCompetition() {
    const [allComp, setAllComp] = useState([]);
    const [selectedComp, setSelectedComp] = useState('1')
    const [comp, setComp] = useState({});
    const [criteria, setCriteria] = useState([]);
    const [judges, setJudges] = useState([]);
    const [allJudges, setAllJudges] = useState([]);
    const [contenders, setContenders] = useState([]);
    const [allContenders, setAllContenders] = useState([]);
    const [message, setMessage] = useState('');
    const [isSave, setIsSave] = useState('');
    const [update, setUpdate] = useState(0);

    const selectedJudge = useRef();
    const selectedContender = useRef();

    const title = useRef();
    const subtitle = useRef();
    const image = useRef();
    const isActive = useRef();
    const limit = useRef();
    
    const constraint = useRef();
    const constraintValue = useRef();
    const mechanics = useRef("")

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


    useEffect(() => {fetch(baseUrl + '/get-all-competition', {
        method:'GET'
    })
    .then(response => response.json())
    .then(res => setAllComp(res.response))}, []);

    useEffect(() => {
        try {
            fetch(baseUrl + '/edit-competition/' + selectedComp, {
                method:'GET'
            })
            .then(response => response.json())
            .then(res => {
                setComp(res.response);
                setCriteria(res.response.criterias);
                // console.log(res.response);
                setJudges(res.response.judges);
                setAllJudges(res.response.alljudges);
                setAllContenders(res.response.allContenders);
                setContenders(res.response.contenders)
            });
        } catch (err) {
            console.log(err)
        }
        
    }, [selectedComp]);

    useEffect(() => {
        if (comp) {
            title.current.value = comp.title
            subtitle.current.value = comp.subtitle;
            isActive.current.value = comp.isActive;
            limit.current.value = comp.limit;
            
            constraint.current.value = comp.constraint;
            constraintValue.current.value = comp.constraintValue;
            mechanics.current.value = comp.mechanics;
            
            d_month.current.value = comp.d_month;
            d_day.current.value = comp.d_day;
            d_year.current.value = comp.d_year;
            d_hour.current.value = comp.d_hour;
            d_phase.current.value = comp.d_phase;

            a_month.current.value = comp.a_month;
            a_day.current.value = comp.a_day;
            a_year.current.value = comp.a_year
            a_hour.current.value = comp.a_hour;
            a_phase.current.value = comp.a_phase;
        }
        
    }, [comp])

    const handleSubmit = (e) => {        
        e.preventDefault();
        setMessage('');
        const data = new FormData();
        data.append('comp-id', selectedComp);
        data.append('title', title.current.value);
        data.append('file', image.current.files[0]);
        data.append('subtitle', subtitle.current.value);
        data.append('isActive', isActive.current.value);
        data.append('limit', limit.current.value);
        data.append('constraint', constraint.current.value);
        data.append('constraint-value', constraintValue.current.value)
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
            let c = criteria[i].name;
            let p = criteria[i].per;
            let cp = c + "@" + p + "#";
            allCriteria += cp;
        }
        data.append('criteria', allCriteria);

        let allSelectedJudges = '';
        for (let i=0; i<judges.length; i++) {
            let name = judges[i] + "@";
            allSelectedJudges += name
        }
        data.append('judges', allSelectedJudges);

        let allContenderList = '';
        for (let i=0; i<allContenders.length; i++) {
            let contname = allContenders[i] + "@";
            allContenderList += contname
        }
        data.append('contenders', allContenderList);

        if (update > 1) {
            setMessage('updating...')
            fetch(baseUrl + '/update-competition', {
                method:'POST',
                body:data
            })
            .then(response => response.json())
            .then(res => setMessage(res.response));
        }
        setUpdate(1)
    }

    const addCriteria = () => {
        let critlist = [...criteria];
    
        critlist.push({
            name:crit.current.value,
            per:per.current.value
        });
        setCriteria([...critlist]);
        crit.current.value = '';
        per.current.value = '';
    }

    const deleteCriteria = name => {
        let newCriteria = [];
        for (let i=0; i<criteria.length; i++) {
            if (criteria[i].name != name) {
                newCriteria.push(criteria[i])
            } 
        }
        setCriteria([...newCriteria])
    }

    const deleteJudge = name => {
        let newJudges = [];
        for (let i=0; i<judges.length; i++) {
            if (judges[i] != name.j) {
                newJudges.push(judges[i])
            }
        }
        setJudges([...newJudges])
    }

    const addJudge = () => {
        let judgelist = [...judges];
        let hasJudge = judgelist.includes(selectedJudge.current.value);
        let holder = 'no';
        (hasJudge) ? holder = 'yes' : judgelist.push(selectedJudge.current.value);
        setJudges([...judgelist])
    }

    const deleteContender = name => {
        let newContenders = [];
        for (let i=0; i<contenders; i++) {
            if (contenders[i] != name.con) {
                newContenders.push(contenders[i])
            }
        }
        setContenders([...newContenders])
    }

    const addContender = () => {
        let contenderList = [...contenders];
        let hasContender = contenderList.include(selectedContender.current.value);
        let holder = 'no';
        (hasContender) ? holder = 'yes' : contenderList.push(selectedContender.current.value);
        setContenders([...contenderList])
    }

    return (
        <div>
            <h3 className="title">Edit Competition</h3>
            <select class="form-select mb-5" onClick={(e) => setSelectedComp(e.target.value)} aria-label="Default select example">
                {allComp.map((c) => 
                    <option value={c.id}>{c.title}</option>
                )}
            </select>
            {(comp) ? 
                <form onSubmit={handleSubmit} enctype="multipart/from-data">
                    <img src={baseUrl + comp.image} className='w-100'/> 
                    <div className="mb-3">
                        <label className="form-label">Photo</label>
                        <input type="file" ref={image} className="form-control"/>
                    </div>
                    <div className='mb-3 g-1 row'>
                        <div className='col-2'>
                            <select className='form-select' ref={isActive} aria-label="Default select example">
                                <option disabled value={isActive.current.value}>{isActive.current.value}</option>
                                <option value='Open'>Open</option>
                                <option value='Closed'>Closed</option>
                            </select>
                        </div>
                        <div className="col-4">
                            <label className='form-label text-right'>Contender Limit</label>
                        </div>
                        <div className='col-2'>
                            <input type='number' ref={limit} className='form-control'/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Title</label>    
                        <input type="text" ref={title} className="form-control mb-3"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Subtitle</label>    
                        <input type="text" ref={subtitle} className="form-control mb-3"/>
                    </div>
                    
                    <fieldset className="mb-2">
                        <legend>Deadline of Submission</legend>
                        <div className="row g-2">
                            <div className="col-6">
                                <select class="form-select" ref={d_month} aria-label="Default select example">
                                    <option disabled value={d_month.current.value}>{d_month.current.value}</option>
                                    {calendar.month.map((m) => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>
                            <div className="col-2">
                                <select class="form-select" ref={d_day} aria-label="Default select example">
                                    <option disabled value={d_day.current.value}>{d_day.current.value}</option>
                                    {calendar.dates.map((d) => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div className="col-4">
                                <input type="text" ref={d_year} className="form-control col-4" placeholder='yyyy'/>
                            </div>
                        </div>
                    </fieldset>
                    <div className="mb-3">
                        <div className="row g-2">
                            <div className="col-8">
                                <select class="form-select" ref={d_hour}>
                                    <option disabled value={d_hour.current.value}>{d_hour.current.value}</option>
                                    {calendar.hours.map((h) => <option key={h} value={h}>{h}</option>)}
                                </select>
                            </div>
                            <div className="col-4">
                                <select class="form-select" ref={d_phase}>
                                    <otion disabled value={d_phase.current.value}>{d_phase.current.value}</otion>
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </select>
                            </div>                        
                        </div>
                    </div>
                    <fieldset className="mb-2">
                        <legend>Result Release Date</legend>
                        <div className="row g-2">
                            <div className="col-6">
                                <select class="form-select" ref={a_month} aria-label="Default select example">
                                    <option disabled value={a_month.current.value}>{a_month.current.value}</option>
                                    {calendar.month.map((m) => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>
                            <div className="col-2">
                                <select class="form-select" ref={a_day} aria-label="Default select example">
                                    <option disabled value={a_day.current.value}>{a_day.current.value}</option>
                                    {calendar.dates.map((d) => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div className="col-4">
                                <input type="text" ref={a_year} className="form-control col-4" placeholder='yyyy'/>
                            </div>
                        </div>
                    </fieldset>
                    <div className="mb-3">
                        <div className="row g-2">
                            <div className="col-8">
                                <select class="form-select" ref={a_hour}>
                                    <otion disabled value={a_hour.current.value}>{a_hour.current.value}</otion>
                                    {calendar.hours.map((h) => <option key={h} value={h}>{h}</option>)}
                                </select>
                            </div>
                            <div className="col-4">
                                <select class="form-select" ref={a_phase}>
                                    <option disabled value={a_phase.current.value}>{a_phase.current.value}</option>
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <fieldset className="mb-3">
                        <legend>Criteria</legend>
                            {criteria.map((c) => 
                                <div className="row col-12 g-1 mb-1" key={c.id}>
                                    <div className="col-8">
                                        {c.name}
                                    </div>
                                    <div className="col-2">
                                        {c.per} %
                                    </div>
                                    <div className="col-2">
                                        <button className='btn btn-danger col-12' onClick={(name) => deleteCriteria(c.name)}>Del</button>
                                    </div>
                                </div>
                            )}
                        <div className="row col-12 g-1 mt-2">
                            <div className="col-8">
                                <input className="form-control" ref={crit} placeholder="title"/>
                            </div>
                            <div className="col-2">
                                <input className='form-control' ref={per} placeholder='percent'/>
                            </div>
                            <div className="col-2">
                                <button className='btn btn-primary col-12' onClick={addCriteria}>Add</button>
                            </div>
                        </div> 
                    </fieldset>
                    <div className="row col-12 g-1 mb-3">
                        <div className='col-10'>
                            <select class="form-select mb-5" ref={constraint} aria-label="Default select example">
                                <option disabled value={comp.constraint}>{comp.constraint}</option>
                                <option value='Top Rank'>Top Rank</option>
                                <option value='Passing Grade'>Passing Grade</option>
                            </select>
                        </div>
                        <div className='col-2'>
                            <input type='text' ref={constraintValue} className='form-control'/>
                        </div>
                    </div>
                    <fieldset class="mb-3">
                        <legend for="exampleFormControlTextarea1" className="form-label">Mechanics</legend>
                        <textarea class="form-control" ref={mechanics} id="exampleFormControlTextarea1" rows="3"></textarea>
                    </fieldset>
                    <fieldset className='mb-3'>
                        <legend>Judges</legend>
                        {judges.map((j) => 
                            <div className='row col-12 g-2 mb-2'>
                                <div className="col-10">
                                    {j}
                                </div>
                                <div className='col-2'>
                                    <button className='btn btn-danger col-12' onClick={(name) => deleteJudge({j})}>Del</button>
                                </div>
                            </div>
                        )}
                        <div className='row col-12 g-2 mt-1 mb-3'>
                            <div className='col-10'>
                                <select class="form-select mb-3" ref={selectedJudge} aria-label="Default select example">
                                    {allJudges.map((j) => 
                                        <option value={j}>{j}</option>
                                    )}
                                </select>
                            </div>
                            <div className="col-2">
                                <button className='btn btn-primary col-12' onClick={addJudge}>Add</button>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className='mb-3'>
                        <legend>Contenders</legend>
                        {contenders.map((con) =>
                            <div className='row col-12 g-2 mb-2'>
                                <div className="col-10">
                                    {con}
                                </div>
                                <div className='col-2'>
                                    <button className='btn btn-danger col-12' onClick={(name) => deleteContender({con})}>Delete</button>
                                </div>
                            </div>
                        )}
                        <div className='row col-12 g-2 mt-1 mb-3'>
                            <div className='col-10'>
                                <select class="form-select mb-3" ref={selectedContender} aria-label="Default select example">
                                    {allContenders.map((con) => 
                                        <option value={con}>{con}</option>
                                    )}
                                </select>
                            </div>
                            <div className="col-2">
                                <button className='btn btn-primary col-12' onClick={addContender}>Add</button>
                            </div>
                        </div>
                    </fieldset>
                    <p className>{message}</p>
                    <button className="btn btn-dark col-12" type="submit" onClick={() => setUpdate(update + 1)}><i class="fas fa-save"></i> Update</button>
                </form> : <></>
            }
        </div>
    )
}
