import { FaSun, FaMoon } from 'react-icons/fa'
import { useState } from 'react'

interface ListItemProps {
    id: string
    text: string
    checked: boolean
    onCheck: (id: string) => void
    onTextChange: (id: string, newText: string) => void
}

function ListItem({ id, text, checked, onCheck, onTextChange }: ListItemProps) {
    const [editableText, setEditableText] = useState(text);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditableText(e.target.value);
        onTextChange(id, e.target.value);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <button onClick={() => onCheck(id)}>
                {checked ? <FaSun /> : <FaMoon />}
            </button> 
            
            <span style={{ marginLeft: '0.5rem', fontSize: 'inherit' }}>
                {id}. 
                <input 
                    type="text" 
                    value={editableText} 
                    onChange={handleTextChange}
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

export default ListItem