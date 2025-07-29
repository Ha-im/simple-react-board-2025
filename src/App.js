import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BoardList from './components/BoardList';
import Write from './components/Write';
import View from './components/View';
import { useEffect, useState } from 'react';
import {Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [isModifyMode,setIsModifyMode] = useState(false)
  const [boardId,setBoardId] = useState(0)
  const [redirectWrite,setRedirectWrite] = useState(false)

  const setmodify = (id)=>{
    setIsModifyMode(true);
    setBoardId(id);
    setRedirectWrite(true) // 페이지 이동을 하겠다.
  }
  const setReset = ()=>{
    setIsModifyMode(false);
  }

  useEffect(()=>{
    if(redirectWrite===true) setRedirectWrite(false) 
      // 글쓰기 페이지로 이동 후, 글쓰기 페이지로 이동을 할지말지 결정하는 변수의 값을 false로변경 // 페이지 이동 더이상 안됨
  },[redirectWrite]);
  return (
    <div className="container">
      <h1>React Board</h1>
      <Routes>
        <Route path="/" element={<BoardList setmodify={setmodify}/>} />
        <Route path="/Write" element={<Write setReset={setReset} isModifyMode={isModifyMode} boardId={boardId}/>} />
        <Route path="/View/:id" element={<View/>}/>
    </Routes>
        {
          redirectWrite === true && <Navigate to="/Write" /> // 논리연산자
        }
    </div>
  );
}

export default App;
