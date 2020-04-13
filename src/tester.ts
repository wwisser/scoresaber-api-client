import {ScoreSaberApi} from "./client";
import {Player, PlayerInfo, Score, ScoreOrder, ScoreReply, ScoreStats} from "./representations";

const api: ScoreSaberApi = new ScoreSaberApi();

api
    .getPlayer('76561198098563481')
    .then((player: Player) => {
        const playerInfo: PlayerInfo = player.playerInfo;
        const stats: ScoreStats = player.scoreStats;

        // do something with your data
    })
    .catch(console.error);


api
    .getScores('76561198098563481', ScoreOrder.TOP, 1)
    .then((scoreReply: ScoreReply) => {
        const scores: Score[] = scoreReply.scores;

        console.log(scores);
    })
    .catch(console.error);

