'use client';

import { useState } from 'react';
import ProductChart from './ProductChart'; // Assuming you have this file in the same folder

export default function ProductsPage() {
    const [products, setProducts] = useState([
        { id: 1, name: 'Lipstick', price: 100, stock: 50, status: 'active', type: 'cosmetics' },
        { id: 2, name: 'Handbag', price: 200, stock: 20, status: 'inactive', type: 'accessories' },
        { id: 3, name: 'Smartphone', price: 150, stock: 10, status: 'active', type: 'electronics' },
    ]);

    const [newProduct, setNewProduct] = useState({
        name: '',
        price: 0,
        stock: 0,
        status: 'active',
        type: '',
    });

    const [filter, setFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // Add state for search term
    const [showForm, setShowForm] = useState(false);

    const handleAddProduct = () => {
        // Validation check to ensure no empty or invalid values
        if (!newProduct.name || newProduct.price <= 0 || newProduct.stock <= 0 || !newProduct.type) {
            alert('Please fill out all fields correctly before adding a product.');
            return;
        }

        const newProductId = products.length + 1;
        const newProductData = { id: newProductId, ...newProduct };
        setProducts([...products, newProductData]);

        // Reset form after adding product
        setNewProduct({ name: '', price: 0, stock: 0, status: 'active', type: '' });
        setShowForm(false);
    };

    const handleDeleteProduct = (productId) => {
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
    };

    // Add logic to filter by search term and product type
    const filteredProducts = products.filter(product => {
        const matchesFilter = filter ? product.type === filter : true;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <h2>Dashboard</h2>
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Products</a></li>
                        <li><a href="#">Categories</a></li>
                        <li><a href="#">Orders</a></li>
                    </ul>
                </nav>
            </aside>

            <main className="main-content">
                <header className="header">
                    <h1>Product Dashboard</h1>
                    <div className="filter">
                        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                            <option value="">All Products</option>
                            <option value="cosmetics">Cosmetics</option>
                            <option value="accessories">Accessories</option>
                            <option value="electronics">Electronics</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Search..."
                            className="search"
                            value={searchTerm} // Bind search term state to input
                            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                        />
                    </div>
                </header>

                {/* Chart Component */}
                <ProductChart products={products} />

                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.stock}</td>
                                <td><span className={product.status === 'active' ? 'active' : 'inactive'}>{product.status}</span></td>
                                <td>{product.type}</td>
                                <td>
                                    <button onClick={() => handleDeleteProduct(product.id)} className="delete-button">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button onClick={() => setShowForm(!showForm)} className="toggle-form-button">
                    {showForm ? 'Hide Form' : 'Add New Product'}
                </button>

                {showForm && (
                    <div className="add-product-form">
                        <h2>Add New Product</h2>
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Stock"
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                        />
                        <select
                            value={newProduct.type}
                            onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
                        >
                            <option value="">Select Product Type</option>
                            <option value="cosmetics">Cosmetics</option>
                            <option value="accessories">Accessories</option>
                            <option value="electronics">Electronics</option>
                        </select>
                        <select
                            value={newProduct.status}
                            onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <button onClick={handleAddProduct} className="add-button">Add Product</button>
                    </div>
                )}
            </main>
        </div>
    );
}