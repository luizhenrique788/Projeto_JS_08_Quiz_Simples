const questions = [
    {
        question: "O que significa CSS?",
        options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Syntax"],
        answer: "Cascading Style Sheets"
    },

    {
        question: "Qual tag HTML é usada para criar um link?",
        options: ["<link>", "<a>", "<href>"],
        answer: "<a>"
    },

    {
        question: "Como você seleciona um elemento com id 'exemplo' em JavaScript?",
        options: ["document.query('#exemplo')", "document.getElementById('exemplo')", "getElement('exemplo')"],
        answer: "document.getElementById('exemplo')"
    }
];


let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const submitBtn = document.getElementById('submit-btn');
const resultEl = document.getElementById('result');

loadQuestion();

submitBtn.addEventListener('click', checkAnswer);

function loadQuestion() {
    resultEl.textContent = '';
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach(option => {

        const label = document.createElement('label');

        label.className = 'option';

        const radio = document.createElement('input');

        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = option;
        label.appendChild(radio);
        label.appendChild(document.createTextNode(option)); // Adiciona o texto
        optionsContainer.appendChild(label);
    });
}

function checkAnswer() {

    const selectedOption = document.querySelector('input[name="quiz"]:checked');

    if (!selectedOption) {
        resultEl.textContent = 'Por favor, selecione uma opção.';
        resultEl.style.color = 'red';
        return;
    }

    const answer = selectedOption.value;
    const correctAnswer = questions[currentQuestionIndex].answer;

    Array.from(optionsContainer.children).forEach(label => {
        const input = label.querySelector('input');
        if (input.value === correctAnswer) {
            label.classList.add('correct');
        } else if (input.value === answer) {
            label.classList.add('incorrect');
        }
    });


    if (answer === correctAnswer) {
        score++;
        resultEl.textContent = 'Correto!';
        resultEl.style.color = 'green';
    } else {
        resultEl.textContent = `Errado! A resposta correta é: ${correctAnswer}`;
        resultEl.style.color = 'red';
    }


    submitBtn.disabled = true;

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
            submitBtn.disabled = false;
        } else {
            showFinalResults();
        }
    }, 2000);
}

function showFinalResults() {
    questionEl.textContent = 'Quiz Concluído!';
    optionsContainer.innerHTML = '';
    submitBtn.style.display = 'none';
    resultEl.textContent = `Você acertou ${score} de ${questions.length} perguntas!`;
    resultEl.style.color = 'black';
}