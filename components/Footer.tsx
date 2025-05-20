import React from 'react';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="mt-auto w-full py-4 border-t bg-background">
      <div className="container mx-auto flex flex-col items-center space-y-1">
        <a
          href="https://meta-mirror.vercel.app"
          className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          meta-mirror.vercel.app
        </a>
        <a
          href="https://github.com/sudo-self/meta-mirror"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <FaGithub className="h-4 w-4" />
          source code
        </a>
      </div>
    </footer>
  );
}




