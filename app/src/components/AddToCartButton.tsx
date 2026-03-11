'use client'

import {ShoppingBag} from 'lucide-react'

import {Button} from '@/components/ui/button'

interface AddToCartButtonProps {
  disabled?: boolean
  cartUrl?: string | null
}

export function AddToCartButton({disabled, cartUrl}: AddToCartButtonProps) {
  if (cartUrl && !disabled) {
    return (
      <a href={cartUrl}>
        <Button size="lg" className="w-full">
          <ShoppingBag className="h-4 w-4" />
          Add to Cart
        </Button>
      </a>
    )
  }

  return (
    <Button disabled={disabled} size="lg" className="w-full">
      <ShoppingBag className="h-4 w-4" />
      Add to Cart
    </Button>
  )
}