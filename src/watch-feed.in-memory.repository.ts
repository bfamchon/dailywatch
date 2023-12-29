import { WatchFeed, WatchFeedRepository } from './post-watch-feed.use-case';

export class InMemoryWatchFeedRepository implements WatchFeedRepository {
  watchFeed: WatchFeed;
  save(wF: WatchFeed) {
    this.watchFeed = wF;
  }
}
