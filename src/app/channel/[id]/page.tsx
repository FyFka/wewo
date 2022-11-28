import { notFound } from "next/navigation";
import Banner from "../../../components/channel/banner/banner";
import ChannelPreview from "../../../components/channel/channelPreview/channelPreview";
import ChannelVideos from "../../../components/channel/channelVideos/channelVideos";
import Trailer from "../../../components/channel/trailer/trailer";
import { getChannel } from "../../../external/channel";
import { getVideoById, getVideosByKey } from "../../../external/videos";

export default async function Channel({ params }: { params: { id: string } }) {
  const [channel, videos] = await Promise.all([getChannel(params.id), getVideosByKey(params.id, "channelId")]);
  let videoTrailer = null;

  if (!channel.items[0]) {
    notFound();
  }

  if (channel.items[0].brandingSettings.channel.unsubscribedTrailer) {
    const buffer = await getVideoById(channel.items[0].brandingSettings.channel.unsubscribedTrailer);
    if (buffer.items[0]) {
      videoTrailer = buffer.items[0];
    }
  }

  const channelItem = channel.items[0];
  return (
    <section>
      <Banner source={channelItem.brandingSettings.image?.bannerExternalUrl} />
      <ChannelPreview
        title={channelItem.snippet.title}
        thumbnails={channelItem.snippet.thumbnails}
        subscribers={channelItem.statistics.subscriberCount}
        customUrl={channelItem.snippet.customUrl}
      />
      {videoTrailer && <Trailer trailer={videoTrailer} />}
      <ChannelVideos videos={videos.items} />
    </section>
  );
}
