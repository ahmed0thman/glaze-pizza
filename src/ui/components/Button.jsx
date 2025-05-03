import React from 'react';
import { useNavigate } from 'react-router-dom';

const Button = ({ children, disabled, to, type = 'primary', onClick }) => {
  const navigate = useNavigate();
  const base =
    'rounded-full  text-sm font-semibold uppercase tracking-wide  transition-all duration-300  focus:outline-none focus:ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  ';
  const style = {
    primary:
      base +
      'bg-yellow-400 focus:ring-yellow-300 p-4 text-stone-800 hover:bg-yellow-300 md:px-6 md:py-4',
    primaryOutline:
      base +
      'bg-transparent border-2 border-yellow-300 focus:ring-yellow-300 p-4 text-stone-600 hover:bg-yellow-300 md:px-6 md:py-4 hover:text-stone-800',
    small:
      base +
      'bg-yellow-400  text-stone-800 hover:bg-yellow-300  focus:ring-yellow-300 text-xs md:text-sm py-2 px-3 md:px-3.5 md:py-2.5',
    round:
      base +
      'bg-yellow-400  text-stone-800 hover:bg-yellow-300  focus:ring-yellow-300 text-xs md:text-sm py-1 px-2.5 md:px-3 md:py-1.5',
    secondary:
      base +
      'bg-transparent border-2 border-stone-300 md:py-3.5 md:px-4 text-stone-400 hover:bg-stone-300 hover:text-stone-800 focus:ring-stone-200/50 p-3.5 ',
    smallOutline:
      base +
      'bg-transparent hover:bg-yellow-300 text-stone-600 hover:text-stone-800  focus:ring-yellow-300 text-xs md:text-sm py-2 px-3 md:px-4 md:py-3  border-2 border-yellow-300',
  };
  function handleNavigate() {
    navigate(to);
  }
  return (
    <button
      disabled={disabled}
      onClick={to ? handleNavigate : onClick}
      className={` ${style[type]}`}
    >
      {children}
    </button>
  );
};

export default Button;
