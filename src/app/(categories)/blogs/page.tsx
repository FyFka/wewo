import Videos from "../../../components/videos/videos";
import { getVideos } from "../../../external/videos";
import { CategoryEnum } from "../../../shared/interfaces/Categories";

export default async function Blogs() {
  const blogVideos = await getVideos(CategoryEnum.BLOGS);

  return <Videos videos={blogVideos.items} pageCategory="People & Blogs" pageToken={blogVideos.nextPageToken} />;
}
