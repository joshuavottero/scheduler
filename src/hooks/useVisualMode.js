import React, { useState} from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
    const transition = function transition(newMode, replace = false) {
      let tempArray = [...history];
      setMode(newMode);
      if (replace) {

        tempArray[tempArray.length - 1] = newMode;
        setHistory(tempArray);
      }
      else{
        tempArray.push(newMode);
        setHistory(tempArray);  
      }
    } 

    const back = function back(mode) {
      if(history[history.length - 1] !== initial) {
        let tempArray = [...history];
        const backValue = tempArray.pop();
        setHistory(prev => (tempArray)); 
        setMode(tempArray[tempArray.length - 1]);
      }     
     
    } 
  return { mode, transition, back };
}

