import Categories from "../components/categories/categories";
import Container from "../components/container/container";
import Header from "../components/header/header";
import Videos from "../components/videos/videos";
import { apiHost, apiKey } from "../shared/configuration";
import { IVideoSearch } from "../shared/interfaces/IVideo";

async function getData() {
  const res = await fetch(`https://${apiHost}/search?part=snippet&q=New&maxResults=50`, {
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": apiHost,
    },
    next: {
      revalidate: 3600,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data as IVideoSearch;
}

export default async function Home() {
  const videos = await getData();

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
