import React, { useEffect, useState } from 'react';
import ClinicInfo, { isClinicOpenToday } from './ClinicInfo';
import SessionInfo, { SessionCurrentStatus } from './SessionInfo';
import { DoctorDataDTO, serverUrl } from './App';
import { useLoaderData } from 'react-router-dom';
import { getTodaysDate } from './util';
import ErrorPage from './ErrorPage';

export interface ClinicData { // todo: Rename this and all its instances to SessionData & sessionData respectively
  patientSeenStatusList: {
    id: number,
    status: boolean
  }[],
  currentStatus: SessionCurrentStatus,
  date: string,
  doctorId: string
}

function initializeClinicData(doctorId: string = '') {
  const clinicData: ClinicData = {
    patientSeenStatusList: new Array<{ id: number, status: boolean }>(),
    currentStatus: SessionCurrentStatus.NOT_STARTED,
    date: getTodaysDate(),
    doctorId: doctorId
  }
  for (let i = 0; i < 200; i++) {
    clinicData.patientSeenStatusList.push({ id: i + 1, status: false });
  }
  return clinicData;
}

export default function ClinicDashboard(): React.JSX.Element {
  
  console.log("Inside clinic dashboard ")
  const { doctor } = useLoaderData() as {doctor: DoctorDataDTO};
  
  const [clinicData, setClinicData] = useState<ClinicData>(initializeClinicData(doctor?._id));
  const [showErrorPage, setShowErrorPage] = useState<boolean>(doctor === undefined ? true : false);

  useEffect(() => {
    let connection: EventSource;
    if(doctor !== undefined) {
      const resourceUrl = `${serverUrl}/clinicData?doctorId=${doctor._id}`;
      console.log("Resource url is ", resourceUrl);
      
      // todo: See how to handle non-200 responses from the server
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
          setTimeout(initializeConnection, 1000);
        });

        connection.addEventListener("error404", (event) => {
          console.log("Bad request to the server : ", event.data.message);
          connection.close();
          setShowErrorPage(true);
        })

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
    }
  },[doctor]);

  if(showErrorPage) {
    return (<ErrorPage />) //todo: We should also propagate the error message and what to do with it.
  }
  
  return (
    <div>
      <ClinicInfo doctorName={doctor.name} date={clinicData.date}/>
      {isClinicOpenToday() && (<SessionInfo patientSeenStatusList={clinicData.patientSeenStatusList} schedule={doctor.schedule} currentStatus={clinicData.currentStatus}/>)}
    </div>
  );
}

// todo: Test what happens when the fetch returns 404. We are returning just fetch response from this function but, 
//       react router somehow extracts json data out of it and gives to our component when called using useLoaderData.
//       See how react router manages this behaviour incase we receive a 404 or any non-200 response per se.
export const doctorLoader = async ( {params}: any ) => { // todo: check what should be the type of params object
  console.log("Doctor Loader called")
  const resourceUrl = `${serverUrl}/doctor`
  const doctorId = params.trackingId
  try {
    return fetch(`${resourceUrl}/${doctorId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    });
  } catch (error) {
    console.error(`There was an error getting doctor with doctorId ${doctorId} from the server.`);
    throw error;
  }
}