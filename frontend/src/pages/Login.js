import React,{useState, useRef,useEffect} from 'react'
import {Button, Checkbox, Form} from 'semantic-ui-react'
import '../Css/common.css'

const Login = () => {

    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    },[]);

    const [inputs, setInputs] = useState({
        userId : "",
        userPassword : "",
    });

    const {userId, userPassword} = inputs

    const onChangeInputHandler = (e) => {
        const value = e.target.value;
        const id = e.target.id;

        setInputs({
            ...inputs,
            [id] : value
        });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        let body = {
            userId : userId,
            userPassword : userPassword,
        }

        fetch("http://localhost:5000/api/process/login", {
            method : 'post', 
            body : JSON.stringify(body),
            headers: {'Content-Type': 'application/json'},
        })
        .then((res) => res.json())
        .then((result) => {
            const userInfo = result.userInfo;
            const token = result.token;

            if(userInfo) {
                alert(`${userInfo.userId}님 반갑습니다.`);
                // front 로컬 스토리지에 저장 (아이디, 토큰)
                localStorage.clear();
                localStorage.setItem("userId", userInfo.userId);
                localStorage.setItem("token", token);

                document.location.href = '/'
            }  else {
                alert("아이디가 존재하지 않거나 패스워드가 일치하지 않습니다.");
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <React.Fragment>
            
            <h5>로그인</h5>
            <div className="ComponentBox">

                <Form onSubmit={onSubmitHandler}>
                    <Form.Field>
                        <label>ID</label>
                        <input 
                            ref={inputRef}
                            type="text"
                            id="userId"
                            name="userId" 
                            placehorder="user id" 
                            value={userId} 
                            onChange={onChangeInputHandler} />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input type="password"
                            id="userPassword"
                            name="userPassword"
                            placehorder="password" 
                            value={userPassword}
                            onChange={onChangeInputHandler} />
                    </Form.Field>   
                    <Form.Field>
                        <Checkbox label="I agree to the Terms and Condition"/>
                    </Form.Field> 
                    <Button type="submit">Login</Button>                         
                </Form>

            </div>
        </React.Fragment>
    )
}

export default Login