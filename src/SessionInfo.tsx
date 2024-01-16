import React from 'react';
import PatientSeenStatusGrid from './patient-seen-status-grid/PatientSeenStatusGrid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

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

export default function SessionInfo({ patientSeenStatusList, startTime, currentStatus }: SessionInfoProps): React.JSX.Element {

    let showStatus;
    if(currentStatus == SessionCurrentStatus.ENDED) {
        showStatus = (<Typography gutterBottom variant="h6" component="div" color={'yellow'}>
            Aaj ke liye doctor uth chuke hain. Dhanyawaad!
        </Typography>)
    }
    else {
        showStatus = (<Typography gutterBottom variant="h6" component="div">
            Status: {currentStatus}
        </Typography>)
    }
    return (
        <Card variant="outlined" sx={{ width: 1, backgroundColor: 'black', color: 'white', borderRadius: 0 }}>
            <Box sx={{ px: 1 }}>
                <Stack direction="column">
                    <Typography gutterBottom variant="h6" component="div">
                        Starts at: {startTime}
                    </Typography>
                    {showStatus}
                </Stack>
            </Box>
            <Divider light />
            {(currentStatus != SessionCurrentStatus.ENDED) ? (<PatientSeenStatusGrid patientSeenStatusList={patientSeenStatusList} />) : null}
        </Card>
    );
}