import Categories from "../components/categories/categories";
import Container from "../components/container/container";
import Header from "../components/header/header";
import Videos from "../components/videos/videos";
import { apiHost, apiKey } from "../shared/configuration";
import { IVideoList } from "../shared/interfaces/IVideo";

async function getVideos() {
  const params = new URLSearchParams({
    part: "snippet,contentDetails,statistics",
    chart: "mostPopular",
    maxResults: "25",
    regionCode: "US",
    key: apiKey,
  });

  const endpoint = `${apiHost}/videos?${params}`;
  const res = await fetch(endpoint, {
    next: {
      revalidate: 3600,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data as IVideoList;
}

export default async function Home() {
  const videos = await getVideos();

  return (
    <>
      <Header />
      <Container>
        <Categories />
        <Videos videos={videos.items} />
      </Container>
    </>
  );
}
