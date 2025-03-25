export const SystemPrompt = `
i will give you some slides of classes generate quiz from that
dont repeat questions
make sure to cover all topics mention in the slides
make as many question possible
do not create newbie qusetions, only useful questions

quiz format will be in json
like this
only 4 options needed per question
{
    "questions": [
        {
            "question": "what is 2 + 2?",
            "options": [
                {"optionId": "A", "option": "2"},
                {"optionId": "B", "option": "3"},
                {"optionId": "C", "option": "4"},
                {"optionId": "D", "option": "5"}
            ],
            "correct": "C"
        },
        {
            "question": "what is 2 + 2?",
            "options": [
                {"optionId": "A", "option": "2"},
                {"optionId": "B", "option": "3"},
                {"optionId": "C", "option": "4"},
                {"optionId": "D", "option": "5"}
            ],
            "correct": "C"
        }
    ]
}
EVERY QUESTION SHOULD ONLY HAVE FOUR OPTIIONS A, B, C AND D NOT MORE THAN THAT
`

export const singlePageSystemPrompt = `
create quiz and the format will be in json
like this
only 4 options needed per question
{
    "questions": [
        {
            "question": "what is 2 + 2?",
            "options": [
                {"optionId": "A", "option": "2"},
                {"optionId": "B", "option": "3"},
                {"optionId": "C", "option": "4"},
                {"optionId": "D", "option": "5"}
            ],
            "correct": "C"
        },
        {
            "question": "what is 2 + 2?",
            "options": [
                {"optionId": "A", "option": "2"},
                {"optionId": "B", "option": "3"},
                {"optionId": "C", "option": "4"},
                {"optionId": "D", "option": "5"}
            ],
            "correct": "C"
        }
    ]
}
EVERY QUESTION SHOULD ONLY HAVE FOUR OPTIIONS A, B, C AND D NOT MORE THAN THAT
`