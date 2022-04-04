import clsx from 'clsx';
import React, { FC, useCallback, useMemo, useRef } from 'react';
import { Product } from '../../api/products';
import { updateUrlForStatic } from '../../utils/functions/static';
import classes from './ProductCard.module.scss';

type IProps = {
  data: Product;
  className?: string;
}

const ProductCard: FC<IProps> = ({ data, className }) => {

  const videoRef = useRef<HTMLVideoElement>(null);
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
  }, [data])

  const onVideoHover = useCallback((type: 'enter' | 'leave') => () => {
    if (memoAvatar.type !== 'video') return;
    if (!videoRef.current) return;

    const videoAsMediaElement = videoRef.current as HTMLMediaElement;

    if (type === 'enter') videoAsMediaElement.play()
    else {
      videoAsMediaElement.currentTime = 0;
      videoAsMediaElement.pause();
    }
  }, [memoAvatar.type])

  return (
    <div 
      className={clsx(classes.root, className)}
      onMouseEnter={onVideoHover('enter')}
      onMouseLeave={onVideoHover('leave')} 
    >
      <div className={classes.promo}>
        <div className={classes['promo-image']}>
          {
            memoAvatar.type === 'video' ? (
              <video
                ref={videoRef}
                muted
                src={memoAvatar.url}
              ></video>
            ) : (
              <img src={memoAvatar.url} alt="" />
            )
          }
        </div>
        <div className={classes['promo-content']}>
          <div className={classes['promo-content__author']}>
            <span>Created by</span>
            <p>{data.created_by.display_name}</p>
          </div>
          <div className={classes['promo-content__addiction']}>
            <span>{data.name}</span>
          </div>
        </div>
      </div>
      <div className={classes.info}>
        <div className={classes['info-available']}>
          <span>available</span>
          <p>{data.quantity_available} of {data.quantity}</p>
        </div>
        <div className={classes['info-price']}>
          <span>price</span>
          <p>{data.initial_price} ETH</p>
        </div>
      </div>
    </div>
  )
} 

export default ProductCard;