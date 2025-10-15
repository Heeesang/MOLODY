import RecommendContent from "@/components/contents/recommend/recommendContent";

export default async function Recommend({ searchParams }: { searchParams: { genre?: string } }) {
    const params = await searchParams;
    const genre = params?.genre

    return (
        <>
            <RecommendContent genre={genre} />
        </>
    )
}