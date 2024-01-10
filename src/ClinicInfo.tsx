import React from 'react';

type ClinicInfoProps = {
    doctorName: string
}

export function isClinicOpenToday() {
    return (new Date().getDay() !== 0);
}

export default function ClinicInfo({doctorName}: ClinicInfoProps): React.JSX.Element {
    
    const now = new Date();
    const date = now.toLocaleDateString("en-IN");
    let dateLabel = (<span>{date}</span>);
    if(!isClinicOpenToday()) { // todo: this should come from the server
        dateLabel = (<span>As it is Sunday, the clinic is closed today</span>)
    }
    return (
        <div>
            <div>Welcome to Dr. {doctorName}'s clinic</div>
            <div>{dateLabel}</div>
        </div>
    );
}

