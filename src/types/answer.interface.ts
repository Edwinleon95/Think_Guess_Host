interface Player {
    id: number;
    name: string;
    correctAnswers: number;
}

export interface Answer {
    id: number;
    answer: string;
    isCorrect: boolean;
    player: Player;
}
