import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto w-full py-4 border-t bg-background">
      <div className="container mx-auto flex justify-center">
        <a
          href="https://meta-mirror.vercel.app"
          className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Meta-Mirror.vercel.app
        </a>
      </div>
    </footer>
  );
}



