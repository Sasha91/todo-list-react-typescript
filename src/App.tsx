import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import List from './List';
import { Category, Todo } from './Datamodel';
import { generateGUID } from './Utilities';

function App() {

  const [categories, setCategories] = useState<Category[]>([]);
  // on start up
  useEffect(() => {
    const savedData = localStorage.getItem('appData');
    if (savedData) {
      setCategories(JSON.parse(savedData));
    } else {
      // Initialize with some default data
      setCategories([
        { id: generateGUID(), name: 'Work', todos: [] },
        { id: generateGUID(), name: 'Personal', todos: [] },
        { id: generateGUID(), name: 'Hobbies', todos: [] },
      ]);
    }
  }, []);

  // whenever the categories are changed
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem('appData', JSON.stringify(categories));
    }
  }, [categories]);

  const updateTodos = (categoryId: string, updatedTodos: Todo[]) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, todos: updatedTodos } : cat
      )
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CategoryView categories={categories}/>} />
        <Route path="/:categoryName" element={<ListView categories={categories} updateTodos={updateTodos}/>} />
      </Routes>
    </Router>
  );
}

function CategoryView({ categories }: { categories: Category[]}) {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Select a Category:</h1>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => navigate(`/${category.name.toLowerCase()}`)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

function ListView({ categories, updateTodos }: { categories: Category[], updateTodos: (categoryId: string, todos: Todo[]) => void}) {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  
  const category = categories.find((cat) => cat.name.toLowerCase() === categoryName?.toLowerCase());

  if (!category) return <Navigate to="/" />;

  return (
    <div>
      <button onClick={() => navigate('/')}>Back to Categories</button>
      <h2>{categoryName}</h2>
      <List categoryId={category.id} todos={category.todos} onUpdateTodos={updateTodos} />
    </div>
  );
}

export default App;
