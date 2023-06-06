// 함수형 컴포넌트
import React,{useState, useEffect} from 'react'; 
import {Button, Checkbox, Form} from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";

const Join = () => {
    const navigate = useNavigate();

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
        .then((data) => {
            if(data.code === 200) {
                toast.success(data.message, {
                    position : "top-center",
                    autoClose : 2000,
                });
                setTimeout(() => {
                    navigate("/");
                }, 2000);

            } else {
                toast.error(`${data.message} -> ${data.error}`, {
                    position : "top-center",
                    autoClose : 2000,
                });
                setTimeout(() => {
                }, 2000);

            }
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
                        <label>userId</label>
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