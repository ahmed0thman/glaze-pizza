import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { getTotalItems, getTotalPrice } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const totalItems = useSelector(getTotalItems);
  const totalPrice = useSelector(getTotalPrice);
  return (
    <div className="bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <p className="space space-x-4 font-semibold text-stone-300 sm:space-x-6">
          <span>{totalItems} pizzas</span>
          <span>{formatCurrency(totalPrice)}</span>
        </p>
        <Link to={'/cart'}>Open cart &rarr;</Link>
      </div>
    </div>
  );
}

export default CartOverview;
