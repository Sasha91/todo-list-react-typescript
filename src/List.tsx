import { DndContext } from '@dnd-kit/core'
import DroppableArea from './DroppableArea';
import DraggableItem from './DraggableItem';
import './App.css'
import ListItem from './ListItem'
import AddBtn from './AddBtn';
import { Todo } from './Datamodel';
import { generateGUID } from './Utilities';
import { useRef } from 'react';


interface ListProps {
    categoryId: string;
    todos: Todo[];
    onUpdateTodos: (categoryId: string, updatedTodos: Todo[]) => void;
}
function List({ categoryId, todos, onUpdateTodos }: ListProps) {
    var itemRefs = useRef<(HTMLInputElement|null)[]>([])

    const handleCheck = (id: string) => {
        onUpdateTodos(categoryId, todos.map(todo => 
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
        ));
    };

    const handleTextChange = (id: string, newText: string) => { 
        onUpdateTodos(categoryId, todos.map(todo =>
        todo.id === id ? {...todo, text: newText} : todo
        ));
    }

    const handleDragEnd = (event: any) => {
        console.log('Drag event:', event);  // Log the event
        const { active, over } = event;

        // Ensure "over" is not null before proceeding
        if (!over || active.id === over.id) return;
    
        const oldIndex = todos.findIndex((todo) => todo.id === active.id);
        const newIndex = todos.findIndex((todo) => todo.id === over.id);
    
        const reorderedTodos = [...todos];
        const [movedItem] = reorderedTodos.splice(oldIndex, 1);
        reorderedTodos.splice(newIndex, 0, movedItem);
    
        onUpdateTodos(categoryId, reorderedTodos);
    };
    
    const addNewItem = () => {
        const newTodoList = [...todos];
        newTodoList.push(
            {id: generateGUID(), text: '', checked: false}
        )
        onUpdateTodos(categoryId, newTodoList)
    }

    const deleteItem = (deleteIndex: number) => {
        const newTodoList = todos.filter((_, index) => index !== deleteIndex)
        onUpdateTodos(categoryId, newTodoList)

        // Focus on the next or previous item after deletion
        // indexes are not reassigned in the itemrefs yet, so we use deleteindex + 1
        const focusIndex = deleteIndex < newTodoList.length ? deleteIndex + 1 : deleteIndex - 1;
        if (focusIndex >= 0 && itemRefs.current[focusIndex]) {
            itemRefs.current[focusIndex]?.focus();
        }
    }

    return (
        <div>
        <div className="card" style={{width: '300px'}}>
            <p>
            Edit <code>src/App.tsx</code> and save to test HMR
            </p>
            <div>
            <AddBtn btnClick={addNewItem}/>
            </div>
            <div style={{display: 'block'}}>
            <DndContext onDragEnd={handleDragEnd}>
                {todos.map((todo, index) => (
                <DroppableArea key={todo.id} id={todo.id}>
                    <DraggableItem id={todo.id}>
                    <ListItem 
                        id={todo.id}
                        index={index}
                        text={todo.text} 
                        checked={todo.checked}
                        ref={(el) => itemRefs.current[index] = el}
                        onCheck={handleCheck} 
                        onTextChange={handleTextChange} 
                        onDeleteItem={deleteItem}/>
                    </DraggableItem>
                </DroppableArea>
                ))}
            </DndContext>
            </div>
        </div>
        </div>
    )
}

export default List;