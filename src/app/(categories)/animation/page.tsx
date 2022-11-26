import Videos from "../../../components/videos/videos";
import { getVideos } from "../../../external/videos";
import { CategoryState } from "../../../shared/interfaces/Categories";

export default async function Animation() {
  const animationVideos = await getVideos(CategoryState.ANIMATION);

  return (
    <Videos videos={animationVideos.items} pageCategory="Film & Animation" pageToken={animationVideos.nextPageToken} />
  );
}
