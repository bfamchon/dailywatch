#!/usr/bin/env node
import { Command } from 'commander';
import { PostWatchFeedCommand, PostWatchFeedUseCase } from './src/post-watch-feed.use-case';
import { InMemoryWatchFeedRepository } from './src/watch-feed.in-memory.repository';

const program = new Command();

const watchFeedRepository = new InMemoryWatchFeedRepository();
const postWatchFeedUseCase = new PostWatchFeedUseCase(watchFeedRepository);

program.version('1').addCommand(
  new Command('post')
    .argument('<name>', 'the current list name')
    .argument('<visibility>', 'the list visibility')
    .action((name, visibility) => {
      const postWatchFeedCommand: PostWatchFeedCommand = {
        name,
        visibility
      };
      try {
        postWatchFeedUseCase.handle(postWatchFeedCommand);
        console.table([watchFeedRepository.watchFeed]);
      } catch (error) {
        console.error('Ooops: ', error);
      }
    })
);

async function main() {
  await program.parseAsync();
}

main();
