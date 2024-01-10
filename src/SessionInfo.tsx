import React from 'react';
import PatientSeenStatusGrid from './patient-seen-status-grid/PatientSeenStatusGrid';


export enum SessionCurrentStatus {
    NOT_STARTED = "Not Started",
    ONGOING = "On Going",
    ENDED = "Ended"
}

export interface SessionInfoProps {
    patientSeenStatusList: {
        id: number,
        status: boolean
    }[],
    startTime: string
    currentStatus: SessionCurrentStatus
}

export default function SessionInfo({patientSeenStatusList, startTime, currentStatus}: SessionInfoProps): React.JSX.Element {
    
    return (
        <div>
            <div>Starts at: {startTime}</div>
            <div>Status: {currentStatus}</div>
            <PatientSeenStatusGrid patientSeenStatusList={patientSeenStatusList} />
        </div>
    );
}