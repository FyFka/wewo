import CategoryVideos from "../../../components/videos/categoryVideos/categoryVideos";
import { getVideosByCategory } from "../../../external/videos";
import { CategoryEnum } from "../../../shared/interfaces/Categories";

export default async function Gaming() {
  const gamingVideos = await getVideosByCategory(CategoryEnum.GAMING);

  return (
    <CategoryVideos
      category={CategoryEnum.GAMING}
      videos={gamingVideos.items}
      pageCategory="Gaming"
      pageToken={gamingVideos.nextPageToken}
    />
  );
}
