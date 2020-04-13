import {Player} from "./representations";
import {IRestResponse, RestClient} from "typed-rest-client/RestClient";

export class ScoreSaberApi {

    private static readonly HOST: string = 'https://new.scoresaber.com/api/player/';

    private readonly restClient: RestClient = new RestClient(null, ScoreSaberApi.HOST);

    public async getPlayer(id: string): Promise<Player> {
        const response: IRestResponse<Player> = await this.restClient.get<Player>(`${id}/full/`);

        if (response.result === null) {
            throw new Error(`Failed to fetch player ${id} (status=${response.statusCode})`);
        }

        return response.result;
    }

}