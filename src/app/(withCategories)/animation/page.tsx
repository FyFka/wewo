import CategoryVideos from "../../../components/videos/categoryVideos/categoryVideos";
import { getVideosByCategory } from "../../../external/videos";
import { CategoryEnum } from "../../../shared/interfaces/Categories";

export default async function Animation() {
  const animationVideos = await getVideosByCategory(CategoryEnum.ANIMATION);

  return (
    <CategoryVideos
      category={CategoryEnum.ANIMATION}
      videos={animationVideos.items}
      pageCategory="Film & Animation"
      pageToken={animationVideos.nextPageToken}
    />
  );
}
