// API Route: /api/printful
// Printful POD Integration
// Updated: December 22, 2025

import { NextRequest, NextResponse } from 'next/server';
import * as printful from '@/lib/printful';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');

  try {
    switch (action) {
      case 'catalog':
        const catalog = await printful.getCatalog();
        return NextResponse.json({ products: catalog });

      case 'product':
        const productId = searchParams.get('id');
        if (!productId) {
          return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
        }
        const product = await printful.getProduct(parseInt(productId));
        return NextResponse.json({ product });

      case 'orders':
        const status = searchParams.get('status') || undefined;
        const orders = await printful.listOrders({ status });
        return NextResponse.json({ orders });

      case 'order':
        const orderId = searchParams.get('id');
        if (!orderId) {
          return NextResponse.json({ error: 'Order ID required' }, { status: 400 });
        }
        const order = await printful.getOrder(orderId);
        return NextResponse.json({ order });

      case 'store':
        const storeInfo = await printful.getStoreInfo();
        return NextResponse.json({ store: storeInfo });

      default:
        return NextResponse.json({
          actions: ['catalog', 'product', 'orders', 'order', 'store'],
          popularProducts: printful.POPULAR_PRODUCTS,
        });
    }
  } catch (error) {
    console.error('Printful GET error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');

  try {
    const body = await req.json();

    switch (action) {
      case 'create-product':
        // Quick product creation
        const { name, designUrl, productType, retailMarkup } = body;
        if (!name || !designUrl || !productType) {
          return NextResponse.json(
            { error: 'name, designUrl, and productType are required' },
            { status: 400 }
          );
        }
        const newProduct = await printful.quickCreateProduct({
          name,
          designUrl,
          productType,
          retailMarkup,
        });
        return NextResponse.json({ success: true, product: newProduct });

      case 'mockup':
        // Generate mockup
        const { productId, variantIds, files } = body;
        const mockup = await printful.createMockup({ productId, variantIds, files });
        return NextResponse.json({ success: true, mockup });

      case 'shipping-rates':
        // Calculate shipping
        const rates = await printful.getShippingRates({
          recipient: body.recipient,
          items: body.items,
        });
        return NextResponse.json({ rates });

      case 'estimate':
        // Estimate costs
        const estimate = await printful.estimateCosts({
          recipient: body.recipient,
          items: body.items,
        });
        return NextResponse.json({ costs: estimate });

      case 'order':
        // Create order
        const order = await printful.createOrder({
          recipient: body.recipient,
          items: body.items,
          retail_costs: body.retail_costs,
        });
        return NextResponse.json({ success: true, order });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: create-product, mockup, shipping-rates, estimate, order' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Printful POST error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('orderId');

  if (!orderId) {
    return NextResponse.json({ error: 'Order ID required' }, { status: 400 });
  }

  try {
    await printful.cancelOrder(orderId);
    return NextResponse.json({ success: true, message: 'Order cancelled' });
  } catch (error) {
    console.error('Printful DELETE error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
