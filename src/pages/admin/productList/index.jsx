import { useState, useEffect } from 'react';
import axios from 'axios';
import { userInfo, columns } from '../../../dummyData/productData';
import DashBoardLayOut from '../LayOut';

const ProductListDashboard = () => {
  const [rows, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await axios.get('/api/products');
    setProducts(response.data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (<DashBoardLayOut userInfo={userInfo} columns={columns} rows={rows} />);
};

export default ProductListDashboard;
