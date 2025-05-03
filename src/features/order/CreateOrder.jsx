import { useEffect, useState } from 'react';
import {
  Form,
  redirect,
  replace,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCartItems, getTotalPrice } from '../cart/cartSlice';
import store from '../../store/store';
import {
  fetchAddress,
  getError,
  getStatus,
  getUser,
  updateUser,
} from '../user/userSlice';
import { formatCurrency } from '../../utils/helpers';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const cart = useSelector(getCartItems);
  const navigate = useNavigate();
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch();
  const actionErrors = useActionData();
  const navigation = useNavigation();
  const { username, phone, address } = useSelector(getUser);
  const [userAddress, setUserAddress] = useState(address);
  const status = useSelector(getStatus);
  const addressError = useSelector(getError);
  const isLoading = status === 'loading';
  const isSubmitting = navigation.state === 'submitting';
  const totalPrice = useSelector(getTotalPrice) * (withPriority ? 1.2 : 1);

  // useEffect(() => {
  //   if (cart.length === 0) {
  //     console.log(cart.length);
  //     navigate('/menu');
  //   }
  // }, [navigate]);

  useEffect(
    function () {
      setUserAddress(address);
    },
    [address],
  );

  return (
    <div className="mx-2 my-2 sm:mx-6 sm:my-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      {/* <Form method="POST"> */}
      <Form method="POST" action="/order/new">
        <div className="form-group">
          <label className="sm:basis-40">Customer Name</label>
          <div className="grow">
            <input
              className="text-input w-full"
              type="text"
              defaultValue={username}
              name="customer"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              className="text-input w-full"
              type="tel"
              name="phone"
              defaultValue={phone}
              required
            />

            {actionErrors?.phone && (
              <p className="mx-2 mt-3 w-fit bg-red-100 px-2 py-1 text-xs text-red-700">
                {actionErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="form-group relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow gap-1">
            <input
              className="text-input w-full"
              type="text"
              name="address"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value.trim())}
              placeholder={isLoading ? 'Loading address pleas wait...' : ''}
              disabled={isLoading}
              required
            />
            {addressError && !userAddress && (
              <p className="mx-2 mt-3 w-fit bg-red-100 px-2 py-1 text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>
          <span className="absolute end-1 top-[2.2rem] sm:top-[3px]">
            {!userAddress && (
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  setUserAddress('');
                  dispatch(fetchAddress());
                }}
              >
                get position
              </Button>
            )}
          </span>
        </div>

        <div className="mb-14 flex items-center gap-5">
          <input
            type="checkbox"
            className="h-5 w-5 border-none accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting}>
            {isSubmitting
              ? 'placing order ...'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  store.dispatch(updateUser(order.customer, order.phone, order.address));
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
