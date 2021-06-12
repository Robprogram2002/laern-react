import React, {useContext} from 'react';
//import { useSelector } from 'react-redux';

import ProductItem from '../components/Products/ProductItem';
import {useStore} from '../hooks-store/globalState';
import './Products.css';
//import {ProductsContext} from '../context/products-context';

const Products = props => {
  //const productList = useSelector(state => state.shop.products);
  //const productList = useContext(ProductsContext).products;

  const [state, dispatch] = useStore();

  const productList = state.products;
  
  return (
    <ul className="products-list">
      {productList.map(prod => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;
