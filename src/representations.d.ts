export interface Badge {
    image: string,
    description: string,
}

export interface PlayerInfo {
    playerId: string,
    pp: number,
    banned: boolean,
    inactive: boolean,
    name: string,
    country: string,
    role: string,
    badges: Badge[],
    history: string,
    avatar: string,
    rank: number,
    countryRank: number
}

export interface ScoreStats {
    totalScore: number,
    totalRankedScore: number,
    averageRankedAccuracy: number,
    totalPlayCount: number,
    rankedPlayCount: number
}

export interface Player {
    playerInfo: PlayerInfo,
    scoreStats: ScoreStats
}
