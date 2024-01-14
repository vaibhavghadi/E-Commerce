import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/Products.css";
import { useNavigate } from "react-router-dom";

export default function Products() {
  let navigate = useNavigate();
  let [proList, setProList] = useState([]);

  let [key, setKey] = useState("");
  useEffect(() => {
    product();
  }, []);

  const product = async () => {
    const result = await fetch("http://localhost:3000/product", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const data = await result.json();
    setProList(data);
  };

  const delete1 = async (id) => {
    const result = await fetch(`http://localhost:3000/delete/${id}`, {
      method: "delete",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const data = await result.json();
    if (data) {
      alert("Product is deleted");
      product();
    } else {
      alert("product is still in a table");
    }
  };

  const search = async (x) => {
    setKey(x.target.value);
    if (key.length > 1) {
      const result = await fetch(`http://localhost:3000/search/${key}`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      const data = await result.json();
      if (data) {
        setProList(data);
      }
    } else {
      product();
    }
  };

  return (
    <div>
      <Navbar />
      <input
        id="search"
        type="text"
        placeholder="Search"
        value={key}
        onChange={(e) => search(e)}
      />
      <table className="table">
        <tbody>
          <tr className="head">
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>MODEL</th>
            <th>COMPANY</th>
          </tr>
          {proList.length > 0 ? (
            proList.map((x, id) => (
              <tr key={x._id}>
                <td>{id + 1}</td>
                <td>{x.name}</td>
                <td>{x.price}</td>
                <td>{x.model}</td>
                <td>{x.company}</td>
                <td>
                  <button className="delete" onClick={() => delete1(x._id)}>
                    {" "}
                    Delete{" "}
                  </button>
                </td>
                <td>
                  <button
                    className="update"
                    onClick={() => navigate(`/update/${x._id}`)}
                  >
                    {" "}
                    Update{" "}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No Results Found{" "}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Footer />
    </div>
  );
}
