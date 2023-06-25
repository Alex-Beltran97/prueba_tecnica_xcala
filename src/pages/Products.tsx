import React, { useState, useEffect } from 'react';

import { IItems } from '../types';

import { useProductsContext } from '../context/ProductsContext';

const Products = () => {

  const products = useProductsContext();

  return (<>
    <h1>Products</h1>    
    <hr />
    <ul>
      { products!.map( (product: IItems, id) =>(
        <li key={ product.item_product_id ? product.item_product_id : id } style={{ marginLeft: '4rem'}}>
          <img src={product.sku_img_src} alt="" width="120px" />
          <p>ID: { product.item_product_id ? product.item_product_id : "No tiene" }</p>
          <p>Sku: { product.item_product_sku ? product.item_product_sku : "No tiene" }</p>
          <p>Value: { product.item_value ? product.item_value : "No tiene" }</p>
          <hr />
        </li>
      )) }
    </ul>
  </>
  );
};

export default Products;