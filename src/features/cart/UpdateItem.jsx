import React from 'react';
import Button from '../../ui/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseItemQuantity,
  getItemQuantity,
  increaseItemQuantity,
} from './cartSlice';

const UpdateItem = ({ pizzaId }) => {
  const dispatch = useDispatch();

  const quantity = useSelector(getItemQuantity(pizzaId));
  function handleDecrease() {
    dispatch(decreaseItemQuantity(pizzaId));
  }
  function handleIncrease() {
    dispatch(increaseItemQuantity(pizzaId));
  }
  return (
    <div className="flex items-center gap-2 md:gap-4">
      <Button type="round" onClick={handleIncrease}>
        +
      </Button>
      <span>{quantity}</span>
      <Button type="round" onClick={handleDecrease}>
        -
      </Button>
    </div>
  );
};

export default UpdateItem;
