import Videos from "../../../components/videos/videos";
import { getVideos } from "../../../external/videos";
import { CategoryState } from "../../../shared/interfaces/Categories";

export default async function Science() {
  const scienceVideos = await getVideos(CategoryState.SCIENCE);

  return (
    <Videos videos={scienceVideos.items} pageCategory="Science & Technology" pageToken={scienceVideos.nextPageToken} />
  );
}
