import clsx from 'clsx';
import React, { FC } from 'react'
import classes from './Container.module.scss';

type IProps = {
  id?: string;
  wrapperClassName?: string;
  className?: string;
}

const Container: FC<IProps> = ({ children, wrapperClassName, className }) => {
  return (
    <div className={clsx(classes.root, wrapperClassName)}>
      <div className={clsx(classes.content, className)}>
        {children}
      </div>
    </div>
  )
}

export default Container