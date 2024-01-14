import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";
import "../styles/Add.css";

export default function Add() {
  let [name, setName] = useState("");
  let [price, setPrice] = useState(0);
  let [model, setModel] = useState("");
  let [company, setCompany] = useState("");

  const product = async () => {
    const result = await fetch("http://localhost:3000/add", {
      method: "post",
      body: JSON.stringify({
        name: name,
        price: price,
        model: model,
        company: company,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });

    const data = await result;
    if (data.status === 200) {
      alert("you are susccesfully added the product!!!");
    }

    setName("");
    setModel("");
    setPrice("");
    setCompany("");
  };

  return (
    <div className="products">
      <Navbar />
      <div className="signupSection">
        <div className="info">
          <h2>Mission to Deep Space</h2>

          <p>The Future Is Here</p>
        </div>
        <div className="signupForm" name="signupform">
          <h2>Product Details</h2>
          <ul className="noBullet">
            <li>
              <input
                type="text"
                className="inputFields"
                id="name"
                name="name"
                placeholder="Name of Customer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </li>
            <li>
              <input
                type="number"
                className="inputFields"
                id="price"
                name="price"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </li>
            <li>
              <input
                type="text"
                className="inputFields"
                id="model"
                name="model"
                placeholder="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />
            </li>
            <li>
              <input
                type="text"
                className="inputFields"
                id="company"
                name="comapny"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </li>
            <li id="center-btn">
              <input
                type="button"
                id="join-btn"
                name="join"
                value="Add Product"
                onClick={product}
              />
            </li>
          </ul>
        </div>
      </div>

      <Footer className="foot" />
    </div>
  );
}
