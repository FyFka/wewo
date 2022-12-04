import { notFound } from "next/navigation";
import CategoryVideos from "../../../components/videos/categoryVideos/categoryVideos";
import { getVideosByCategory } from "../../../external/videos";
import { CategoryEnum } from "../../../shared/interfaces/Categories";

export default async function Science() {
  const scienceVideos = await getVideosByCategory(CategoryEnum.SCIENCE);

  if (scienceVideos.items.length === 0) {
    notFound();
  }

  return (
    <CategoryVideos
      category={CategoryEnum.SCIENCE}
      videos={scienceVideos.items}
      pageCategory="Science & Technology"
      pageToken={scienceVideos.nextPageToken}
    />
  );
}
