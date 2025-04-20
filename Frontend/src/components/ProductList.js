import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [showInfo, setShowInfo] = useState({}); // Track which product's info is being shown
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: ""
  });

  const apiUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/products`);
      setProducts(response.data);
      setError("");
    } catch (error) {
      setError("❌ Unable to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`${apiUrl}/api/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      alert("✅ Product deleted successfully!");
    } catch (error) {
      setError("❌ Failed to delete product. Please try again later.");
    }
  };

  const handleUpdate = (product) => {
    setEditProduct(product);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock
    });
  };

  const toggleInfo = (id) => {
    setShowInfo(prevState => ({ ...prevState, [id]: !prevState[id] })); // Toggle visibility of product info
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!editForm.name || !editForm.description || !editForm.price || !editForm.stock) {
      setError("❌ All fields are required to update the product.");
      return;
    }

    try {
      const response = await axios.put(`${apiUrl}/api/products/${editProduct.id}`, editForm);
      const updatedProduct = response.data;

      setProducts(products.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      ));
      
      setEditProduct(null);
      alert("✅ Product updated successfully!");
    } catch (error) {
      setError("❌ Failed to update product. Please try again later.");
    }
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? <p>Loading products...</p> : null}

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <div>
              <strong>{product.name}</strong> - ${product.price}
            </div>
            <div>
              <button 
                onClick={() => toggleInfo(product.id)} 
                className="btn btn-info btn-sm me-2"
              >
                Info
              </button>
              <button 
                onClick={() => handleUpdate(product)} 
                className="btn btn-warning btn-sm me-2"
              >
                Update
              </button>
              <button 
                onClick={() => handleDelete(product.id)} 
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>

            {showInfo[product.id] && (
              <div className="product-info mt-2">
                <p><strong>Description:</strong> {product.description || "No description provided."}</p>
                <p><strong>Stock:</strong> {product.stock || "Stock not specified."}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {editProduct && (
        <div className="update-form-container mt-4">
          <h3>Update Product</h3>
          <form onSubmit={handleUpdateSubmit}>
            <input
              type="text"
              name="name"
              value={editForm.name}
              onChange={handleChange}
              placeholder="Name"
              className="form-control mb-2"
            />
            <input
              type="text"
              name="description"
              value={editForm.description}
              onChange={handleChange}
              placeholder="Description"
              className="form-control mb-2"
            />
            <input
              type="number"
              name="price"
              value={editForm.price}
              onChange={handleChange}
              placeholder="Price"
              className="form-control mb-2"
            />
            <input
              type="number"
              name="stock"
              value={editForm.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="form-control mb-2"
            />
            <button type="submit" className="btn btn-primary me-2">Save</button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => setEditProduct(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductList;
