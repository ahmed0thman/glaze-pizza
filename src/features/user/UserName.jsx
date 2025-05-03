import React from 'react';
import { useSelector } from 'react-redux';
import { getUser } from './userSlice';

const UserName = () => {
  const { username } = useSelector(getUser);
  if (!username) return null;
  return (
    <div className="hidden text-sm font-semibold sm:block">{username}</div>
  );
};

export default UserName;
