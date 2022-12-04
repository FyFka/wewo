import { notFound } from "next/navigation";
import CategoryVideos from "../../../components/videos/categoryVideos/categoryVideos";
import { getVideosByCategory } from "../../../external/videos";
import { CategoryEnum } from "../../../shared/interfaces/Categories";

export default async function Animation() {
  const animationVideos = await getVideosByCategory(CategoryEnum.ANIMATION);

  if (animationVideos.items.length === 0) {
    notFound();
  }

  return (
    <CategoryVideos
      category={CategoryEnum.ANIMATION}
      videos={animationVideos.items}
      pageCategory="Film & Animation"
      pageToken={animationVideos.nextPageToken}
    />
  );
}
