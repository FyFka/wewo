import Videos from "../../../components/videos/videos";
import { getVideos } from "../../../external/videos";
import { CategoryState } from "../../../shared/interfaces/Categories";

export default async function Sports() {
  const sportsVideos = await getVideos(CategoryState.SPORTS);

  return <Videos videos={sportsVideos.items} pageCategory="Sports" pageToken={sportsVideos.nextPageToken} />;
}
