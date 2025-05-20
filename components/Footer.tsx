import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-muted py-4 border-t border-border">
      <div className="container mx-auto flex justify-center">
        <a
          href="https://meta-mirror.vercel.app"
          className="text-muted-foreground hover:text-primary transition-colors duration-300 px-4 py-2 rounded-md hover:bg-accent"
        >
          Meta-Mirror
        </a>
      </div>
    </footer>
  );
}

