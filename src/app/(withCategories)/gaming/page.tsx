import { notFound } from "next/navigation";
import CategoryVideos from "../../../components/videos/categoryVideos/categoryVideos";
import { getVideosByCategory } from "../../../external/videos";
import { CategoryEnum } from "../../../shared/interfaces/Categories";

export default async function Gaming() {
  const gamingVideos = await getVideosByCategory(CategoryEnum.GAMING);

  if (gamingVideos.items.length === 0) {
    notFound();
  }

  return (
    <CategoryVideos
      category={CategoryEnum.GAMING}
      videos={gamingVideos.items}
      pageCategory="Gaming"
      pageToken={gamingVideos.nextPageToken}
    />
  );
}
