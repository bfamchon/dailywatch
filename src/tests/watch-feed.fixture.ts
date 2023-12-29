import { PostWatchFeedUseCase } from '../post-watch-feed.use-case';
import { InMemoryWatchFeedRepository } from '../watch-feed.in-memory.repository';
import { PostWatchFeedCommand } from './../post-watch-feed.use-case';

export function createWatchFeedFixture() {
  let thrownError: Error;

  const messageRepository = new InMemoryWatchFeedRepository();

  const postWatchFeedUseCase = new PostWatchFeedUseCase(messageRepository);

  return {
    whenUserCreateAWatchFeed(postWatchFeedCommand: PostWatchFeedCommand) {
      try {
        postWatchFeedUseCase.handle(postWatchFeedCommand);
      } catch (error) {
        thrownError = error;
      }
    },
    thenCreatedWatchFeedShouldBe(expectedFeed: { name: string; visibility: string }) {
      expect(expectedFeed).toStrictEqual(messageRepository.watchFeed);
    },
    thenErrorShouldBe(expectedErrorClass: new () => Error) {
      expect(thrownError).toBeInstanceOf(expectedErrorClass);
    }
  };
}

export type WatchFeedFixture = ReturnType<typeof createWatchFeedFixture>;
