import React, { useState } from 'react'

const List = React.memo(({
    id, title, completed, todoData, setTodoData, provided, snapshot, handleClick
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    
    //렌더링 확인 로그
    console.log('List Component Rendering');
    /*React.memo로 감싸주기 전 -> 한 글자 입력시마다 props가 바뀌지 않아도 렌더링이 됨
      React.memo로 감싸준 후 -> props가 바뀌지 않으면 렌더링이 되지 않음                      */


    //체크박스 클릭시
    const handleCompleteChange = (id) => {
        let newTodoData = todoData.map(data =>{
            if(data.id === id){
                data.completed = !data.completed;
            }
            return data;
        });
        
        //this.setState({todoData:newTodoData})
        setTodoData(newTodoData);
    }

    // Todo 수정시
    const handleEditChange = (event) => {
        setEditedTitle(event.target.value)
    }

    // save 버튼 클릭시 -> submit
    const handleSubmit = (event) => {
        event.preventDefault();
        
        let newTodoData = todoData.map( data =>{
            if(data.id === id){
                data.title = editedTitle;
            }

            return data;
        })
        setTodoData(newTodoData);
        setIsEditing(false);

    }

    // const handleClick = (id) => {
    //     let newTodoData = todoData.filter((data) => data.id !== id);
    //     console.log('newTodoDate', newTodoData);
    //     //this.setState({ todoData: newTodoData })   // setState : 기존 데이터(todoData)를 새로운 데이터(newTodoData)로 변경
    //     setTodoData(newTodoData);
    // };


    if(isEditing){
        return(
            <div 
                className= {`flex items-center justify-between w-full px-4 py-1 my-2 bg-gray-100 text-gray-600  border rounded`}
            >
                <div className="items-center">
                    <form onSubmit={handleSubmit}>
                        <input
                            value={editedTitle}
                            onChange={handleEditChange} 
                            className="w-full px-3 py-2 mr-4 text-red-700 rounded"
                        />
                    </form>
                </div>
                <div className="items-center">
                    <button 
                        className="px-2 py-1 float-right border rounded-full text-gray-400" 
                        onClick={() => setIsEditing(false)} >
                        X
                    </button>
                    <button 
                        type="submit"
                        onClick={handleSubmit}
                        className="px-2 py-1 float-right border rounded-full text-gray-400"
                    >
                        save
                    </button>
                
                </div>
            </div>
        )
    } else {
        return (
            <div 
                key={id} 
                {...provided.draggableProps} 
                ref={provided.innerRef} 
                {...provided.dragHandleProps}
                className= {`${snapshot.isDragging ? "bg-gray-400" :"bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600  border rounded"`}
            >
                <div className="items-center">
                    <input
                        type="checkbox"
                        onChange={() => handleCompleteChange(id)}
                        defaultChecked={completed}
                    /> {" "}
                    <span className={completed ? "line-through" : undefined}>{title}</span>
                </div>
                <div className="items-center">
                    <button 
                        className="px-2 py-1 float-right border rounded-full text-gray-400" 
                        onClick={() => handleClick(id)} >
                        X
                    </button>
                    <button 
                        className="px-2 py-1 float-right border rounded-full text-gray-400" 
                        onClick={() => setIsEditing(true)} >
                        edite
                    </button>
                
                </div>
            </div>
        );
    }

});

export default List