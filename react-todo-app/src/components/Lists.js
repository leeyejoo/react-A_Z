import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function Lists({todoData, setTodoData}) {
/* function Lists({todoData, setTodoData}) 대신
    function Lists({props}){
        props.todoData
    } 방식을 사용할 수 있다. => 부모 컨포넌트에서 내려준 props을 사용 */
          
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

    const handleEnd = (result) => {
        // result 매개변수에는 source 항목 및 대상 위치와 같은 드래그 이벤트에 대한 정보가 포함.
        console.log('result',result);

        if(!result.destination) return;
        
        const newTodoData = todoData;
        
        // 1. 변경시키는 아이템을 배열에서 지워줌
        // 2. return 값으로 지워진 아이템을 잡아줌 
        const [reorderedItem] = newTodoData.splice(result.source.index, 1);
        
        // 원하는 자리에 reorderedItem을 insert
        newTodoData.splice(result.destination.index, 0, reorderedItem);
        setTodoData(newTodoData);
        
    }

    return (
        <div>
            <DragDropContext onDragEnd={handleEnd}>
                <Droppable droppableId="todo">
                    {(provided) =>(
                        <div {...provided.droppableProps} ref={provided.innerRef}> 
                            {todoData.map((data, index) => (
                                <Draggable
                                    key={data.id}
                                    draggableId={data.id.toString()}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div 
                                            key={data.id} 
                                            {...provided.draggableProps} 
                                            ref={provided.innerRef} 
                                            {...provided.dragHandleProps}
                                            className= {`${snapshot.isDragging ? "bg-gray-400" :"bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600  border rounded"`}
                                        >
                                            <div className="items-center">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={false}
                                                    onChange={() => handleCompleteChange(data.id)}
                                                /> {" "}
                                                <span className={data.completed ? "line-through" : undefined}>{data.title}</span>
                                            </div>
                                            <div className="items-center">
                                                <button 
                                                className="px-2 py-1 float-right border rounded-full text-gray-400" 
                                                onClick={() => handleClick(data.id)} >
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}
