import { useDispatch } from 'react-redux';
import Button from '../../ui/components/Button';
import { formatCurrency } from '../../utils/helpers';
import { deleteItem } from './cartSlice';
import UpdateItem from './UpdateItem';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();

  function handleDeleteItem() {
    dispatch(deleteItem(pizzaId));
  }

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-2 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="justify-be flex items-center justify-between gap-3 sm:gap-6">
        <p className="grow text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItem pizzaId={pizzaId} />
        <Button type="small" onClick={handleDeleteItem}>
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
