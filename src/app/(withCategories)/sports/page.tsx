import CategoryVideos from "../../../components/videos/categoryVideos/categoryVideos";
import { getVideos } from "../../../external/videos";
import { CategoryEnum } from "../../../shared/interfaces/Categories";

export default async function Sports() {
  const sportsVideos = await getVideos(CategoryEnum.SPORTS);

  return <CategoryVideos videos={sportsVideos.items} pageCategory="Sports" pageToken={sportsVideos.nextPageToken} />;
}
