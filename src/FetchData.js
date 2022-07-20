import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap';
import FetchDatacss from './FetchData.css'


export default function FetchData() {
    const [userData, setUserData] = useState([])

    // get data

    async function fetchData() {

        try {
            const res = await axios.get(
                "https://reqres.in/api/users?page=2")
            console.log("res", res)
            setUserData(res.data.data);


        } catch (e) {
            console.log("some error occured while listing")
        }

    }
    useEffect(() => { fetchData() }, [])


    //  Delete Data

    async function deleteData(e, id) {
        e.preventDefault();
        try {
            const res = await axios.delete
                (`https://reqres.in/api/users?page=2/${id}`)
                .then(res => console.log('Deleted!!!', res))
            alert("Data deleted successfully");

            fetchData()
        } catch (e) {
            console.log("some error occured while deleting", e)
        }
    }

    return (
        <div>
            
                <h2 className="flex justify-center items-center">User Database</h2>
                
                <button className="add btn btn-primary opacity-100"
                    onClick={(e) => (e)}
                >Add Details</button>
        

            <hr></hr>
            <Table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Email</th>
                        <th scope="col">First_name</th>
                        <th scope="col">Last_name</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Delete</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        userData.map((user) => {
                            return (
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td><img src={user.avatar} alt="..."></img></td>

                                    <td>
                                        <button className="btn btn-primary opacity-100 mt-5"
                                            onClick={(e) => deleteData(e, user.id)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>


        </div>
    )
}
