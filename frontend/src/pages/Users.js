import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {Icon, Label, Menu, Table} from 'semantic-ui-react'


const User = ({ userData }) => {
    return (
        <Table.Row>
            <Table.Cell><img src="http://localhost:5000/backend/uploads/meme.jpeg"/></Table.Cell>
            <Table.Cell>{userData.userId}</Table.Cell>
            <Table.Cell>{userData.email}</Table.Cell>
        </Table.Row>
    )
}

const UserList = () => {
    const [userList,setUserList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/user/list')
        .then((res) => res.json())
        .then((data) => setUserList(data.userList));
    },[])

    return (
        <React.Fragment>
            <h5>회원 리스트</h5>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Thum</Table.HeaderCell>
                        <Table.HeaderCell>User</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {userList.map(users => <User userData={users} />)}
                </Table.Body>
            </Table>
        </React.Fragment>
    )
}

export default UserList;