import React,{useState} from 'react'
import {Button, Checkbox, Form} from 'semantic-ui-react'
import '../Css/common.css'

const Login = () => {

    const [userId, setUserId] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [checkBox, setCheckBox] = useState(false)

    const [disabled, setDisabled] = useState(false)

    const onChangeUserId = (e) => {
        setUserId(e.target.value)
    }

    const onChangeUserPassword = (e) => {
        setUserPassword(e.target.value)
    }

    const onCheckBoxHandler = (e) => {
        setCheckBox(!checkBox)
    }

    const onSubmitHandler =  (e) => {
        setDisabled(true);
        e.preventDefault();

    }   


    return (
        <div>
            <Form onSubmit={onSubmitHandler}>
                <Form.Field>
                    <label>ID</label>
                    <input name="userId" placehorder="user id" value={userId} onChange={onChangeUserId} />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input name="userPassword" 
                           placehorder="password" 
                           value={userPassword}
                           onChange={onChangeUserPassword} />
                </Form.Field>   
                <Form.Field>
                    <Checkbox label="I agree to the Terms and Condition" checked={checkBox} onChage={(e) => onCheckBoxHandler(e)}/>
                </Form.Field> 
                <Button type="submit" disabled={disabled} >Login</Button>                         
            </Form>
        </div>
    )
}

export default Login