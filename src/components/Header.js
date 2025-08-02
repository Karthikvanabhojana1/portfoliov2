import React from 'react';

const Header = ({ info }) => (
  <header className="text-center my-8">
    <h1 className="text-4xl font-bold">{info.name}</h1>
    <p className="text-xl text-gray-600">{info.title}</p>
  </header>
);

export default Header;
