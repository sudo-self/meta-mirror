import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto text-center">
        <a
          href="https://meta-mirror.vercel.app"
          className="text-gray-600 hover:text-blue-500 transition-colors duration-300 inline-block px-4 py-2 rounded-md hover:bg-gray-200"
        >
          Meta-Mirror
        </a>
      </div>
    </footer>
  );
}
