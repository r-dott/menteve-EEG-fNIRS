import React, { useState, useEffect } from 'react';
import { EEGGraph } from './components/EEGGraph';
import { VitalsGraph } from './components/VitalsGraph';
import { StadiumIndex } from './components/StadiumIndex';
import { FnirsIndex } from './components/FnirsIndex';

import io from 'socket.io-client'

const socket = io('https://localhost:5000');

function App() {
 
  const [eegData, setEegData] = useState<number[][]>(
    Array(60).fill(Array(4).fill(0))    
  );

  const [fnirsData, setFnirsData] = useState([]);
  const [eegIndex, setEegIndex] = useState(0);
  const [fnirsIndex, setFnirsIndex] = useState(0);


  const [finalfnirs, setFinalFnirs] = useState(
    Array.from({ length: 60 }, () => ({
      HbO2: 0,
      Hb: 0,
    }))
  );



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/data');
        const data = await response.json();

        // console.log(data)

        setEegData((prevEegData) =>{
          const newEntries = [[data.eegData[0],data.eegData[1], data.eegData[2], data.eegData[3]]];
          const updatedEeg = [...prevEegData, ...newEntries]; 
          return updatedEeg.slice(-60); 
        });

        setFnirsData(data.fnirsData);
        setEegIndex(data.eegIndex);
        setFnirsIndex(data.fnirsIndex);


        setFinalFnirs((prevFinalFnirs) => {
          const newEntries = data.fnirsData; 
          const updatedFnirs = [...prevFinalFnirs, ...newEntries]; 
          return updatedFnirs.slice(-60); 
        });
        

    
        

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data periodically
    const intervalId = setInterval(fetchData, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);


  const transformedEEGData = eegData.length ? Array(4).fill(0).map((_, channel) => 
    eegData.map(point => point[channel])
  ) : [];

  // const finaleeg = [channel1, channel2, channel3, channel4]
 
  //fnirsData is of length 1 with vitals1, vitals2
  //eegData is of length 1 with 0,1,2,3 index-able


  // console.log(fnirsData)
  // console.log(eegData)
  console.log(finalfnirs)
  // console.log(finaleeg)
  // console.log(transformedEEGData)
  // console.log(eegIndex)
  // console.log(fnirsIndex)
  // console.log(transformedEEGData)
  console.log("hi")

  return (

    <div className="h-screen w-screen flex flex-col bg-gray-900 overflow-hidden">

    
      <div className="flex h-1/2">
    
        <div className="w-4/6 h-full p-2">
          <div className="w-full h-full bg-black rounded-lg p-2">
            <h2 className="text-white text-lg mb-2">EEG Monitor</h2>
            <EEGGraph data={transformedEEGData} />
          </div>
        </div>
        
        <div className="w-2/6 h-full p-2">
          <div className="w-full h-full bg-black rounded-lg p-2">
            <h2 className="text-white text-lg mb-2">BIS Index</h2>
            <StadiumIndex value={eegIndex} />
          </div>
        </div>
      </div>

      <div className="flex h-1/2">
        {/* fNIRS Signals */}
        <div className="w-2/3 h-full p-2">
          <div className="w-full h-full bg-black rounded-lg p-2">
            <h2 className="text-white text-lg mb-2">fNIRS Signals</h2>
            <VitalsGraph data={finalfnirs} />
          </div>
        </div>
        {/* fNIRS Index */}
        <div className="w-1/3 h-full p-2">
          <div className="w-full h-full bg-black rounded-lg p-2">
            <h2 className="text-white text-lg mb-2">Tissue O2 Saturation</h2>
            <FnirsIndex value={fnirsIndex} />
          </div>
        </div>
      </div>
  

    </div>
        
    
  );
}

export default App;