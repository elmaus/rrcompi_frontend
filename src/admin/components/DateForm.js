// import { MinimizeOutlined } from '@material-ui/icons'
import React, {useState, useEffect} from 'react'
// import from '..../calendar'


const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const dates = []
for (let i=1; i<=31; i++) dates.push(i);

const calendar = {monthList, dates};

export default function DateForm(props) {
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
    const [hour, setHour] = useState('');
    const [min, setMin] = useState('');
    const [sec, setSec] = useState('');
    const [datetime , setDatetime] = useState('');

    const handleChange = () => {
        props.value.setdeadline({
            month:month,
            day:day,
            year:year,
            hour:hour,
            min:min,
            sec:sec
        })
    }

    useEffect(handleChange)

    return (
        <>
            <div className="form-row">
                <label>{props.value.label}</label>
                <div className="row mb-3">
                    <div className="col-4">
                        <select onSelect={(e) => setMonth(e.target.value)} class="form-select" aria-label="Default select example">
                            {monthList.map((m) => <option value={m}>{m}</option>)}
                        </select>
                    </div>
                    <div className="col-4">
                        <select onSelect={(e) => setDay(e.target.value)} class="form-select" aria-label="Default select example">
                            {dates.map((d) => <option value={d}>{d}</option>)}
                        </select>
                    </div>
                    <div className="col-4">
                        <input type="text" onSelect={(e) => setYear(e.target.value)} className="form-control col-4" placeholder='yyyy'/>
                    </div>
                </div>
            </div>
            <div className="form-row">
                <label></label>
                <div className="row mb-3">
                    <div className="col-4">
                        <input type="text" onSelect={(e) => setHour(e.target.value)} className="form-control col-4" placeholder='hh'/>
                    </div>
                    <div className="col-4">
                        <input type="text" onSelect={(e) => setMin(e.target.value)} className="form-control col-4" placeholder='mm'/>   
                    </div>
                    <div className="col-4">
                        <input type="text" onSelect={(e) => setSec(e.target.value)} className="form-control col-4" placeholder='ss'/>
                    </div>
                </div>
            </div>
        </>
    )
}
