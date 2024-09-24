import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchProducts, createProduct,updateProduct,deleteProduct } from "../api";

const Admin = () => {
  
  const [showP, setShowP] = useState(false);

  const [data, setData] = useState([]);

  const [product,setProduct]=useState('')
  const [quality, setquality] = useState(null);
  const [quantity, setquentity] = useState(null);

  const [edit,setedit]=useState(null)
 

  useEffect(() => {
    fetchProducts().then(data => setData(data));
  }, []);

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (quality > 5 || quality < 0) {
      alert("Enter Quality between range (1-5)");
      return;
    }
      
    if (edit){
      updateProduct( edit,{ product, quality, quantity });
    }
    else{
     createProduct({product,quality,quantity})
    }
  };

  const handleupdate=(id,index)=>{
    setProduct(data[index].product)
    setquality(data[index].quality);
    setquentity(data[index].quantity);
    setShowP(true)
    setedit(id)

  }

  
  const handleDelete = (id) => {
      deleteProduct(id).then(() => {
        setData(data.filter((product) => product.id !== id));
      });
    };

  const handleShowP = () => {
    setShowP(true);
  };

  return (
    <>
      <br />
      <p align="right" className="container">
        <Button variant="primary" onClick={() => handleShowP()}>
          Add Product
        </Button>
      </p>
      <Modal show={showP}>
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
                  type="submit"
                  variant="primary"
                  onClick={() => {
                    setShowP(false);
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

      {data.length > 0 && (
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

export default Admin;
