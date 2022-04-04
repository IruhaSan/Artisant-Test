import axios from 'axios';
import clsx from 'clsx';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { getProducts, Product } from '../../../api/products';
import { updateUrlForStatic } from '../../functions/static';
import classes from './ProductCard.module.scss';

type IProps = {
  data: Product;
  className?: string;
}

const ProductCard: FC<IProps> = ({ data, className }) => {

  const memoAvatar = useMemo<{
    type: 'image' | 'video',
    url: string
  }>(() => { 
    const avatarFileNameParts = data.avatar.original.split('.');
    const avatarFileNameExtension = avatarFileNameParts[avatarFileNameParts.length - 1];
    return {
      type: avatarFileNameExtension === 'mp4' ? 'video' : 'image', 
      url: updateUrlForStatic(data.avatar.original),
    }
  }, [data.avatar.original])

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.promo}>
        <div className={classes['promo-image']}>
          {
            memoAvatar.type === 'video' ? (
              <video src={memoAvatar.url}></video>
            ) : (
              <img src={memoAvatar.url} alt="" />
            )
          }
        </div>
        <div className="promo-content">
          <div className={classes['promo-content__author']}>
            <span>Created by</span>
            <p>{data.createdBy}</p>
          </div>
          <div className={classes['promo-content__addiction']}>
            <span>{data.name}</span>
          </div>
        </div>
      </div>
      <div className={classes.info}>
      </div>
    </div>
  )
} 

export default ProductCard;