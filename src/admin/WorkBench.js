import React from 'react'
import AddMember from './AddMember'
import CreateComp from './CreateComp'
import EditCompetition from './EditCompetition'
import EditMember from './EditMember'
import EditRound from './EditRound'

export default function WorkBench(props) {
    if (props.value == 'create-competition') {
        return <CreateComp/>
    } else if (props.value == 'edit-competition') {
        return <EditCompetition/>
    }else if (props.value == 'add-member') {
        return <AddMember/>
    } else if (props.value == 'edit-round') {
        return <EditRound/>
    }
    else if (props.value == 'edit-member') {
        return <EditMember/>
    }
    return (
        <div>
            <h1>Empty</h1>
        </div>
    )
}
