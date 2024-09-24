import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { deleteuserapp, fetchuserapp, updateuserapp, } from "../api";
import { useNavigate } from "react-router-dom";

const Usersapp = () => {
  const [data, setData] = useState([]);
  const [msg,setmsg]=useState('')
  const navgate=useNavigate()
  
  useEffect(() => {
    fetchuserapp().then((data) => setData(data));
  }, []);

  const handleApprove=(id,index)=>{
    alert("confirm Request Approval")
    const user=data[index]
    updateuserapp(id,{id:id,name:user.name,phone:user.phone,email:user.email,password:user.password,confirm_password:user.password,status:true})
  }
  const handleReject=(id,index)=>{
    alert("confirm Request Rejection")
    const user=data[index]
    updateuserapp(id,{id:id,name:user.name,phone:user.phone,email:user.email,password:user.password,confirm_password:user.password,status:false})
  }
  const handleDelete=(id,index)=>{
    alert("confirm Deletion of user")
    const user=data[index]
    deleteuserapp(id).then(() => {
      setData(data.filter((user) => user.id !== id));
    });
  }

  const handleDashboard=()=>{
    navgate('/admin-dashboard')
  }

 
  return (
    <>
      {data.length === 0 ? (
        <div align='center'>
          <br />
          <h1>NO user Requests for approval or your Session expired </h1><br />
          <p>Please login again by Clicking this <a href="http://localhost:3000/admin-login">Admin Login page</a></p>
        </div>
      ) : (
        <div className="container">
          <h1 align="center">USER Requests Available</h1>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{entry.name}</td>
                  <td>{entry.phone}</td>
                  <td>{entry.email}</td>
                  {entry.status === null && 
                  (<td>
                    <Button variant="success" onClick={()=>handleApprove(entry.id,index)}>Approve</Button>
                    <Button variant="secondary" onClick={()=>handleReject(entry.id,index)}>Reject</Button>
                    <Button variant="danger" onClick={()=>handleDelete(entry.id)}>Delete</Button>
                     
                  </td>)}
                  {entry.status === false && 
                  (<td>
                    <Button variant="success" onClick={()=>handleApprove(entry.id,index)}>Approve</Button>
                    <Button variant="danger" onClick={()=>handleDelete(entry.id)}>Delete</Button>
                  </td>)}
                  {entry.status === true && 
                  (<td>
                    <Button variant="secondary" onClick={()=>handleReject(entry.id,index)}>Reject</Button>
                    <Button variant="danger" onClick={()=>handleDelete(entry.id)}>Delete</Button>
                  
                  </td>)}
                  {entry.status === null && (<td style={{color:"orange"}}>New request</td>)}
                  {entry.status === false && (<td style={{color:"red"}}>Requested Rejected</td>)}
                  {entry.status === true && (<td style={{color:"green"}}>Request Accceped</td>)}

                </tr>
              ))}
            </tbody>
          </table>
          <hr />
          <p align="right" className="container">go back to <Button onClick={handleDashboard}>Admin Dashboard</Button></p>
        </div>
      )}
    </>
  );
};

export default Usersapp;
