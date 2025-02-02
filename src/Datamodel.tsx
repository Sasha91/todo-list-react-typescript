export interface Todo {
  id: string;
  text: string;
  checked: boolean;
}

export interface Category {
  id: string;
  name: string;
  todos: Todo[];
}
