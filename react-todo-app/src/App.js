import React, {useState} from "react";
import "./App.css"
import Lists from "./components/Lists";
import Form from "./components/Form";

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

  const [todoData, setTodoData]  = useState([]);
  const [value, setValue] = useState("");   // const [변수이름, state를 정하는 함수]



  const handleChange = (e) => {
    console.log(e.target.value)
    //this.setState({value: e.target.value})
    setValue(e.target.value);
  }

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
    setValue("");
  }


  return(
    <div className="flex items-center justify-center w-screen h-screen bg-red-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow-inner lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
        </div>

        <Lists todoData={todoData} setTodoData ={setTodoData}/>
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue}/>

      </div>
    </div>     
  );
}
