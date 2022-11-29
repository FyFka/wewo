import CategoryVideos from "../../../components/videos/categoryVideos/categoryVideos";
import { getVideos } from "../../../external/videos";
import { CategoryEnum } from "../../../shared/interfaces/Categories";

export default async function Science() {
  const scienceVideos = await getVideos(CategoryEnum.SCIENCE);

  return (
    <CategoryVideos
      videos={scienceVideos.items}
      pageCategory="Science & Technology"
      pageToken={scienceVideos.nextPageToken}
    />
  );
}
