import { FaCircle, FaCheckCircle } from 'react-icons/fa'
import { forwardRef, useState } from 'react'

interface ListItemProps {
    id: string
    index: number
    text: string
    checked: boolean
    onCheck: (id: string) => void
    onTextChange: (id: string, newText: string) => void
    onDeleteItem: (index: number) => void
}

// Use forwardRef to accept a ref for the input element
const ListItem = forwardRef<HTMLInputElement|null, ListItemProps> (
    ({ id, index, text, checked, onCheck, onTextChange, onDeleteItem }, ref) => {
    const [editableText, setEditableText] = useState(text);

    const handleTextChange = (e: any) => {
        setEditableText(e.target.value);
        onTextChange(id, e.target.value);
    };

    const onInput = (e: any) => {
        if (e.key == 'Backspace' && editableText === '') {
            e.preventDefault(); // Prevent the backspace from affecting the newly focused item
            onDeleteItem(index)
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <button onClick={() => onCheck(id)}>
                {checked ? <FaCheckCircle /> : <FaCircle />}
            </button> 
            
            <span style={{ marginLeft: '0.5rem', fontSize: 'inherit' }}>
                <input 
                    type="text" 
                    value={editableText} 
                    placeholder='write a todo item'
                    onChange={handleTextChange}
                    onKeyDown={onInput}
                    ref={ref}
                    style={{ 
                        textDecoration: checked ? 'line-through' : 'none', 
                        border: 'none', 
                        background: 'none', 
                        outline: 'none',
                        marginLeft: '0.5rem',
                        fontSize: 'inherit'
                    }}
                />
            </span>
        </div>
    )
}
)

export default ListItem