import Videos from "../../../components/videos/videos";
import { getVideos } from "../../../external/videos";
import { CategoryEnum } from "../../../shared/interfaces/Categories";

export default async function Science() {
  const scienceVideos = await getVideos(CategoryEnum.SCIENCE);

  return (
    <Videos videos={scienceVideos.items} pageCategory="Science & Technology" pageToken={scienceVideos.nextPageToken} />
  );
}
