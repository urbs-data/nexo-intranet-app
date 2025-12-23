import { notFound } from 'next/navigation';
import ProductViewForm from './product-view-form';
import { getProductById } from '../data/get-product-by-id';
import { resolveActionResult } from '@/lib/actions/client';

type TProductViewPageProps = {
  productId: string;
};

export default async function ProductViewPage({
  productId
}: TProductViewPageProps) {
  const fetchedProduct = await resolveActionResult(
    getProductById({ id: Number(productId) })
  );
  if (!fetchedProduct) {
    notFound();
  }

  return (
    <ProductViewForm initialData={fetchedProduct} pageTitle='View Product' />
  );
}
