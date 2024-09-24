import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form"; // Import Form for input fields
import { fetchProducts, purchaceProduct } from "../api";

const User = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [buy, setBuy] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(null);
  

  useEffect(() => {
    fetchProducts().then((data) => setData(data));
  }, []);

  const handleClose = () => {
    setShow(false);
    setBuy(0);
  };

  const handleShow = (index) => {
    setCurrentIndex(index);
    setShow(true);
  };

  const handleBuy = () => {
    if (currentIndex !== null) {
      const selectedProduct = data[currentIndex];

      if (buy <= 0 || buy > selectedProduct.quantity) {
        alert("Invalid purchase quantity");
        return;
      }

       const Product = {
         product: selectedProduct.product,
         quality: selectedProduct.quality,
         quantity: buy,
       };

       purchaceProduct(selectedProduct.id, Product).then(() => {
         const updatedData = [...data];
         updatedData[currentIndex].quantity -= buy;
         setData(updatedData);
         handleClose();
       });
    }
  };

  return (
    <>
      {data.length === 0 ? (
        <h1 style={{ textAlign: "center" }}>
          NO PRODUCTS AVAILABLE FOR PURCHASE
        </h1>
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
                    <Button variant="primary" onClick={() => handleShow(index)}>
                      Buy
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {currentIndex !== null && (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Purchase {data[currentIndex].product}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Product quality: {data[currentIndex].quality}</p>
                <p>Available quantity: {data[currentIndex].quantity}</p>
                <Form.Group>
                  <Form.Label>Enter quantity to purchase</Form.Label>
                  <Form.Control
                    type="number"
                    value={buy}
                    onChange={(e) => setBuy(Number(e.target.value))}
                    min="1"
                    max={data[currentIndex].quantity}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleBuy}>
                  Confirm Purchase
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

export default User;
