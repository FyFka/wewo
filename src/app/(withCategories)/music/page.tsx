import CategoryVideos from "../../../components/videos/categoryVideos/categoryVideos";
import { getVideosByCategory } from "../../../external/videos";
import { CategoryEnum } from "../../../shared/interfaces/Categories";

export default async function Music() {
  const musicVideos = await getVideosByCategory(CategoryEnum.MUSIC);
  return (
    <CategoryVideos
      category={CategoryEnum.MUSIC}
      videos={musicVideos.items}
      pageCategory="Music"
      pageToken={musicVideos.nextPageToken}
    />
  );
}
