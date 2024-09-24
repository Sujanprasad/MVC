import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchProducts, createProduct,updateProduct,deleteProduct } from "../api";
import { useNavigate } from "react-router-dom";

const Admindashboard = () => {

const [Show, setShow] = useState(false);

const [data, setData] = useState([]);

const [product,setProduct]=useState('')
const [quality, setquality] = useState(null);
const [quantity, setquentity] = useState(null);

const [edit,setedit]=useState(null)

const navgate=useNavigate();
 

useEffect(() => {
  fetchProducts().then(data => setData(data));
}, []);

  const SubmitHandler = (e) => {
    e.preventDefault();
    
    if (quality > 5 || quality < 0) {
      alert("Enter Quality between range (1-5)");
      return;
    }
      
    if (edit) {
      updateProduct( edit,{ product, quality, quantity });
    }
    else {
     createProduct({product,quality,quantity})
    }
  };

  const handleupdate=(id,index)=>{
    setProduct(data[index].product)
    setquality(data[index].quality);
    setquentity(data[index].quantity);
    setShow(true)
    setedit(id)
  }

  const handleDelete = (id) => {
      deleteProduct(id).then(() => {
        setData(data.filter((product) => product.id !== id));
      });
    };

  const handleShow = () => {
    setShow(true);
  };

  const gotoAPP=()=>{
    navgate('/user-approval')
  }

  return (
    <>
      <br />
      <h1 align='center' style={{textDecoration:"underline"}}>ADMIN DASHBOARD</h1>
      <p align="right" className="container"><Button variant="secondary" onClick={gotoAPP}>GOTO APPROVE USERS</Button></p>
      <p align="right" className="container">
        <Button variant="primary" onClick={() => handleShow()}>
          Add Product
        </Button>
      </p>
      <Modal show={Show}>
        <Modal.Body style={{ color: "white", backgroundColor: "#666" }}>
          <Modal.Header style={{ color: "white", backgroundColor: "black" }}>
            <Modal.Title style={{ textAlign: "center" }}>
              ADD PRODUCT
            </Modal.Title>
          </Modal.Header>
          <div className="container mt-5">
            <form onSubmit={SubmitHandler}>
              <table align="center">
                <tbody>
                  <tr>
                    <td>
                      <label>Product:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="product name"
                        name="product"
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        required
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Quality :</label>
                    </td>
                    <td>
                      <input
                        type="number"
                        placeholder="quality (between 1-5)"
                        name="quality"
                        value={quality}
                        onChange={(e) => setquality(e.target.value)}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Quantity :</label>
                    </td>
                    <td>
                      <input
                        type="number"
                        placeholder="quantity"
                        name="quantity"
                        value={quantity}
                        onChange={(e) => setquentity(e.target.value)}
                        required
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              <Modal.Footer style={{ backgroundColor: "black" }}>
              <Button
                  variant="close"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  {edit ? "Update" : "Add"}
                </Button>
              </Modal.Footer>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      <br />
      <br />

      {data.length === 0 ? (
        <div align='center'>
          <br />
          <h1>NO Products Available or your Session expired </h1><br />
          <p>Please login again by Clicking this <a href="http://localhost:3000/admin-login">Admin Login page</a></p>
        </div>
      ) : (
        <div className="container">
          <h1 align="center">Available Products</h1>
          <table className="table table-bordered">
            <thead>
              <tr>
        <th>S.No</th>
        <th>Product</th>
        <th>Product quality</th>
        <th>Product quantity</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map((entry, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{entry.product}</td>
          <td>{entry.quality}</td>
          <td>{entry.quantity}</td>
          <td>
            <Button
                      variant="secondary"
                      onClick={() => handleupdate(entry.id,index)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(entry.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Admindashboard;
