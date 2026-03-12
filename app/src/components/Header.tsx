'use client'

import {ShoppingBag} from 'lucide-react'
import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-neutral-900">
          Store
        </Link>
        <nav className="flex items-center gap-8">
          <Link href="/products" className="text-sm text-neutral-500 transition-colors hover:text-neutral-900">
            Products
          </Link>
          <a href="https://foxy-commerce-demo.foxycart.com/cart" className="flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-900"><ShoppingBag className="h-4 w-4" />Cart</a>
        </nav>
      </div>
    </header>
  )
}