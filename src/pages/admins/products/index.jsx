/* eslint-disable no-underscore-dangle */
import { Box } from '@mui/material';
import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  AddButton, AddForm, DashTable, EditForm, SearchInpDash,
} from '../../../dashboardComponents';
import ToastAlert from '../../../components/toastAlert/ToastAlert';

const productInfo = ['title', 'description', 'image', 'price'];
const productDataTable = ['title', 'image', 'price', 'description', 'category'];
const EditProductInfo = ['title', 'image', 'price', 'description'];

const initialState = {
  title: '',
  image: '',
  price: '',
  description: '',
};

const reducer = (state, action) => ({
  ...state,
  [action.filedName]: action.value,
});

const ProductDash = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [productsData, setProductsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setEditShowForm] = useState(false);
  const [oneProduct, setOneProduct] = useState({});

  const values = [
    state.title,
    state.image,
    state.price,
    state.description,
  ];

  const handleChange = (e, filedName) => {
    const { value } = e.target;
    dispatch({
      filedName,
      value,
    });
  };

  const getProducts = async () => {
    try {
      const { data: { products } } = await axios.get('/api/products');
      const productArray = [];
      products.map((product) => productArray.push({
        ...product,
        category: product.categoryId?.categoryName,
      }));
      setProductsData(productArray);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const { data: { categories } } = await axios.get('/api/categories');
      setCategoriesData(categories);
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async () => {
    try {
      await axios.post(`/api/products/${categoryId}`, state);
      getProducts();
      toast.success('Add Product Successfully!', { theme: 'dark' });
    } catch (error) {
      toast.error('Really added!!', { theme: 'dark' });
    }
  };

  const deleteProduct = async (id) => {
    try {
      axios.delete(`/api/products/${id}`);
      getProducts();
      toast.success('Delete Successfully!', { theme: 'dark' });
    } catch (error) {
      toast.error('Delete Failed!', { theme: 'dark' });
    }
  };

  const getProductById = async (id) => {
    const { data: { product } } = await axios.get(`/api/products/${id}`);
    setOneProduct(product);
  };

  const updateProduct = async () => {
    try {
      axios.put(`/api/products/${oneProduct._id}`, state);
      setEditShowForm(false);
      getProducts();
      toast.success('Update successfully!!', { theme: 'dark' });
    } catch (error) {
      toast.error('Update Failed!', { theme: 'dark' });
    }
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);
  return (
    <Box mt={10}>
      <ToastAlert />
      <Box
        sx={{
          display: 'flex',
          gap: 2,
        }}
      >
        <SearchInpDash />
        <AddButton text="Add Products" setShowForm={setShowForm} showForm={showForm} />
      </Box>

      <Box mt={5}>
        <DashTable
          array={productsData}
          userInfo={productDataTable}
          deleteFunction={deleteProduct}
          updateFunction={updateProduct}
          setEditShowForm={setEditShowForm}
          showEditForm={showEditForm}
          getData={getProductById}
        />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
          width: '40%',
          backgroundColor: '#111010',
          p: '20px 20px',
          transform: `translateX(${showForm ? 0 : '100%'})`,
          transition: '0.5s ease-in-out',
        }}
      >
        <AddForm
          setShowForm={setShowForm}
          showForm={showForm}
          productInfo={productInfo}
          axiosData={addProduct}
          setState={handleChange}
          values={values}
          filedName={productInfo}
          head={productInfo}
          selectData={categoriesData}
          setSelectDataId={setCategoryId}
          selectDataId={categoryId}
        />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
          width: '40%',
          backgroundColor: '#111010',
          p: '20px 20px',
          transform: `translateX(${showEditForm ? 0 : '100%'})`,
          transition: '0.5s ease-in-out',
        }}
      >
        <EditForm
          setShowForm={setEditShowForm}
          showForm={showEditForm}
          axiosData={updateProduct}
          setState={handleChange}
          values={oneProduct}
          state={values}
          filedName={productInfo}
          head={EditProductInfo}
        />
      </Box>
    </Box>
  );
};

export default ProductDash;
