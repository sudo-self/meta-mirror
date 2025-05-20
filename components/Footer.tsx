import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { SiNextdotjs, SiNodedotjs } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="mt-auto w-full py-4 border-t bg-background">
      <div className="container mx-auto flex flex-col items-center space-y-1">
        <a
          href="https://meta-mirror.vercel.app"
          className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          meta-mirror.vercel.app
        </a><br />
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <a
            href="https://github.com/sudo-self/meta-mirror"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-primary transition-colors"
          >
            <FaGithub className="h-4 w-4" />
            sudo-self
          </a>
          <a
            href="https://github.com/vercel/next.js/releases/tag/v15.3.2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-primary transition-colors"
          >
            <SiNextdotjs className="h-4 w-4" />
            Next.js
          </a>
          <a
            href="https://nodejs.org/en/blog/release/v22.0.0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-primary transition-colors"
          >
            <SiNodedotjs className="h-4 w-4" />
            Node.js
          </a>
        </div>
      </div>
    </footer>
  );
}







