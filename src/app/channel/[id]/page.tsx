import { notFound } from "next/navigation";
import Banner from "../../../components/channel/banner/banner";
import ChannelPreview from "../../../components/channel/channelPreview/channelPreview";
import ChannelVideos from "../../../components/channel/channelVideos/channelVideos";
import Trailer from "../../../components/channel/trailer/trailer";
import { getChannelById } from "../../../external/channel";
import { getVideoById, getVideosByKey } from "../../../external/videos";

export default async function Channel({ params }: { params: { id: string } }) {
  const [channel, videos] = await Promise.all([
    getChannelById(params.id),
    getVideosByKey(params.id, "channelId", "video"),
  ]);

  if (!channel.items) {
    notFound();
  }

  let trailer = null;
  const channelItem = channel.items[0];

  if (channelItem.brandingSettings.channel.unsubscribedTrailer) {
    const channelTrailer = await getVideoById(channelItem.brandingSettings.channel.unsubscribedTrailer);
    if (channelTrailer.items.length !== 0) {
      trailer = channelTrailer.items[0];
    }
  }

  return (
    <section>
      <Banner source={channelItem.brandingSettings.image?.bannerExternalUrl} />
      <ChannelPreview
        title={channelItem.snippet.title}
        thumbnails={channelItem.snippet.thumbnails}
        subscribers={channelItem.statistics.subscriberCount}
        customUrl={channelItem.snippet.customUrl}
      />
      {trailer && <Trailer trailer={trailer} />}
      <ChannelVideos channelId={channelItem.id} videos={videos.items} initPageToken={videos.nextPageToken} />
    </section>
  );
}
