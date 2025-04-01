import { getAllMagazineIds, getMagazineById, type Magazine } from "@/firebase/firestore"
import MagazineDetail from "@/components/magazine/MagazineDetail"

// Add this server-side function for static generation
export async function generateStaticParams() {
  const magazineIds = await getAllMagazineIds()
  return magazineIds.map(id => ({ slug: id }))
}

// Add a server component to fetch magazine data
export default async function Page({ params }: { params: { slug: string } }) {
  // Pre-fetch the magazine data server-side
  const magazineData = await getMagazineById(params.slug)

  // Render the client component and pass the data
  return <MagazineDetail initialMagazine={magazineData} slug={params.slug} />
}
