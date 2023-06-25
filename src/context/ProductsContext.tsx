import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { IItems } from '../types';

import { getDocs } from "firebase/firestore";

import { productsCollection } from '../db/fireStore';

const ProductsContext = createContext<IItems[] | undefined>(undefined);

export const useProductsContext = () =>{
  if (ProductsContext) return useContext(ProductsContext);
};

interface Props  {
  children: ReactNode
}

const ProductsProvider = ({ children }: Props ) => {

  const [products, setProducts] = useState<IItems[]>([]);

  const getProductsData = async () : Promise<void> =>{

    const querySnapshot = await getDocs(productsCollection);

    const products: IItems[] = [];

    querySnapshot.forEach( doc =>{
      products.push(doc.data() as IItems);
    });

    const productsFilterd = products.filter( product =>{
      return product.item_product_id !== ""
    });

    setProducts(productsFilterd);

  };

  useEffect(() => {
    getProductsData();
  }, []);


  return (
    <ProductsContext.Provider value={products}>
      { children }
    </ProductsContext.Provider>
  )
}

export default ProductsProvider;