export type WatchFeed = {
  name: string;
  visibility: string;
};

export type PostWatchFeedCommand = {
  name: string;
  visibility: string;
};

export interface WatchFeedRepository {
  save: (wF: WatchFeed) => void;
}

export class WatchFeedNameEmptyError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;
}
export class WatchFeedVisibilityInvalidError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;
}

const visibilities = ['private', 'public', 'shared'] as const;
type Visibility = (typeof visibilities)[number];

export class PostWatchFeedUseCase {
  constructor(private readonly watchFeedRepository: WatchFeedRepository) {}
  handle(postWatchFeedCommand: PostWatchFeedCommand) {
    if (postWatchFeedCommand.name.trim().length === 0) {
      throw new WatchFeedNameEmptyError();
    }
    if (!this.isVisibilityValid(postWatchFeedCommand.visibility)) {
      throw new WatchFeedVisibilityInvalidError();
    }
    this.watchFeedRepository.save({
      name: postWatchFeedCommand.name,
      visibility: postWatchFeedCommand.visibility
    });
  }
  isVisibilityValid(visibility: any): visibility is Visibility {
    return visibilities.includes(visibility);
  }
}
