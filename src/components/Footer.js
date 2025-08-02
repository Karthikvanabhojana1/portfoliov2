import React from 'react';

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 text-center py-8 mt-20">
    <p className="mb-2">&copy; {new Date().getFullYear()} All rights reserved.</p>
    <p className="text-sm">Crafted with React & Tailwind CSS</p>
    <span className="hidden">Learn React</span>
  </footer>
);

export default Footer;
