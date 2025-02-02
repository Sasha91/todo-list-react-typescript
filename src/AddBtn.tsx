import { FaPlus } from 'react-icons/fa';
import './App.css'

interface AddBtnProps {
    btnClick: () => void
}

function AddBtn({btnClick}: AddBtnProps) {
    return (
        <div className='add-btn'>
        <button onClick={() => btnClick()}>
              <FaPlus/>
        </button>
      </div>
    )
}

export default AddBtn;