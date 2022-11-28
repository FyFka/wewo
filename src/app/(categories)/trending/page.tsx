import Videos from "../../../components/videos/videos";
import { getVideos } from "../../../external/videos";
import { CategoryEnum } from "../../../shared/interfaces/Categories";

export default async function Trending() {
  const trendingVideos = await getVideos(CategoryEnum.TRENDING);

  return <Videos videos={trendingVideos.items} pageCategory="Trending" pageToken={trendingVideos.nextPageToken} />;
}
