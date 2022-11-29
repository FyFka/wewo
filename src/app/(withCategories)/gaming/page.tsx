import CategoryVideos from "../../../components/videos/categoryVideos/categoryVideos";
import { getVideos } from "../../../external/videos";
import { CategoryEnum } from "../../../shared/interfaces/Categories";

export default async function Gaming() {
  const gamingVideos = await getVideos(CategoryEnum.GAMING);

  return <CategoryVideos videos={gamingVideos.items} pageCategory="Gaming" pageToken={gamingVideos.nextPageToken} />;
}
