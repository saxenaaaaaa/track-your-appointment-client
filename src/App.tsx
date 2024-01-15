import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import ClinicInfo, { isClinicOpenToday } from './ClinicInfo';
import SessionInfo, { SessionCurrentStatus } from './SessionInfo';

const SERVER_URI = "www.digitracker.org"
const serverUrl = `http://${SERVER_URI}:8000` // use ifconfig to check your public ip on the wifi network you are connected to. Your app should hit you at that ip

export interface ClinicData {
  patientSeenStatusList: {
    id: number,
    status: boolean
  }[],
  doctorName: string
  startTime: string
  currentStatus: SessionCurrentStatus
}

function initializeClinicData() {
  const clinicData: ClinicData = {
    patientSeenStatusList: new Array<{ id: number, status: boolean }>(),
    doctorName: "",
    startTime: "",
    currentStatus: SessionCurrentStatus.NOT_STARTED
  }
  for (let i = 0; i < 200; i++) {
    clinicData.patientSeenStatusList.push({ id: i + 1, status: false });
  }
  return clinicData;
}

function App() {
  
  const [clinicData, setClinicData] = useState<ClinicData>(initializeClinicData);
  // const [connection, setConnection] = useState<EventSource | null>(null);
  
  useEffect(() => {
    
    const resourceUrl = `${serverUrl}/clinicData/`;
    console.log("Resource url is ", resourceUrl);
    let connection: EventSource;
    
    const initializeConnection = () => {
      connection = new EventSource(resourceUrl);
      connection.addEventListener("message", (event) => {
        console.log("Received event data");
        const nextClinicData = JSON.parse(event.data);
        setClinicData(nextClinicData);
      })

      connection.addEventListener("error", (error) => {
        console.error("Error in server connection", error);
        connection.close();
        console.log("Connection closed. Attempting reconnect in a second.");
        setTimeout(initializeConnection,1000);
      });

      // setConnection(connection);
    };

    initializeConnection();
    console.log("Initialized connection with server");

    return () => {
      console.log("Component unmounting. Cleaning up connection with server.");
      if (connection) {
        connection.close();
      }
    };
  },[]);
  
  return (
    <div>
      <ClinicInfo doctorName={clinicData.doctorName}/>
      {isClinicOpenToday() && (<SessionInfo patientSeenStatusList={clinicData.patientSeenStatusList} startTime={clinicData.startTime} currentStatus={clinicData.currentStatus}/>)}
    </div>
  );
}

export default App;
