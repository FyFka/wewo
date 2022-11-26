import Videos from "../../../components/videos/videos";
import { getVideos } from "../../../external/videos";
import { CategoryState } from "../../../shared/interfaces/Categories";

export default async function Trending() {
  const trendingVideos = await getVideos(CategoryState.TRENDING);

  return <Videos videos={trendingVideos.items} pageCategory="Trending" pageToken={trendingVideos.nextPageToken} />;
}
