import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { getProducts, Product } from '../../../api/products';
import CatalogItem from '../ProductCard/ProductCard';
import Container from '../Container/Container';
import classes from './Catalog.module.scss';
import ProductCard from '../ProductCard/ProductCard';

const Catalog: FC = () => {
  const [products, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then((res) => {
      setProduct(res);
    })
  }, [])

  return (
    <Container className={classes.root}>
      <h1>Explore</h1>
      <h2>Buy and sell digital fashion NFT art</h2>
      <div className={classes.products}>
      {
        products.slice(0, 10).map((product) => (
          <ProductCard data={product} className={classes['products-item']} />            
        ))
      }
      </div>
    </Container>
  )
} 

export default Catalog;