import CategoryVideos from "../../../components/videos/categoryVideos/categoryVideos";
import { getVideos } from "../../../external/videos";
import { CategoryEnum } from "../../../shared/interfaces/Categories";

export default async function Blogs() {
  const blogVideos = await getVideos(CategoryEnum.BLOGS);

  return (
    <CategoryVideos videos={blogVideos.items} pageCategory="People & Blogs" pageToken={blogVideos.nextPageToken} />
  );
}
