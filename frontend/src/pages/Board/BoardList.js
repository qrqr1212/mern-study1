import React, {useState, useEffect} from 'react';
import {Table, Button, Icon, Label } from 'semantic-ui-react'
import {Link,useNavigate} from "react-router-dom";

const btnStyle = {
    display : "inline-block",
    margin : "10px 10px",
     float : "right"
}

const Board = ({ boardData }) => {
    return (
        <Table.Row>
            <Table.Cell>{boardData.bno}</Table.Cell>
            <Table.Cell>
                <Link to={`/NewBoard/${boardData._id}`}>{boardData.title}</Link>
            </Table.Cell>
            <Table.Cell>{boardData.author}</Table.Cell>
            <Table.Cell>{boardData.createdDt}</Table.Cell>
        </Table.Row>
    )
}

const BoardList = () => {
    const navigate = useNavigate();
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/board/list")
        .then((res) => res.json())
        .then((data) => setBoards(data.boardList)) 
    },[])

    return (
        <React.Fragment>
            <h5>게시글 </h5>
            <div style={btnStyle}>
            <Button primary onClick={() => navigate("/NewBoard") }>글 등록</Button>
            </div>
            <Table celled >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>bno</Table.HeaderCell>
                        <Table.HeaderCell>title</Table.HeaderCell>
                        <Table.HeaderCell>author</Table.HeaderCell>
                        <Table.HeaderCell>date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body> 
                 { boards && boards.map( board => <Board boardData={board}/>) }
                </Table.Body>
            </Table>
        </React.Fragment>
    )
}

export default BoardList