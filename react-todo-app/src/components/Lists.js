import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import List from './List';

export default function Lists({todoData, setTodoData}) {
/* function Lists({todoData, setTodoData}) 대신
    function Lists({props}){
        props.todoData
    } 방식을 사용할 수 있다. => 부모 컨포넌트에서 내려준 props을 사용 */
          
   

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
                                        <List 
                                            key={data.id}
                                            id={data.id}
                                            title={data.title}
                                            completed={data.completed}
                                            todoData={todoData}
                                            setTodoData={setTodoData}
                                            provided={provided}
                                            snapshot={snapshot}
                                        />
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
