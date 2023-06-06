// 함수형 컴포넌트
import React,{useState, useEffect} from 'react'; 
import {Button, Checkbox, Form} from 'semantic-ui-react'

const Join = () => {
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [email, setEmail] = useState("");

    const [profileImg,setProfileImg] = useState(null);

    const imageHandler = (e) => {
        setProfileImg(e.target.files[0]);
    }

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

        const formData = new FormData();
        formData.append( "userId" , userId);
        formData.append( "userPassword" , userPassword);
        formData.append( "email" , email);
        formData.append("profile_img", profileImg);

        fetch("http://localhost:5000/api/user/join", {
            method : 'post',
            body : formData,
        })
        .then((res) => res.json())
        .then((result) => {
            alert('success', result);
        })

    }

    return (
        <React.Fragment>

            <h5>회원가입</h5>
            <div className="ComponentBox">
                
                    
                <Form onSubmit={submitHandler} encType='multipart/form-data'>

                    <Form.Field>
                        <input type='file' 
                            accept='image/jpg,impge/png,image/jpeg,image/gif' 
                            name='profileImg' 
                            onChange={ imageHandler }>
                        </input>
                    </Form.Field>

                    <Form.Field>
                        <label>ID</label>
                        <input name="userId" 
                            placehorder="user id" 
                            value={userId} 
                            onChange={userIdHandler} />
                    </Form.Field>

                    <Form.Field>
                        <label>Password</label>
                        <input name="userPassword" 
                            placehorder="password" 
                            value={userPassword} 
                            onChange={userPasswordHandler}/>
                    </Form.Field> 

                    <Form.Field>
                        <label>email</label>
                        <input name="email" 
                            placehorder="email" 
                            value={email}
                            onChange={emailHandler} />
                    </Form.Field>                    

                    <Button type="submit"  >Join</Button>                         
                </Form>
            </div>
        </React.Fragment>
    )
}

export default Join;