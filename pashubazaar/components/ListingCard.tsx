import { rupee } from '@/lib/utils';
export function ListingCard({ listing }: { listing: any }) {
  const cover = listing.media?.[0]?.path ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${listing.media[0].path}` : undefined;
  return (
    <a href={`/listing/${listing.id}`} className="bg-white rounded-2xl shadow p-3 grid gap-2">
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt={listing.title} src={cover} className="w-full h-48 object-cover rounded-xl" />
      ) : (
        <div className="w-full h-48 bg-gray-200 rounded-xl" />
      )}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold">{listing.title}</div>
          <div className="text-sm text-gray-600">{listing.species}{listing.breed ? ` • ${listing.breed}` : ''}</div>
          <div className="text-sm text-gray-600">{listing.location}</div>
        </div>
        <div className="font-bold">{rupee(listing.price)}</div>
      </div>
    </a>
  );
}
