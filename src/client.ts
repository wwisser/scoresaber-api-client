import {PagesReply, PagifiedPlayer, Player, Score, ScoreReply} from "./representations";
import {IRestResponse, RestClient} from "typed-rest-client/RestClient";

export class ScoreSaberApi {

    private static readonly HOST: string = 'https://new.scoresaber.com/api/';

    private readonly restClient: RestClient = new RestClient(null, ScoreSaberApi.HOST);

    public async getPlayer(id: string): Promise<Player> {
        const response: IRestResponse<Player> = await this.restClient.get<Player>(`player/${id}/full`);

        if (response.result === null) {
            throw new Error(`Failed to fetch player ${id} (status=${response.statusCode})`);
        }

        return response.result;
    }

    public async getPlayers(offset: number): Promise<PagifiedPlayer[]> {
        const response: IRestResponse<PagifiedPlayer[]> = await this.restClient.get<PagifiedPlayer[]>(`players/${offset}`);

        if (response.result === null) {
            throw new Error(`Failed to fetch pagified players with offset=${offset} (status=${response.statusCode})`);
        }

        return response.result;
    }

    public async getScores(id: string, order: ScoreOrder, offset: number): Promise<ScoreReply> {
        const orderPath = ScoreSaberApi.getPathByScoreOrder(order);

        const response: IRestResponse<ScoreReply> = await this.restClient
            .get<ScoreReply>(`player/${id}/scores/${orderPath}/${offset}`);

        if (response.result === null) {
            throw new Error(`Failed to fetch scores for ${id} (status=${response.statusCode})`);
        }

        return response.result;
    }

    public async getAllScores(id: string): Promise<ScoreReply> {
        let scores: Score[] = [];
        let offset = 1;
        let wasLastResponseEmpty = false;

        while (!wasLastResponseEmpty) {
            await this.getScores(id, ScoreOrder.RECENT, offset++)
                .then(scoreReply => {
                    if (scoreReply.scores.length <= 0) {
                        wasLastResponseEmpty = true;
                        return;
                    }

                    scores.push(...scoreReply.scores);
                })
                .catch(console.error);
        }

        return {
            scores
        }
    }

    public async getPlayerPages(): Promise<PagesReply> {
        const response: IRestResponse<PagesReply> = await this.restClient.get<PagesReply>(`players/pages`);

        if (response.result === null) {
            throw new Error(`Failed fetch to pages (status=${response.statusCode})`);
        }

        return response.result;
    }

    private static getPathByScoreOrder(order: ScoreOrder): string {
        switch (order) {
            case ScoreOrder.RECENT:
                return 'recent';
            case ScoreOrder.TOP:
                return 'top';
            default:
                throw new Error(`Unsupported ScoreOrder: ${order}`);
        }
    }

}

export enum ScoreOrder {
    TOP,
    RECENT
}
