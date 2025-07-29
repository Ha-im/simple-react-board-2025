import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useEffect, useState,useCallback } from 'react';
import { Link } from "react-router-dom";


const Board =({id,title,registerid,date,onCkeckboxChange})=>{
  return(
    <>
      <tr>
        <td>
        <Form.Check
            type='checkbox'
            id={`default-${id}`}
            onChange={(e)=>{
              onCkeckboxChange(id,e.target.checked)
            }
            }
        />
        </td>
        <td>{id}</td>
        <td><Link to={`/View/${id}`}>{title}</Link></td>
        <td>{date}</td>
        <td>{registerid}</td>
      </tr>
    </>
  )
}

const BoardList= ({setmodify}) =>{
  const [checkList,setCheckList] = useState([]);
  const [boardList,setBoardList] = useState([]); // axios 를 이용해 데이터가 있다고한다면 보드리스트의 값을 변경해두려고한다.
  const onCkeckboxChange = (id,checked)=>{
    console.log(id,checked);
    setCheckList(prev=>
      /*
      if(checked){
        return [...prev,id];
      }else{
        return prev.filter(i=>i !== id)
      }
      */
      checked ? [...prev,id] : prev.filter(i=>i !== id)
    )
  }
  console.log(checkList);
  const handleModify = ()=>{
    /*
    선택한 값이 없다면 alert 으로 '최소 하나의 게시글을 선택해주세요'
    선택한 값이 여러개라면 '수정할 하나의 게시글만 선택해주세요'
    */
   if(checkList.length === 0 ){
    alert('최소 하나의 게시글을 선택해주세요')
   }else if(checkList.length > 1){
    alert('수정할 하나의 게시글만 선택해주세요')
   }else{
    setmodify(checkList[0]);
   }
  }
  const handleDelete = ()=>{
    if(checkList.length === 0 ){
      alert('삭제할 게시글을 선택해주세요')
      return;
     }
    let boardIdList = checkList.join(); //현재 checkList는 배열이기때문에 배열->문자열로 바꿈[1,2,3]->1,2,3
    axios.post('http://34.47.117.15:8000/delete',{boardIdList})// 중괄호로 감싸줘야 넘어간다 객체 구조로 들어가야한다.
    .then((res) =>{
      // 성공 핸들링
      alert('삭제 완료');
      getList();
    })
    .catch((error)=>{
      // 에러 핸들링
      console.log(error);
    });
  

  }

  const getList = useCallback(()=>{
    axios.get('http://34.47.117.15:8000/list')
    .then((res) =>{
      // 성공 핸들링
      console.log(res.data);
      setBoardList(res.data)
    })
    .catch((error)=>{
      // 에러 핸들링
      console.log(error);
    });
  },[]);
  //생명주기함수 필요 , 목록이 있으면 바로 갱신될 수 있어야하니 렌더 된다음에 다시 작동을 해야한다.
  useEffect(()=>{
    getList();
  },[getList]) // 빈 배열 최초한번, boardList변동사항이 생기면 함수 다시 실행
  return (
    <>
      <Table bordered hover>
        <thead>
          <tr>
            <th>선택</th>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {boardList.map(i=><Board
          key={i.BOARD_ID}
          id={i.BOARD_ID} 
          title={i.BOARD_TITLE} 
          registerid={i.REGISTER_DATE} 
          date={i.REGISTER_ID}
          onCkeckboxChange={onCkeckboxChange}
          />)}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end gap-1">
        <Link to="/Write" className="btn btn-outline-primary">글쓰기</Link>
        <Button size="sm" variant="outline-secondary" onClick={handleModify}>수정</Button>
        <Button size="sm" variant="outline-danger" onClick={handleDelete}>삭제</Button>
      </div>
    </>
  );
}

export default BoardList;
