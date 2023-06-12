import React from 'react'

const List = ({
    id, title, completed, todoData, setTodoData, provided, snapshot
}) => {
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

    const handleClick = (id) => {
        let newTodoData = todoData.filter((data) => data.id !== id);
        console.log('newTodoDate', newTodoData);
        //this.setState({ todoData: newTodoData })   // setState : 기존 데이터(todoData)를 새로운 데이터(newTodoData)로 변경
        setTodoData(newTodoData);
    };

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
            </div>
        </div>
    )
}

export default List