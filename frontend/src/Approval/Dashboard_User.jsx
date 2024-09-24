import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  fetch_Products,
  purchaceProduct,
  fetch_Cart_items,
  Addtocart,
  cartdeleteProduct,
  updatecartitem,
} from "../api";

const Userdashboard = () => {
  const [User, setUser] = useState();

  const [data, setData] = useState([]);
  const [cartData, setCartdata] = useState([]);

  const [show, setShow] = useState(false);
  const [showcartitems, Setshowcartitems] = useState(false);

  const [error, setError] = useState(null);

  const [Purchace, setPurchace] = useState(null);
  const [cart, setCart] = useState(null);
  const [cartedit, setCartedit] = useState(true);

  const [currentProduct, setCurrentProduct] = useState(null);

  const [buy, setBuy] = useState(0);

  const location = useLocation();

  const { id } = location.state || {};

  useEffect(() => {
    axios
      .get(`${"http://127.0.0.1:8000/api/Register-user/"}${id}/`)
      .then((response) => {
        setUser(response.data);
        if (response.data.status === true) {
          fetch_Products()
            .then((data) => setData(data))
            .catch((error) => {
              console.log("There was an error fetching the Products!", error);
              setError("Somthing went wrong");

            });
          fetch_Cart_items(id)
            .then((cartItems) => setCartdata(cartItems))
            .catch((error) => {
              console.log(
                "There was an error fetching the user cacrt items!",
                error
              );
            });
        }
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.detail);
        } else {
          console.log("There was an error in Fetching User details!", error);
        }
      });
  }, [id]);

  const handlePurchase = (index) => {
    setCart(null);
    setCartedit(null);
    setPurchace(index);
    setCurrentProduct(index);
    setShow(true);
  };

  const handleCart = (index) => {
    if (cartData.find((item) => item.product === data[index].id)) {
      alert("Selected item is already in cart");
      return;
    }
    setPurchace(null);
    setCartedit(null);
    setCart(index);
    setCurrentProduct(index);
    setShow(true);
  };

  const handleCartedit = (index) => {
    setPurchace(null);
    setCart(null);
    setCartedit(index);
    setCurrentProduct(index);
    setBuy(cartData[index].cart_quantity);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setBuy(0);
  };

  const handlecartpurchase = () => {
    cartData.forEach((currentitem) => {
      if (
        data.find((item) => item.id === currentitem.product).quantity >=
        currentitem.cart_quantity
      ) {
        purchaceProduct(currentitem.product, {
          product: data.find((item) => item.id === currentitem.product).product,
          quality: data.find((item) => item.id === currentitem.product).quality,
          quantity: currentitem.cart_quantity,
        }).then(() => {
          cartdeleteProduct(currentitem.id).then(() => {
            fetch_Products()
              .then((data) => setData(data))
              .catch((error) => {
                console.log("There was an error fetching the Products!", error);
            });

           fetch_Cart_items(id)
             .then((cartItems) => setCartdata(cartItems))
             .catch((error) => {
               console.log(
                 "There was an error fetching the user cacrt items!",
                 error
               );
               setError("Somthing went wrong");
             });
          });
        });
      } else {
        alert(
          `Available Quantity for ${
            data.find((item) => item.id === currentitem.product).product
          } is  ${
            data.find((item) => item.id === currentitem.product).quantity
          }`
        );
      }
    });
  };

  const ShowCart = () => {
    Setshowcartitems(true);
  };

  const handleSubmit = () => {
    if (Purchace !== null) {
      const selectedProduct = data[Purchace];

      if (buy <= 0 || buy > selectedProduct.quantity) {
        alert("Invalid purchase quantity");
        return;
      }

      const Product = {
        product: selectedProduct.product,
        quality: selectedProduct.quality,
        quantity: buy,
      };

      purchaceProduct(selectedProduct.id, Product)
        .then(() => {
          fetch_Products()
            .then((data) => setData(data))
            .catch((error) => {
              console.log("There was an error fetching the Products!", error);
            });
          handleClose();
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            setError(error.response.data.error);
          } else {
            console.log("There was an error in purchasing product!", error);
          }
        });
    } else if (cart !== null) {
      const selectedProduct = data[cart];

      if (buy <= 0 || buy > selectedProduct.quantity) {
        alert("Invalid purchase quantity");
        return;
      }

      const Product = {
        Approval_user: User.id,
        product: selectedProduct.id,
        cart_quantity: buy,
      };

      Addtocart(Product)
        .then(() => {
          fetch_Cart_items(User.id)
            .then((cartItems) => setCartdata(cartItems))
            .catch((error) => {
              console.log(
                "There was an error in fetching cart after adding new product to cart!",
                error
              );
            });
          handleClose();
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            setError(error.response.data.error);
          } else {
            console.log("There was an error in adding aitem product!", error);
          }
        });
    } else if (cartedit !== null) {
      const selectedProduct = cartData[cartedit];

      if (
        buy <= 0 ||
        buy > data.find((item) => item.id === selectedProduct.product).quantity
      ) {
        alert("Invalid purchase quantity");
        return;
      }

      const Product = {
        Approval_user: User.id,
        product: selectedProduct.product,
        cart_quantity: buy,
      };

      updatecartitem(cartData[cartedit].id, Product)
        .then(() => {
          fetch_Cart_items(User.id)
            .then((cartItems) => setCartdata(cartItems))
            .catch((error) => {
              console.log(
                "There was an error in fetching cart after updating product quentity in cart!",
                error
              );
              setError("Somthing went wrong");
            });
          handleClose();
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            setError(error.response.data.error);
          } else {
            console.log("There was an error in purchasing product!");
            setError("Somthing went wrong");
          }
        });
    }
  };

  return (
    <>
      {error && (
        <p style={{ color: "red" }} align="center">
          {error}
        </p>
      )}

      <h1 align="center" style={{ textDecoration: "underline" }}>
        USER DASHBOARD
      </h1>
      {User ? (
        <div>
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="container"
          >
            <h2>Username:-{User.name}</h2>
            <h2 align="center">
              Status:
              {User.status === null && (
                <span style={{ color: "orange" }}>Pending...</span>
              )}
              {User.status === false && (
                <span style={{ color: "red" }}>Rejected</span>
              )}
              {User.status === true && (
                <span style={{ color: "green" }}>Success</span>
              )}
            </h2>
          </div>
          <p align="right" className="container">
            <Button variant="success" onClick={ShowCart}>
              CART
            </Button>
          </p>
        </div>
      ) : (
        <div>
          <h1 align="center" style={{ color: "red" }}>
            Please Login{" "}
          </h1>
          <p align="center">
            click here to goto{" "}
            <a href="http://localhost:3000/user-login">User login page</a>
          </p>
        </div>
      )}
      <br />
      <br />
      {data.length === 0 ? (
        <h1 style={{ textAlign: "center" }}>
          NO PRODUCTS AVAILABLE FOR PURCHASE
        </h1>
      ) : (
        <div className="container">
          <h1 align="center">Available Products</h1>
          <table className="table table-bordered ">
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
                      onClick={() => handleCart(index)}
                    >
                      Add to cart
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handlePurchase(index)}
                    >
                      Buy
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {currentProduct !== null && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {Purchace !== null && "Purchace"}
              {cart !== null && "Add To Cart"}
              {cartedit !== null && "Edit Cart Item"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {(Purchace !== null || cart !== null) && (
              <span>
                <p>Product name :{data[currentProduct].product}</p>
                <p>Product quality: {data[currentProduct].quality}</p>
                <p>Available quantity: {data[currentProduct].quantity}</p>
              </span>
            )}

            {cartedit !== null && (
              <span>
                <p>
                  Product name :
                  {
                    data.find(
                      (item) => item.id === cartData[currentProduct].product
                    ).product
                  }
                </p>
                <p>
                  Product quality:
                  {
                    data.find(
                      (item) => item.id === cartData[currentProduct].product
                    ).quality
                  }
                </p>
                <p>
                  Available quantity:
                  {
                    data.find(
                      (item) => item.id === cartData[currentProduct].product
                    ).quantity
                  }
                </p>
              </span>
            )}

            <Form.Group>
              <label>
                Enter quantity to
                {Purchace !== null && " Purchace"}
                {cart !== null && " Add To Cart"}
                {cartedit !== null && " change "}
                :-{" "}
              </label>
              <input
                type="number"
                value={buy}
                onChange={(e) => setBuy(Number(e.target.value))}
                min="1"
                max={data[currentProduct].quantity}
                style={{ width: "250px" }}
              />
            </Form.Group>
            {error && (
              <p style={{ color: "red" }} align="center">
                {error}
              </p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {
        <Modal show={showcartitems} onHide={() => Setshowcartitems(false)}>
          <Modal.Header closeButton>
            <Modal.Title>CART</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {cartData.length === 0 ? (
              <h2 align="center">No items in Cart</h2>
            ) : (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Product</th>
                    <th>Quality</th>
                    {/* <th>Available Quantity</th> */}
                    <th>Quantity</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((entry, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {data.find((item) => item.id === entry.product).product}
                      </td>
                      <td>
                        {data.find((item) => item.id === entry.product).quality}
                      </td>
                      {/* <td>{data.find(item =>item.id===entry.product).quantity}</td> */}
                      <td>{entry.cart_quantity}</td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => handleCartedit(index)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => {
                            cartdeleteProduct(entry.id).then(() => {
                              setCartdata(
                                cartData.filter(
                                  (product) => product.id !== entry.id
                                )
                              );
                            });
                          }}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => Setshowcartitems(false)}>
              Close
            </Button>
            {cartData.length !== 0 && (
              <Button variant="primary" onClick={handlecartpurchase}>
                Buy now
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      }
    </>
  );
};

export default Userdashboard;
