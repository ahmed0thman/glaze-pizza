import React from 'react';
import { useFetcher } from 'react-router-dom';
import Button from '../../ui/components/Button';
import { updateOrder } from '../../services/apiRestaurant';

const UpdateOrder = () => {
  const fethcer = useFetcher();
  return (
    <fethcer.Form method="PATCH" className="text-end">
      <Button type={'small'}>make priority</Button>
    </fethcer.Form>
  );
};

export default UpdateOrder;

export async function action({ request, params }) {
  const data = { priority: true };
  const res = await updateOrder(params.orderId, data);
  console.log(res);

  return null;
}
