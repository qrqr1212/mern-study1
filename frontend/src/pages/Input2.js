import React, {useState} from 'react';

const Input2 = () => {
    const [inputs , setInputs] = useState({
        name : "",
        email : "",
        phone : "",
    });

    const {name , email , phone} = inputs;

    const onChangeInput = (e) => {
        const value = e.target.value;
        const id = e.target.id;
    
        setInputs({
            ...inputs,
            [id] : value
        });
    }

    return (
        <div>
            <div>
                <label>이름</label>
                <input type="text" id="name" value={name} onChange={onChangeInput} />
            </div>
            <div>
                <label>이메일</label>
                <input type="text" id="email" value={email} onChange={onChangeInput} /> 
            </div>
            <div>
                <label>전화번호</label>
                <input type="text" id="phone" value={phone} onChange={onChangeInput} />
            </div>
            <p> Name  : {name}</p>
            <p> Email : {email}</p>
            <p> Phone : {phone}</p>
        </div>
    )
}

export default Input2;
