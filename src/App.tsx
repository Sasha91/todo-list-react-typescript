import { DndContext } from '@dnd-kit/core'
import DroppableArea from './DroppableArea';
import DraggableItem from './DraggableItem';
import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import ListItem from './List-item'

function App() {
  const [count, setCount] = useState(0)

  function btnClick() {
    setCount(count + 1);
  }

  interface Todo {
    id: string;
    text: string;
    checked: boolean;
  }

  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Learn React', checked: false },
    { id: '2', text: 'Build a Todo App', checked: false },
    { id: '3', text: 'Add Drag and Drop', checked: false },
  ]);

  const handleCheck = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    ));
  };

  const handleTextChange = (id: string, newText: string) => { 
    setTodos(todos.map(todo =>
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
  
    setTodos(reorderedTodos);
  };
  
  

  return (
    
      /* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> 
      </div>*/
      <div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => btnClick()}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <DndContext onDragEnd={handleDragEnd}>
            {todos.map((todo) => (
              <DroppableArea id={todo.id}>
                <DraggableItem key={todo.id} id={todo.id}>
                  <ListItem id={todo.id} text={todo.text} checked={todo.checked} onCheck={handleCheck} onTextChange={handleTextChange}/>
                </DraggableItem>
              </DroppableArea>
            ))}
        </DndContext>

      </div>
     <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
