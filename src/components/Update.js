import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Update() {
  let [name, setName] = useState("");
  let [price, setPrice] = useState(0);
  let [model, setModel] = useState("");
  let [company, setCompany] = useState("");

  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    fill();
  }, []);

  const fill = async () => {
    const result = await fetch(`http://localhost:3000/update/${params.id}`, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const data = await result.json();
    if (data) {
      setName(data.name);
      setModel(data.model);
      setPrice(data.price);
      setCompany(data.company);
    } else {
      alert("product is not fetched");
    }
  };

  const update1 = async () => {
    const result = await fetch(`http://localhost:3000/update/${params.id}`, {
      method: "put",
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
    const data = await result.json();
    if (data) {
      alert("Product is updated");
      navigate("/");
    } else {
      alert("product is still same");
    }
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
                value="Update Product"
                onClick={() => update1()}
              />
            </li>
          </ul>
        </div>
      </div>

      <Footer className="foot" />
    </div>
  );
}
