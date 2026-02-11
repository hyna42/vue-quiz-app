import { decode } from "html-entities";
import { ref } from "vue";

export type TriviaQuestion = {
    type: "multiple" | "boolean";
    difficulty: "easy" | "medium" | "hard";
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
};


type ApiResponse = {
    response_code: number,
    results: TriviaQuestion[]

}


export const useFetchQuestions = () => {
    const questions = ref<TriviaQuestion[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    // decode html
    const decodeQuestion = (q: TriviaQuestion): TriviaQuestion => ({
        ...q,
        question: decode(q.question),
        correct_answer: decode(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map(incorrect => decode(incorrect))
    });


    // decode html

    const fetchQuestions = async (url: string): Promise<void> => {
        loading.value = true;
        error.value = null;
        questions.value = []

        try {
            const res = await fetch(url)
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const datas: ApiResponse = await res.json()
            questions.value = datas.results.map(decodeQuestion)
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error'
            console.error("Error", err)
        }
        finally {
            loading.value = false;
        }
    }


    return {
        questions,
        error,
        loading,
        fetchQuestions
    }

}   