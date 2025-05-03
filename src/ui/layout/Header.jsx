import React from 'react';
import { Link } from 'react-router-dom';
import SearchOrder from '../../features/order/SearchOrder';
import UserName from '../../features/user/UserName';

const Header = () => {
  return (
    <header className="border-b border-stone-300 bg-yellow-500 px-3 py-3 uppercase sm:px-6 sm:py-6">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between space-x-2">
        <Link
          to={'/'}
          className="text-sm tracking-normal sm:text-base sm:tracking-widest"
        >
          {' '}
          Glaze Pizza co.
        </Link>
        <SearchOrder />
        <UserName />
      </div>
    </header>
  );
};

export default Header;
