import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/components/Button';
import { formatCurrency } from '../../utils/helpers';
import {
  addItem,
  deleteItem,
  getCartItems,
  isItemInCart,
} from '../cart/cartSlice';
import UpdateItem from '../cart/UpdateItem';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const isInCart = useSelector(isItemInCart(id));
  const dispatch = useDispatch();

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };
    dispatch(addItem(newItem));
  }

  function handleRemoveFromCart() {
    dispatch(deleteItem(id));
  }
  return (
    <li className="flex gap-4 py-2 sm:py-3">
      <img
        src={imageUrl}
        alt={name}
        className={`my-auto h-28 w-28 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="captitalize mb-1 text-sm italic text-stone-500 sm:mb-0">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex flex-wrap items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="w-fit bg-red-300/30 px-2 py-1 text-sm font-medium uppercase text-red-600">
              Sold out
            </p>
          )}

          {!soldOut && !isInCart && (
            <Button type={'small'} onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
          {isInCart && (
            <div className="flex grow items-center justify-between gap-2 sm:grow-0 sm:gap-3 md:gap-2">
              <UpdateItem pizzaId={id} />
              <Button type={'small'} onClick={handleRemoveFromCart}>
                Remove
              </Button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
