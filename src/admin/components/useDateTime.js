import React,{useCallback, useState} from 'react';

export default function useDateTime() {

    const [dateTime, setDateTime] = useState({
        month:'',
        day:'',
        year:'',
        hour:'',
        min:'',
        sec:''
    });

    const updateDateTime = ({month, day, year, hour, min, sec}) => {
        setDateTime({
            month:month,
            day:day,
            year:year,
            hour:hour,
            min:min,
            sec:sec
        })
    }

    useCallback(updateDateTime, [dateTime])

    return [dateTime, updateDateTime]
}
