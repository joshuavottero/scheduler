import React, { useState} from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
    const transition = function transition(newMode, replace = false) {
      let tempArray = history
      if (replace) {
        tempArray[tempArray.length - 1] = newMode;
      }
      else{
        tempArray.push(newMode);  
      }
      setHistory(tempArray);
      setMode(newMode);
    } 

    const back = function back(mode) {
      if(history[history.length - 1] !== initial) {
        let tempArray = history;
        const backValue = tempArray.pop();
        setHistory(tempArray); 
        setMode(tempArray[tempArray.length - 1]);
      }     
     
    } 
    // console.log("action",mode);
    // console.log("action",transition);

  return { mode, transition, back };
}

