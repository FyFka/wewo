import CategoryVideos from "../../../components/videos/categoryVideos/categoryVideos";
import { getVideosByCategory } from "../../../external/videos";
import { CategoryEnum } from "../../../shared/interfaces/Categories";

export default async function Blogs() {
  const blogVideos = await getVideosByCategory(CategoryEnum.BLOGS);

  return (
    <CategoryVideos
      category={CategoryEnum.BLOGS}
      videos={blogVideos.items}
      pageCategory="People & Blogs"
      pageToken={blogVideos.nextPageToken}
    />
  );
}
