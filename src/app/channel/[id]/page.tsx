import Banner from "../../../components/channel/banner/banner";
import ChannelPreview from "../../../components/channel/channelPreview/channelPreview";
import { getChannel } from "../../../external/channel";

export default async function Channel({ params }: { params: { id: string } }) {
  const channelView = await getChannel(params.id);

  const channel = channelView.items[0];
  return (
    <div>
      <Banner source={channel.brandingSettings.image.bannerExternalUrl} />
      <ChannelPreview
        title={channel.snippet.title}
        avatar={channel.snippet.thumbnails.high.url}
        subscribers={channel.statistics.subscriberCount}
        customUrl={channel.snippet.customUrl}
      />
      <pre>{JSON.stringify(channel, null, 2)}</pre>
    </div>
  );
}
