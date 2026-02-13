type TypeMessage = {
    emoji: string,
    title: string,
    text: string
}

export const getMessaye = (pct: number): TypeMessage => {
    if (pct === 100) {
        return {
            emoji: "🎉",
            title: "Perfect Score!",
            text: "You're a quiz master! Absolutely incredible!",
        };
    } else if (pct >= 80) {
        return {
            emoji: "🌟",
            title: "Excellent!",
            text: "You really know your stuff. Great job!",
        };
    } else if (pct >= 60) {
        return {
            emoji: "👍",
            title: "Good Job!",
            text: "You did well. Keep practicing!",
        };
    } else if (pct >= 40) {
        return {
            emoji: "💪",
            title: "Not Bad!",
            text: "There's room to improve. Try again!",
        };
    } else {
        return {
            emoji: "📚",
            title: "Keep Learning!",
            text: "Don't give up. Knowledge comes with practice!",
        };
    }


}