import CategoryVideos from "../../../components/videos/categoryVideos/categoryVideos";
import { getVideosByCategory } from "../../../external/videos";
import { CategoryEnum } from "../../../shared/interfaces/Categories";

export default async function Sports() {
  const sportsVideos = await getVideosByCategory(CategoryEnum.SPORTS);

  return (
    <CategoryVideos
      category={CategoryEnum.SPORTS}
      videos={sportsVideos.items}
      pageCategory="Sports"
      pageToken={sportsVideos.nextPageToken}
    />
  );
}
