import { notFound } from "next/navigation";
import CategoryVideos from "../../../components/videos/categoryVideos/categoryVideos";
import { getVideosByCategory } from "../../../external/videos";
import { CategoryEnum } from "../../../shared/interfaces/Categories";

export default async function Sports() {
  const sportsVideos = await getVideosByCategory(CategoryEnum.SPORTS);

  if (sportsVideos.items.length === 0) {
    notFound();
  }

  return (
    <CategoryVideos
      category={CategoryEnum.SPORTS}
      videos={sportsVideos.items}
      pageCategory="Sports"
      pageToken={sportsVideos.nextPageToken}
    />
  );
}
