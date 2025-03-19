interface Player {
    id: number;
    name: string;
}

export interface Answer {
    id: number;
    answer: string;
    player: Player;
}
