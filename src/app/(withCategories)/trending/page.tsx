import CategoryVideos from "../../../components/videos/categoryVideos/categoryVideos";
import { getVideos } from "../../../external/videos";
import { CategoryEnum } from "../../../shared/interfaces/Categories";

export default async function Trending() {
  const trendingVideos = await getVideos(CategoryEnum.TRENDING);

  return (
    <CategoryVideos videos={trendingVideos.items} pageCategory="Trending" pageToken={trendingVideos.nextPageToken} />
  );
}
