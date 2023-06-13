import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import List from './List';

const Lists = React.memo(({todoData, setTodoData, handleClick}) => {
  /* function Lists({todoData, setTodoData}) 대신
    function Lists({props}){
        props.todoData
    } 방식을 사용할 수 있다. => 부모 컨포넌트에서 내려준 props을 사용 */

    //렌더링 확인 로그
    console.log('Lists Component Rendering');

    const handleEnd = (result) => {
        // result 매개변수에는 source 항목 및 대상 위치와 같은 드래그 이벤트에 대한 정보가 포함.
        console.log('result',result);

        // 목적지가 없으면(이벤트 취소) 히 함수를 종료
        if(!result.destination) return;
        
        //리액트 불변성을 위한 새로운 todoData
        const newTodoData = [...todoData];
        
        // 1. 변경시키는 아이템을 배열에서 지워줌 (splice를 이용)
        // 2. return 값으로 지워진 아이템을 잡아줌  (splice로 만든 새 배열을 넣어줌)
        // splice : 배열의 index를 이용해 기존 요소를 교체, 삭제, 추가 할 수 있는 메소드
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
                                            handleClick={handleClick}
                                        />
                                    )}
                                </Draggable>
                            ))}
                            {/* placeholder : 목록에 빈공간을 만들어 드래그 작업이 자연스럽게 도와줌  */}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div> 
    );

});

export default Lists

