import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { getProducts, Product } from '../../api/products';
import Container from '../../utils/components/Container';
import classes from './Catalog.module.scss';
import ProductCard from '../../components/ProductCard';
import clsx from 'clsx';

const Catalog: FC = () => {
  const [allProductList, setAllProductList] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [isAvalaibleFilterActive, setAvailableFilterActiveState] = useState(false);

  
  const onClickShowMore = useCallback(() => {
    setPage(page + 1);
  }, [page])

  
  const memoAvailableProductList = useMemo(() => {
    return allProductList.filter((product) => product.quantity_available > 0)
  }, [allProductList])
  
  const memoProductList = useMemo(() => {
    const productList = !isAvalaibleFilterActive ? allProductList : memoAvailableProductList;
    return productList.slice(0, page * 10);
  }, [isAvalaibleFilterActive, allProductList, memoAvailableProductList, page])
  
  useEffect(() => {
    getProducts().then((res) => {
      setAllProductList(res);
    })
  }, [])

  useEffect(() => {
    setPage(1);
  }, [isAvalaibleFilterActive])

  return (
    <Container className={classes.root}>
      <div className={classes.title}>
        <div className={classes['title-text']}>
          <h1>Explore</h1>
          <h2>Buy and sell digital fashion NFT art</h2>
        </div>
        <div className={classes['title-filter']}>
          <div 
            onClick={() => setAvailableFilterActiveState(!isAvalaibleFilterActive)} 
            className={clsx(
              classes['title-filter__checkbox'], 
              isAvalaibleFilterActive && classes['title-filter__checkbox-isChecked']
            )} 
          />
          <span>Filter by availability</span>
        </div>
      </div>
      <div className={classes.products}>
        {
          memoProductList.map((product) => (
            <ProductCard key={product.product_id} data={product} className={classes['products-item']} />
          ))
        }
      </div>
      {
        allProductList.length !== memoProductList.length && (
          <button onClick={onClickShowMore}>Show more</button>
        )
      }
    </Container>
  )
} 

export default Catalog;