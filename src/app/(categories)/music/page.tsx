import Videos from "../../../components/videos/videos";
import { getVideos } from "../../../external/videos";
import { CategoryState } from "../../../shared/interfaces/Categories";

export default async function Music() {
  const musicVideos = await getVideos(CategoryState.MUSIC);

  return <Videos videos={musicVideos.items} pageCategory="Music" pageToken={musicVideos.nextPageToken} />;
}
