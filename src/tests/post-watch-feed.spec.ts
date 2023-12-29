import { WatchFeedNameEmptyError, WatchFeedVisibilityInvalidError } from '../post-watch-feed.use-case';
import { watchFeedBuilder } from '../watch-feed.builder';
import { WatchFeedFixture, createWatchFeedFixture } from './watch-feed.fixture';

describe('Feature: Create a watch feed', () => {
  let fixture: WatchFeedFixture;

  beforeEach(() => {
    fixture = createWatchFeedFixture();
  });
  describe('Rule: A watch feed must have a name', () => {
    test('Baptiste can create a watch feed', async () => {
      const myWatchFeedBuilder = watchFeedBuilder().withName('À lire').withVisibility('private');
      fixture.whenUserCreateAWatchFeed(myWatchFeedBuilder.build());
      fixture.thenCreatedWatchFeedShouldBe(myWatchFeedBuilder.build());
    });

    test('Baptiste cannot create a watch feed because name is empty', async () => {
      const myWatchFeedBuilder = watchFeedBuilder().withName('').withVisibility('');
      fixture.whenUserCreateAWatchFeed(myWatchFeedBuilder.build());
      fixture.thenErrorShouldBe(WatchFeedNameEmptyError);
    });
  });

  describe('Rule: A watch feed must have a valid visibility', () => {
    test('Baptiste cannot create a watch feed because visibility is invalid', async () => {
      const myWatchFeedBuilder = watchFeedBuilder().withVisibility('');
      fixture.whenUserCreateAWatchFeed(myWatchFeedBuilder.build());
      fixture.thenErrorShouldBe(WatchFeedVisibilityInvalidError);
    });
  });
  describe('Rule: A watch feed name cannot contain only spaces', () => {
    test('Baptiste cannot create a watch feed because its name contain only spaces', async () => {
      const myWatchFeedBuilder = watchFeedBuilder().withName('     ');
      fixture.whenUserCreateAWatchFeed(myWatchFeedBuilder.build());
      fixture.thenErrorShouldBe(WatchFeedNameEmptyError);
    });
  });
});
