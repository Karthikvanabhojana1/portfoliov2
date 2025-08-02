import React from 'react';

const Header = () => (
  <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow">
    <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
      <h1 className="text-3xl font-bold tracking-wide">My Portfolio</h1>
      <nav className="space-x-6 text-lg">
        <a href="#home" className="hover:text-yellow-300 transition-colors">Home</a>
        <a href="#projects" className="hover:text-yellow-300 transition-colors">Projects</a>
        <a href="#contact" className="hover:text-yellow-300 transition-colors">Contact</a>
      </nav>
    </div>
  </header>
);

export default Header;
