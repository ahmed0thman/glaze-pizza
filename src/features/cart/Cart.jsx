import { Link } from 'react-router-dom';
import Button from '../../ui/components/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCartItems } from './cartSlice';
import { getUser } from '../user/userSlice';

function Cart() {
  const cart = useSelector(getCartItems);
  const { username } = useSelector(getUser);
  const dispatch = useDispatch();

  function handleClear() {
    dispatch(clearCart());
  }

  return (
    <div className="mx-auto max-w-[1200px] sm:px-2">
      <Link to="/menu" className="link mt-2 block">
        &larr; Back to menu
      </Link>

      {cart.length > 0 ? (
        <>
          <h2 className="mt-10 text-2xl font-semibold">
            Your cart, <span className="capitalize">{username}</span>
          </h2>
          <ul className="mt-3 divide-y divide-stone-200 border-b">
            {cart.map((item) => (
              <CartItem item={item} key={item.pizzaId} />
            ))}
          </ul>

          <div className="mt-6 space-x-2">
            <Button to="/order/new">Order pizzas</Button>
            <Button type="secondary" onClick={handleClear}>
              Clear cart
            </Button>
          </div>
        </>
      ) : (
        <h2 className="mt-10 text-2xl font-semibold">Your cart is empty 🛒</h2>
      )}
    </div>
  );
}

export default Cart;
