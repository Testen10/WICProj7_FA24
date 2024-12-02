const quizData = [
    // basic Knowledge group
    {
        question: "What is one of the main causes of global warming?",
        answers: [
            { text: "Taking the train", score: 0 },
            { text: "Eating unhealthy foods", score: 0 },
            { text: "Burning fossil fuels", score: 1 },
            { text: "Littering", score: 0 }
        ],
        group: "basicKnowledge" // Group label
    },
    {
        question: "What is a dish that is environmentally safe to eat?",
        answers: [
            { text: "Caesar Salad", score: 1 },
            { text: "BBQ ribs", score: 0 },
            { text: "Fish Fillet", score: 0 },
            { text: "Medium-rare Steak", score: 0 }
        ],
        group: "basicKnowledge" // Group label
    },
    {
        question: "Which of these modes of transport is the most green?",
        answers: [
            { text: "Carpooling", score: 0 },
            { text: "Hybrid vehicles (electric and gas powered)", score: 1 },
            { text: "Electric biking/scootering", score: 0 },
            { text: "Taking the train", score: 0 }
        ],
        group: "basicKnowledge"
    },
    {
        question: "What item from this list should you compost?",
        answers: [
            { text: "Plastic water bottle", score: 0 },
            { text: "Broken charging cords", score: 0 },
            { text: "Crushed egg shells", score: 1 },
            { text: "Bones from food", score: 0 }
        ],
        group: "basicKnowledge"
    },
    // lifestyle questions
    {
        question: "What is your main transportation?",
        answers: [
            { text: "On foot / bicycle",  score: 2 },
            { text: "Public transportation", score: 1},
            { text: "private transportation", score: 0 },
        ],
        group: "lifestyle"
    },
    {
        question: "Have you tried vegan foods?",
        answers: [
            { text: "Yes, and I often enjoy them!",  score: 3 },
            { text: "Yes, but I don't really enjoy them.", score: 2},
            { text: "No, but I am interested on them", score: 1},
            { text: "No, and I don't think I would try them.", score: 0 }
        ],
        group: "lifestyle"
    },
    {
        question: "Do you recycle?",
        answers: [
            { text: "Yes, and I known how to do them well!",  score: 2 },
            { text: "Yes, but I don't really know how to.", score: 1},
            { text: "No, I just throw them away all in once.", score: 0 }
        ],
        group: "lifestyle"
    },
    {
        question: "Do you recycle?",
        answers: [
            { text: "Yes, and I known how to do them well!",  score: 2 },
            { text: "Yes, but I don't really know how to.", score: 1},
            { text: "No, I just throw them away all in once.", score: 0 }
        ],
        group: "lifestyle"
    }
];

// Select the HTML elements
const questionContainer = document.querySelector(".questions");
const resultsContainer = document.querySelector(".results");
const submitButton = document.querySelector("#submit");
const restartButton = document.querySelector("#restart");

// Short comments based on score
const responses = [
    // 0-2 correct for basic knowledge & 0-3 score for lifestyle
    `Hmm... looks like you aren't quite living a eco-friendly life yet...
        We highly suggest you to go through our website and seek ways to make your life more greener!`, 
    
    // 0-2 correct for basic knowledge & 4-6 score for lifestyle
    `Interesting... You are living a some-kind-of eco-friendly life in spite of lacking knowledge.
        How about going through our website for more information?`,
    
    // 0-2 correct for basic knowledge & 7-9 score for lifestyle
     `VERY INTERSTING!!! You are living a eco-friendly life in spite of lacking knowledge.
        You could browse through our website to figure out how your actions are making a better world for our future generation :P`,
    

    // 3-4 correct for basic knowledge & 0-3 score for lifestyle
    `You have plenty amount of knowledge about eco-friendly life, and now it's time to actually take an action!
        Maybe getting to know about the impact of your action may work as the driving force? (Our website would be helpful :p)`, 
    // 3-4 correct for basic knowledge & 4-6 score for lifestyle
    `temp1`, 
    // 3-4 correct for basic knowledge & 7-9 score for lifestyle
    `temp2`, 
];

// Function to display all questions and answer options
function displayQuestions() {
    questionContainer.innerHTML = quizData
        .map((quiz, quizIndex) => `
            <div class="question-block">
                <p>${quizIndex + 1}. ${quiz.question}</p>
                <ul>
                    ${quiz.answers.map(
                        (answer, answerIndex) => `
                        <li>
                            <label>
                                <input type="radio" name="question-${quizIndex}" value="${answerIndex}">
                                <span class="answer-text"> &ensp;${answer.text}</span>
                            </label>
                        </li>
                    `
                    ).join("")}
                </ul>
            </div>
        `).join("");

    // Attach event listeners to radio buttons to check if all questions are answered
    const allInputs = questionContainer.querySelectorAll("input[type='radio']");
    allInputs.forEach(input => {
        input.addEventListener("change", enableSubmitButton);
    });
}

// Function to enable submit button only if all questions are answered
function enableSubmitButton() {
    const allAnswered = quizData.every((_, quizIndex) => 
        document.querySelector(`input[name="question-${quizIndex}"]:checked`) !== null
    );
    submitButton.disabled = !allAnswered;
}

// Function to handle form submission and calculate the score
function handleSubmit() {
    let groupScores = { basicKnowledge: 0, lifestyle: 0 };

    quizData.forEach((quiz, quizIndex) => {
        const selectedOption = document.querySelector(`input[name="question-${quizIndex}"]:checked`);
        if (selectedOption) {
            const selectedIndex = parseInt(selectedOption.value, 10);
            const score = quiz.answers[selectedIndex].score;
            groupScores[quiz.group] += score;
        }
    });

    // Hide submit button and questions container
    submitButton.style.display = "none";
    questionContainer.style.display = "none";

    // Display group-specific scores
    resultsContainer.innerHTML = `
        <p>Basic Knowledge Score: ${groupScores.basicKnowledge}</p>
        <p>Lifestyle Score: ${groupScores.lifestyle}</p>
    `;

    // Determine the comment based on scores
    let comment;
    if(groupScores.basicKnowledge > 2){
        if (groupScores.lifestyle > 6) comment = responses[5];
        else if (groupScores.lifestyle > 3) comment = responses[4];
        else comment = responses[3];
        // if (groupScores.lifestyle > 6) comment = "low knowledge green life";
        // else if (groupScores.lifestyle > 3) comment = "low knowledge somewhat green life";
        // else comment = "low knowledge notgreen life";
    }
    else {
        // if (groupScores.lifestyle > 6) comment = responses[2];
        // else if (groupScores.lifestyle > 3) comment = responses[1];
        // else comment = responses[0];
        if (groupScores.lifestyle > 6) comment = "low knowledge green life";
        else if (groupScores.lifestyle > 3) comment = "low knowledge somewhat green life";
        else comment = "low knowledge notgreen life";
    }

    // Append the comment to the results container
    resultsContainer.innerHTML += `<p>${comment}</p>`;

    // Display results and comments
    resultsContainer.style.display = "block";
    restartButton.style.display="block";
}

// Add event listener to submit button
submitButton.addEventListener("click", handleSubmit);

// Add event listener to restart button
restartButton.addEventListener("click", () => {
    location.reload();
});

// Display all questions when the page loads
displayQuestions();