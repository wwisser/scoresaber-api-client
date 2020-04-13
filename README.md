# ScoreSaber API Client
https://new.scoresaber.com/api/

### Compile TypeScript
``npx tsc``

### Usage
```typescript
import {ScoreSaberApi} from "./client";
import {Player, PlayerInfo, ScoreStats} from "./representations";

const api: ScoreSaberApi = new ScoreSaberApi();

api
    .getPlayer('76561198098563481')
    .then((player: Player) => {
        const playerInfo: PlayerInfo = player.playerInfo;
        const stats: ScoreStats = player.scoreStats;

        // do something with your data
    })
    .catch(console.error);

```