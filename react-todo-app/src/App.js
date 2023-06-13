import "./App.css"
import { useState, useCallback } from "react";
import Lists from "./components/Lists";
import Form from "./components/Form";


const initialTodoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : [];

export default function App() {
  /** state -> 데이터 변경 시 렌더링 해주기 위해서 React State 사용 
   *  value -> 입력한 데이터를 보관해주는 곳
   */

  // state = {
  //   todoData : [
  //     {
  //       id: "1",
  //       title: "공부하기",
  //       completed: false
  //     },{
  //       id: "2",
  //       title: "청소하기",
  //       completed: false
  //     },{
  //       id: "3",
  //       title: "노래하기",
  //       completed: false
  //     },
  //   ]
  //   ,value : ""
  // };

  //렌더링 확인 로그
  console.log('App Component Rendering');

  const [todoData, setTodoData]  = useState(initialTodoData);
  const [value, setValue] = useState("");   // const [변수이름, state를 정하는 함수]


  /* handleClick 함수는 List.js에서 사용하는 함수이지만 useCallback이라는 hook을 사용하기 위해서 최상위 컨포넌트로 옮김
     useCallback : 함수를 재사용할 수 있도록 리렌더링을 막아주는 역할 
  */
  // X 버튼 클릭시 
  const handleClick = useCallback(
    (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
      console.log('newTodoDate', newTodoData);
      //this.setState({ todoData: newTodoData })   // setState : 기존 데이터(todoData)를 새로운 데이터(newTodoData)로 변경
      setTodoData(newTodoData);

      //localStorage에 저장
      localStorage.setItem('todoData', JSON.stringify(newTodoData)); 
    },
    [todoData]
  );
  
  // 입력 버튼 클릭 시
  const handleSubmit = (e) => {
    // form 안에 input을 전송할 때 페이지 리로드 되는 것을 막아줌
    e.preventDefault();
    

    // 새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),           //id는 unique해야 함. 
      title: value,  //값을 입력하면서 state.value에 할일을 넣어줌
      completed: false
    }
    
    // 원래 있던 할 일에 새로운 할 일을 더해주기
    /* ... : 전계연산자
       ...this.state.todoData : 기존에 있던 todoData를 넣어줌 */
    //this.setState({todoData: [...todoData, newTodo], value:""})
    setTodoData((prev) => [...prev, newTodo]);   //함수를 이용하여 prev가 전 투두 데이터를 가져옴
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo])); 

    // 입력란에 있던 글씨 지워줌 
    setValue("");
  }

  // delete All 버튼 클릭시 
  const handleRemoveClick = () => {
    setTodoData([]); //할일 목록을 빈 배열로 만들어 줌
    localStorage.setItem('todoData', JSON.stringify([])); 
  }


  return(
    <div className="flex items-center justify-center w-screen h-screen bg-red-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow-inner lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={handleRemoveClick}> Delete All </button>
        </div>

        <Lists todoData={todoData} setTodoData ={setTodoData} handleClick={handleClick}/>
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue}/>

      </div>
    </div>     
  );
}
