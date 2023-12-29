import { WatchFeed } from './post-watch-feed.use-case';

export const watchFeedBuilder = ({
  name = 'My list',
  visibility = 'private'
}: {
  name?: string;
  visibility?: string;
} = {}) => {
  const props = { name, visibility };

  return {
    withName: (_name: string) =>
      watchFeedBuilder({
        ...props,
        name: _name
      }),
    withVisibility: (_visibility: string) =>
      watchFeedBuilder({
        ...props,
        visibility: _visibility
      }),
    build: (): WatchFeed => ({
      ...props
    })
  };
};
