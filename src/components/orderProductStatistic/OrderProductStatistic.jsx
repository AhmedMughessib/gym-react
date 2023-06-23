import React from 'react';
import { Box, Typography } from '@mui/material';

const OrderProductStatistic = ({ product }) => (
  <Box sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '200px',
    borderBottom: '1px solid #ccc',
    p: '10px',
  }}
  >
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
    }}
    >
      <img
        src="https://www.shutterstock.com/image-photo/photo-sport-equipment-gym-dumbbells-260nw-564818077.jpg"
        width="30px"
        height="30px"
        alt="pic-order-product"
        style={{
          borderRadius: '50%',
          marginRight: '10px',
          boxShadow: '0 4px 4px 0 #C4C4C4',
        }}
      />
      <Typography variant="h6">{product}</Typography>
    </Box>
    <Box>
      <Typography variant="h6">30K</Typography>
    </Box>

  </Box>
);

export default OrderProductStatistic;
