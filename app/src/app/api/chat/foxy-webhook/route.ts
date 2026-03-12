import {createClient} from '@sanity/client'
import {NextRequest, NextResponse} from 'next/server'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_READ_TOKEN,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const items = body?._embedded?.['fx:items'] ?? []

    for (const item of items) {
      const {name, price, code} = item

      // Look up product in Sanity by SKU (code) or title
      const product = await client.fetch(
        `*[_type == "product" && (
          $code != "" && $code in variants[].sku
          || title == $name
        )][0]{
          title,
          "price": price.amount
        }`,
        {code: code ?? '', name}
      )

      if (!product) {
        return NextResponse.json({
          ok: false,
          details: `Product not found: ${name}`,
        })
      }

      const expectedPrice = product.price
      const submittedPrice = parseFloat(price)

      if (Math.abs(expectedPrice - submittedPrice) > 0.01) {
        return NextResponse.json({
          ok: false,
          details: `Price mismatch for ${name}: expected ${expectedPrice}, got ${submittedPrice}`,
        })
      }
    }

    return NextResponse.json({ok: true, details: ''})
  } catch (err) {
    console.error('Foxy webhook error:', err)
    return NextResponse.json({ok: false, details: 'Webhook processing error'})
  }
}