import { Check, Trash } from 'phosphor-react';
import styles from './Todo.module.css';

type Todo = {
    id: number;
    content: string;
    checked: boolean;
}

interface TodoProps {   
    todo: Todo,
    onCheckTodo: (todo: Todo) => void;
    onDeleteTodo: (todo: Todo) => void;
}

export function Todo({ todo, onCheckTodo, onDeleteTodo }: TodoProps) {
    function handleCheckTodo() {    
        onCheckTodo(todo);
    }

    function handleDeleteTodo() {
        onDeleteTodo(todo);
    }

    return (
        <li className={styles.todo}>
            <div>
                <input onClick={handleCheckTodo} type="checkbox" defaultChecked={todo.checked} id={String(todo.id)} />
                <label htmlFor={String(todo.id)}>
                    {todo.checked &&
                        <Check size={12} weight='fill'/>
                    }
                </label>
                <p>{todo.content}</p>
            </div>


            <button onClick={handleDeleteTodo}>
                <Trash size={20}/>
            </button>
        </li>
    )
}