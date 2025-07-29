import {Link,useParams} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';

const View = ()=>{
  const [board,setBoard] = useState({title:'',content:'',image:''});
  let {id} = useParams() // 구조분해할당
  //SELECT * FROM BOARD WHERE BOARD_ID = ID

  useEffect(()=>{
    axios.get(`http://34.47.117.15:8000/detail?id=${id}`)
    .then((res) =>{
      // 성공 핸들링
      console.log(res.data);
      setBoard({
        title:res.data[0].BOARD_TITLE,
        content:res.data[0].BOARD_CONTENT,
        image_path:res.data[0].IMAGE_PATH
      });
    })
    .catch((error)=>{
      // 에러 핸들링
      console.log(error);
    });
  },[id]) // 빈 배열 최초한번, id 변동사항이 생기면 함수 다시 실행
  return(
    <div>
      <h2>제목</h2>
      <div>{board.title}</div>
      <h2>본문</h2>
      <div>{board.content}</div>
      {board.image_path && 
        <div className="attachment">
          <img src={`http://34.47.117.15:8000/${board.image_path}`} alt=""/>
        </div>
      }
      <hr/>
      <Link to="/" className="btn btn-outline-secondary">목록</Link>
    </div>
  )
}



export default View;