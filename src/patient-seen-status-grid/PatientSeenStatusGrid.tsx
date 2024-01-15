import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import React from 'react';
import { styled } from '@mui/material/styles';

const DemoPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
  color: 'white'
}));

interface PatientSeenStatusGridProps {
    patientSeenStatusList: {
        id: number;
        status: boolean
    }[];
}

export default function PatientSeenStatusGrid({ patientSeenStatusList }: PatientSeenStatusGridProps): React.JSX.Element {

    const patientSeenStatusItems = patientSeenStatusList.map(patientSeenStatus => {
        if (patientSeenStatus.status === true) {
            // todo: refractor to set background-color conditionally instead of creating whole div conditionally
            return (
                <DemoPaper variant="outlined" style={{backgroundColor: 'green'}} key={patientSeenStatus.id}>{patientSeenStatus.id}</DemoPaper>
            );
        }
        return (
            <DemoPaper variant="outlined" key={patientSeenStatus.id}>{patientSeenStatus.id}</DemoPaper>
        );
    });

    return (
        <Box 
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                width: 1,
                justifyContent: 'center',
                maxHeight: '75vh',
                overflow: 'auto',
                '& > :not(style)': {
                    m: 0,
                    width: 0.1,
                    height: 0.1,
                    bgcolor: 'black',
                    borderRadius: 0,
                    border: 1,
                    borderColor: 'white'

                },
            }}
        >
            {patientSeenStatusItems}
            
        </Box>
    )

}