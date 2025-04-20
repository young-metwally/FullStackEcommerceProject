import React, { useState } from "react";
import axios from "axios";

const AddProduct = ({ onProductAdded }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, price, stock } = product;

    // Validate that all fields are filled out
    if (!name || !description || !price || !stock) {
      setError("❌ All fields are required! Please fill them in before submitting.");
      return;
    }

    // Clear any previous errors
    setError("");
    const apiUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

    try {
      await axios.post(`${apiUrl}/api/products`, product);
      alert("✅ Product added successfully!");
      setProduct({ name: "", description: "", price: "", stock: "" });
      if (onProductAdded) onProductAdded();
    } catch (error) {
      console.error("Error adding product:", error);
      setError("❌ There was an error adding the product. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="mb-2">
        <input type="text" name="name" placeholder="Name" value={product.name} onChange={handleChange} className="form-control mb-2" />
        <input type="text" name="description" placeholder="Description" value={product.description} onChange={handleChange} className="form-control mb-2" />
        <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} className="form-control mb-2" />
        <input type="number" name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} className="form-control mb-2" />
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
