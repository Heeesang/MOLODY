import RecommendContent from "@/components/contents/recommend/recommendContent";

type RecommendPageProps = {
  searchParams?: Promise<{ genre?: string }>;
};

export default async function RecommendPage({ searchParams }: RecommendPageProps) {
  const resolvedParams = await searchParams;
  const genre = resolvedParams?.genre;

  return <RecommendContent genre={genre} />;
}
