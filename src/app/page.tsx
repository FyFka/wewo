import Categories from "../components/categories/categories";
import Videos from "../components/videos/videos";
import { getVideos } from "../external/videos";
import { CategoryEnum } from "../shared/interfaces/Categories";

export default async function Home() {
  const trendingVideos = await getVideos(CategoryEnum.TRENDING);

  return (
    <>
      <Categories />
      <Videos videos={trendingVideos.items} pageCategory="Trending" pageToken={trendingVideos.nextPageToken} />
    </>
  );
}
