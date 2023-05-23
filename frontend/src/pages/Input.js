import React,{useState} from 'react';



const Input = () => {
    const [txtValue, setTxtValaue] = useState("");

    const onChangeInput = (e) => {
        setTxtValaue(e.target.value)
    };

    return (
        <div>
            <input type="text" value={txtValue} onChange={onChangeInput} />
            <br/>
            <p>{txtValue}</p>
        </div>
    )
}

export default Input;