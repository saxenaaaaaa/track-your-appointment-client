import React from 'react';
import './PatientSeenStatusGrid.css';

interface PatientSeenStatusGridProps {
    patientSeenStatusList: {
        id: number;
        status: boolean
    }[];
}

export default function PatientSeenStatusGrid({patientSeenStatusList}: PatientSeenStatusGridProps): React.JSX.Element {
    
    const patientSeenStatusItems = patientSeenStatusList.map(patientSeenStatus => {
        if(patientSeenStatus.status === true) {        
            // todo: refractor to set background-color conditionally instead of creating whole div conditionally
            return (
                <div className="flex-item-green" key={patientSeenStatus.id}>{patientSeenStatus.id}</div> 
            );
        }
        return (
            <div className="flex-item" key={patientSeenStatus.id}>{patientSeenStatus.id}</div>
        );
    });

    return (
        <div className='flex-container'>
            {patientSeenStatusItems}
        </div>
    )
}