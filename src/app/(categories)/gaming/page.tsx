import Videos from "../../../components/videos/videos";
import { getVideos } from "../../../external/videos";
import { CategoryEnum } from "../../../shared/interfaces/Categories";

export default async function Gaming() {
  const gamingVideos = await getVideos(CategoryEnum.GAMING);

  return <Videos videos={gamingVideos.items} pageCategory="Gaming" pageToken={gamingVideos.nextPageToken} />;
}
