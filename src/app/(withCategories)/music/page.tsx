import CategoryVideos from "../../../components/videos/categoryVideos/categoryVideos";
import { getVideos } from "../../../external/videos";
import { CategoryEnum } from "../../../shared/interfaces/Categories";

export default async function Music() {
  const musicVideos = await getVideos(CategoryEnum.MUSIC);
  return <CategoryVideos videos={musicVideos.items} pageCategory="Music" pageToken={musicVideos.nextPageToken} />;
}
