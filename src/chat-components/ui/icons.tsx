'use client'

import { cn } from '@/lib/utils'

function IconLogo({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 400 156"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-32 w-10', className)}
      {...props}
    >
      <rect
        x="0"
        y="0"
        width="156"
        height="156"
        rx="25" 
        ry="25" 
        fill="black"
        stroke="DimGrey"
        strokeWidth="3"
      ></rect>
    
      <text
        x="78"
        y="84"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontSize="80"
      >
        D
      </text>
    
      <text
        x="180"
        y="50%" 
        dominantBaseline="middle"
        textAnchor="start"
        fill="DimGrey"
        fontSize="70"
      >
        Ajax
      </text>
    </svg>
    
    
      )
}

export { IconLogo }
