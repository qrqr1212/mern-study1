// 함수형 컴포넌트
import React,{useState, useEffect} from 'react'; 
import {Button} from 'semantic-ui-react'

const Home = () => {

    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [email, setEmail] = useState("");

    const userIdHandler = (e) => {
        e.preventDefault();
        setUserId(e.target.value);
    };

    const userPasswordHandler = (e) => {
        e.preventDefault();
        setUserPassword(e.target.value);
    }

    const emailHandler = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        let body = {
            userId : userId,
            userPassword : userPassword,
            email : email,
        }

        fetch("http://localhost:5000/api/user/insert", {
            method : 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(body)
        })
        .then((res) => res.json())
        .then((res) => {
            alert(res.result);
        })
    }

    return (
        <div>
            <h1>회원가입</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label> id : </label>
                    <input type="text" name="userId" onChange={userIdHandler} />
                </div>
                <div>
                    <label> password : </label>
                    <input type="text" name="userPassword" onChange={userPasswordHandler} />
                </div>
                <div>
                    <label> email : </label>
                    <input type="text" name="email" onChange={emailHandler} />
                </div> 
                 
                <Button primary type="submit">Join</Button>                             
            </form>
        </div>
    )
}

export default Home;