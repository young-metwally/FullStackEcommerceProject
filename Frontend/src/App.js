import React from "react";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import './App.css'; 

function App() {
    return (
        <div className="app-background">
            <div className="main-content">
                <h1 className="text-center text-light bg-dark p-3 rounded mb-2">E-commerce Store</h1>
                <div className="mb-2">
                    <AddProduct />
                </div>
                <div className="mb-2">
                    <ProductList />
                </div>
            </div>
        </div>
    );
}

export default App;
