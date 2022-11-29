import CategoryVideos from "../../../components/videos/categoryVideos/categoryVideos";
import { getVideos } from "../../../external/videos";
import { CategoryEnum } from "../../../shared/interfaces/Categories";

export default async function Animation() {
  const animationVideos = await getVideos(CategoryEnum.ANIMATION);

  return (
    <CategoryVideos
      videos={animationVideos.items}
      pageCategory="Film & Animation"
      pageToken={animationVideos.nextPageToken}
    />
  );
}
