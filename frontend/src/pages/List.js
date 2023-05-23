import axios from 'axios';
import React,{useState,useEffect} from 'react';

const User = ({ userData }) => {
    return (
        <tr>
            <td>{userData.userId}</td>
            <td>{userData.email}</td>
        </tr>
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
        <table>
            <thead>
                <tr>
                    <th>이름</th>
                    <th>이메일</th>
                </tr>
            </thead>
            <tbody>
                { userList.map( users => <User userData={users} />)}
            </tbody>
        </table>
    )
}

export default UserList;