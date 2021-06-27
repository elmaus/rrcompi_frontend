import React, {useEffect, useState, useRef} from 'react';
import contenders from './data';

export default function ScoreSheet() {
    const conts = [...contenders];
    const [index, setIndex] = useState(0);
    const [contender, setContender] = useState(contenders[0]);
    const [grades, setGrades] = useState(contenders[0].criteria.map((s) => s.score));
    const [scores, setScores] = useState([]);
    const [total, setTotal] = useState(0);
    const [isSave, setIsSave] = useState(false);
    const [message, setMessage] = useState('');
    const comment = useRef()

    useEffect(() => {
        let indx = index;
        if (indx > contenders.length - 1) {
            indx = 0;
        } else if (indx < 0) {
            indx = contenders.length - 1;
        }

        let gradelist = [...contenders[indx].criteria.map((s) => s.score)];
        let percentlist = [...contenders[indx].criteria.map((c) => c.percentage)];
        
        let scorelist = [];
        for (let i=0; i<percentlist.length; i++) {
            let s = parseFloat(gradelist[i]) * parseFloat(percentlist[i] / 100);
            scorelist.push(s.toFixed(2));
        }

        let t = 0;
        for (let i=0; i<scorelist.length; i++) t += parseFloat(scorelist[i]);

        setTotal(t)
        setGrades([...gradelist]);
        setScores([...scorelist]);
        setIndex(indx);
        setIsSave(false)

    }, [index])


    const calculate = (e) => {
        let gradelist = [...grades];
        gradelist[e.id] = e.value;
        setGrades([...gradelist])

        let percentlist = [...contenders[index].criteria.map((c) => c.percentage)];
        
        let scorelist = [];
        for (let i=0; i<percentlist.length; i++) {
            let s = parseFloat(gradelist[i]) * parseFloat(percentlist[i] / 100)
            scorelist.push(s.toFixed(2));
        }
        
        let t = 0;
        for (let i=0; i<scorelist.length; i++) t += parseFloat(scorelist[i]);
        setTotal(t);

        setScores([...scorelist])
    }

    const handleSubmit = () => {
        const data = new FormData();
        for (let i=0; i<grades.length; i++) {
            data.append(contenders[index].criteria[i].name, grades[i]);     
            // console.log({criteria:contenders[index].criteria[i].name, score:grades[i]})
        }
        data.append("judge", "judge's name")
        data.append('comment', comment.current.value)
        
        fetch('http://127.0.0.1:5000/save-score', {
            method: 'POST',
            body:data
        })
        .then(response => response.json())
        .then(res => setMessage(res.response));
        setIsSave(true)
    }
    
    return (
        <>
            <div class="btn-group pt-4 pb-3 col-12">
                <button class="btn btn-outline-primary col-6" onClick={() => setIndex(index - 1)}><i class="fas fa-chevron-left mx-3"></i>   Previous</button>
                <button class="btn btn-outline-primary col-6" onClick={() => setIndex(index + 1)}>Next   <i class="fas fa-chevron-right mx-3"></i></button>
            </div>
            <div className="border p-4">
                <h3>{index + 1}. {contender.name}</h3>
            </div>
            <iframe frameborder="0" width="100%" height="125" src={contender.link + "/frame"}></iframe>
            <a class="btn btn-light col-12" href={contender.link} role="button">Open on Smule</a>

            
                <table class="table">
                    <thead>
                        <tr className="row col-12">
                            <th className="col-8" colspan="2" scope="col">Criteria</th>
                            <th className="col-2 text-center" scope="col">Grade</th>
                            <th className="col-2 text-center" scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contender.criteria.map((c) => 
                        <tr className="row col-12">
                            <th className="col-6" scope="row">{c.name}</th>
                            <td className="col-2 text-center"><input className="form-control border-0 px-0" value={c.percentage + " %"}/></td>
                            <td className="col-2 text-center"><input type="number" min="75" max="100" name={c.name} id={c.id} onChange={(e) => calculate(e.target)} className="form-control px-0 text-center" value={grades[c.id]}/></td>
                            <td className="col-2 text-center"><input className="form-control border-0 px-0" value={scores[c.id]}/></td>
                        </tr>
                        )}
                        <tr className="row col-12">
                            <th className="col-6" scope='row'>Total</th>
                            <td className="col-2 text-center"></td>
                            <td className="col-2 text-center"></td>
                            <td className="col-2 text-center">{total}</td>
                        </tr>
                    </tbody>
                </table>
                <labe className="form-label mb-2">Comment</labe>
                <textarea className="form-control mb-3" ref={comment}></textarea>
                {(isSave) ? <p className="text-center">{message}</p> : <></>}
                <button onClick={() => handleSubmit()} className="btn btn-info col-12 my-1">Save</button>

            <div class="btn-group pt-4 pb-3 col-12">
                <button class="btn btn-outline-primary col-6" onClick={() => setIndex(index - 1)}><i class="fas fa-chevron-left mx-3"></i>   Previous</button>
                <button class="btn btn-outline-primary col-6" onClick={() => setIndex(index + 1)}>Next   <i class="fas fa-chevron-right mx-3"></i></button>
            </div>
        </>
    )
}
