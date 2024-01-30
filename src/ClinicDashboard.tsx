import React, { useEffect, useState } from 'react';
import ClinicInfo, { isClinicOpenToday } from './ClinicInfo';
import SessionInfo, { SessionCurrentStatus } from './SessionInfo';
import { serverUrl } from './App';
import { useLocation, useParams } from 'react-router-dom';

export interface ClinicData {
  patientSeenStatusList: {
    id: number,
    status: boolean
  }[],
  doctorName: string
  schedule: string
  currentStatus: SessionCurrentStatus
}

function initializeClinicData(doctorName: string) {
  const clinicData: ClinicData = {
    patientSeenStatusList: new Array<{ id: number, status: boolean }>(),
    doctorName: doctorName,
    schedule: "",
    currentStatus: SessionCurrentStatus.NOT_STARTED
  }
  for (let i = 0; i < 200; i++) {
    clinicData.patientSeenStatusList.push({ id: i + 1, status: false });
  }
  return clinicData;
}

export default function ClinicDashboard(): React.JSX.Element {
  
  // const {state} = useLocation();
  // console.log("state received - ", state);
  // const doctorName = state.name;
  console.log("Inside clinic dashboard ")
  const { trackingId } = useParams() as any;
  const doctorName = trackingId;
  const [clinicData, setClinicData] = useState<ClinicData>(initializeClinicData(doctorName));
  
  useEffect(() => {
    
    const resourceUrl = `${serverUrl}/clinicData?doctorName=${doctorName}`;
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
  },[doctorName]);
  
  return (
    <div>
      <ClinicInfo doctorName={clinicData.doctorName}/>
      {isClinicOpenToday() && (<SessionInfo patientSeenStatusList={clinicData.patientSeenStatusList} schedule={clinicData.schedule} currentStatus={clinicData.currentStatus}/>)}
    </div>
  );
}