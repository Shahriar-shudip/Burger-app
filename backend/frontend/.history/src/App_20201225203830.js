import React, { useState, useEffect } from "react";
import axios from "axios";
import Shop from "./shop";
import SplitPane from "react-split-pane";
import Cart from "./cart";
import { Card, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Route, Link, Router, Redirect } from "react-router-dom";
import Login from "./Login";
import Signup from "./SIgnup";
export default () => {
  const [products, setProducts] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setSignup] = useState(false);
  const show = useSelector((state) => (state ? state.showLogin : showLogin));
  const signup = useSelector((state) =>
    state ? state.showSignup : showSignup
  );
  const [cart, showCart] = useState(false);
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:9000/products");
    setProducts(res.data);
    dispatch({ type: "add-post", payload: products });
  };

  useEffect(
    () => {
      fetchProducts();
    },
    [products.length],
   
  );
  return (
    <div
      style={{
        backgroundColor: "#212121",
        backgroundSize: "cover",
        minHeight: "1000px",
      }}
    >
      <div classNam="n">
        <Navbar style={{ backgroundColor: "#ff732b" }} expand="lg">
          <Navbar.Brand href="/Signup">Signup</Navbar.Brand>
          {localStorage.getItem("authTrue") === "true" ? (
            <button
              style={{ backgroundColor: "color|transparent" }}
              onClick={(e) => {
                localStorage.setItem("authTrue", "false");
                window.location.reload(true);
              }}
            >
              Log out
            </button>
          ) : (
            <button
              style={{ backgroundColor: "color|transparent" }}
              onClick={(e) => {
                e.preventDefault();
                setShowLogin((state) => !state);
                dispatch({ type: "showLogin", payload: showLogin });
              }}
            >
              Login
            </button>
          )}
          <Link to={"/signup"}>
            <button> Sign up</button>
          </Link>
        </Navbar>
      </div>

      <div style={{ maxWidth: "1300px" }}>
        {show ? <Signup /> : <Shop list={products} />}
      </div>

      <div>
        {localStorage.getItem("authTrue") === "true" ? <Cart /> : <div></div>}
      </div>
    </div>
  );
};
