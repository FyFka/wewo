import CategoryVideos from "../../../components/videos/categoryVideos/categoryVideos";
import { getVideosByCategory } from "../../../external/videos";
import { CategoryEnum } from "../../../shared/interfaces/Categories";

export default async function Trending() {
  const trendingVideos = await getVideosByCategory(CategoryEnum.TRENDING);

  return (
    <CategoryVideos
      category={CategoryEnum.TRENDING}
      videos={trendingVideos.items}
      pageCategory="Trending"
      pageToken={trendingVideos.nextPageToken}
    />
  );
}
