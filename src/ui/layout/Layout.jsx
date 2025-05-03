import React from 'react';
import Header from './Header';
import CartOverview from '../../features/cart/CartOverview';
import { Outlet, useNavigation } from 'react-router-dom';
import Spinner from '../shared/Spinner';

const Layout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {/* {true && <Spinner />} */}
      {isLoading && <Spinner />}
      <Header />
      <main className="overflow-auto px-2 sm:px-4">
        <div className="mx-auto max-w-[1200px]">
          <Outlet />
        </div>
      </main>
      <CartOverview />
    </div>
  );
};

export default Layout;
