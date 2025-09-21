import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="120"
      height="30"
      {...props}
    >
      <path
        fill="hsl(var(--primary))"
        d="M10 10 L10 40 L40 40 L40 30 L20 30 L20 20 L40 20 L40 10 Z"
      />
      <text
        x="50"
        y="32"
        fontFamily="'Playfair Display', serif"
        fontSize="24"
        fill="hsl(var(--foreground))"
        className="font-headline"
      >
        Vishwakarma
      </text>
    </svg>
  );
}
