import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type ClinicInfoProps = {
    doctorName: string
}

export function isClinicOpenToday() {
    return true;//(new Date().getDay() !== 0);
}

export default function ClinicInfo({doctorName}: ClinicInfoProps): React.JSX.Element {
    
    const now = new Date();
    const date = now.toLocaleDateString("en-IN");
    return (
        <Card variant="outlined" sx={{ width: 1, bgcolor: 'black', color: 'white', borderRadius: 0 }}>
          <Box sx={{ pt: 1, px:1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography gutterBottom variant="h5" component="div">
                Dr. {doctorName}'s clinic
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {date}
              </Typography>
            </Stack>
            {/* todo: this should come from the server */}
            {!isClinicOpenToday() && (<Typography color="white" variant="body2"> 
                The clinic is closed today.
            </Typography>)}
          </Box>
        </Card>
    );
}

