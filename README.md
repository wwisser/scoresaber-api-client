# ScoreSaber API Client
https://new.scoresaber.com/api/

### Compile TypeScript
``npx tsc``

### Full Player Info
```typescript
const api: ScoreSaberApi = new ScoreSaberApi();

api
    .getPlayer('76561198098563481')
    .then((player: Player) => {
        const playerInfo: PlayerInfo = player.playerInfo;
        const stats: ScoreStats = player.scoreStats;

        // do something
    })
    .catch(console.error);
```

### Top/Recent Scores
```typescript
const api: ScoreSaberApi = new ScoreSaberApi();

api
    .getScores('76561198098563481', ScoreOrder.TOP, 1)
    .then((scoreReply: ScoreReply) => {
        const scores: Score[] = scoreReply.scores;

        // do something
    })
    .catch(console.error);
```