import React, {useState} from 'react';
import {Form, Button, TextArea} from 'semantic-ui-react'

const NewBoard = () => {    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


    const onSubmitHandler = (e) => {
        e.preventDefault();

        let body = {
            title : title,
            content : content,
            author : localStorage.getItem("userId") || "" ,
        }

        fetch("http://localhost:5000/api/board/insert", {
            method : 'post', 
            body : JSON.stringify(body),
            headers: {'Content-Type': 'application/json'},
        })
        .then((res) => res.json())
        .then((result) => {
            if(result.code == 200) {
                alert(result.message);
                window.location.href="/BoardList";
            } else {
                alert(`${result.message} -> ${result.error} `);
                return ;
            }

        })
        .catch((err) => {
            console.log(err);
        })
    }

    return(
        <div>
            <h5>게시글 등록</h5>
            <Form onSubmit={onSubmitHandler}>
                <Form.Field>
                    <label>title</label>
                    <input name="title" placeholder="title" onChange={(e) => {setTitle(e.target.value)}} />
                </Form.Field>
                <Form.Field>
                    <label>content</label>
                    <TextArea name="content" onChange={(e) => {setContent(e.target.value)}} />
                </Form.Field>
                <div className="divBtnAlignCenter">
                    <Button primary type="submit" >등록</Button>
                    <Button primary type="button" >취소</Button>
                </div>
            </Form>
        </div>
    )
}

export default NewBoard;