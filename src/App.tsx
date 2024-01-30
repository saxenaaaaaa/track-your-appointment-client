import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { AppBar, Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useLoaderData, useNavigate } from 'react-router-dom';

const SERVER_URI = "www.digitracker.org"
export const serverUrl = `https://${SERVER_URI}:8000` // use ifconfig to check your public ip on the wifi network you are connected to. Your app should hit you at that ip
// const SERVER_URI = "192.168.1.5"
// export const serverUrl = `http://${SERVER_URI}:8000`;

function AppHeader(): React.JSX.Element {
  return (
    <AppBar position="static">
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, bgcolor: 'black', color: 'white', justifyContent: 'center', textAlign: 'center' }}>
        Digi Tracker
      </Typography>
    </AppBar>
  )
}

export interface SelectDoctorFormProps {
  doctorsList: any[],
}

// todo: make it beautiful
function SelectDoctorForm({ doctorsList }: SelectDoctorFormProps): React.JSX.Element {

  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const doctorsListMenuItems = doctorsList.map((doctorsListItem: any) => {
    return <MenuItem value={doctorsListItem} key={doctorsListItem.name}>{doctorsListItem.name}</MenuItem>
  });

  const navigate = useNavigate();

  return (
    <Box component='div' sx={{display: 'flex', width: 1, height: '80vh', justifyContent: 'center', alignItems: 'center' }}>
      <FormControl sx={{width: '40vh'}}>
        <InputLabel id="select-doctor-label">Select Doctor</InputLabel>
        <Select
          labelId="select-doctor-label"
          id="select-docter"
          value={selectedDoctor ?? ''}
          label="Select Doctor"
          name="doctorName"
          onChange={(e: SelectChangeEvent<any>) => setSelectedDoctor(e.target.value)}
        >
          {doctorsListMenuItems}
        </Select>
        <Button
          sx={{marginTop: 1}}
          variant="contained"
          onClick={() => {
            if (selectedDoctor) {
              // The following navigate would work even if we do not pass the state in the second argument
              // because we are using only path param trackingId inside the clinicDashboard component.
              // the state object needs to passed when we need to pass more data across components.
              navigate(`/track/${selectedDoctor.name}`, { state: selectedDoctor });
            }
            else {
              alert("Please select a doctor");
            }
          }}
        >
          Submit
        </Button>
      </FormControl>
      </Box>
  );
}

function App() {

  const { doctorsList } = useLoaderData() as any;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppHeader />
      <SelectDoctorForm doctorsList={doctorsList}/>
    </Box>
  );
}

export const doctorsListLoader = async () => {
  try {
    const resourceUrl = `${serverUrl}/clinicData`
    return fetch(`${resourceUrl}/getDoctorsList`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    });
  } catch (error) {
    console.error("There was an error getting doctor's list from the server");
    throw error;
  }
}

export default App;
