let maxMultiplier = document.getElementById("maxMultiplier").value;
let maxMultiplicand = document.getElementById("maxMultiplicand").value;
let questionMultiplierElement = document.getElementById("questionMultiplier");
let questionSignElement = document.getElementById("questionSign");
let questionMultiplicandElement = document.getElementById("questionMultiplicand");
let feedbackElement = document.getElementById("feedback");
let visualizationElement = document.getElementById("visualization");
let correctAnswer;
const correctSound = document.getElementById("correctSound");
const bodyElement = document.body;

function generateQuestion() {
    let multiplier = Math.floor(Math.random() * maxMultiplier) + 1;
    let multiplicand = Math.floor(Math.random() * maxMultiplicand) + 1;
    correctAnswer = multiplier * multiplicand;
    questionMultiplierElement.innerHTML = multiplier;
    questionSignElement.innerHTML = ' × ';
    questionMultiplicandElement.innerHTML = multiplicand;
    createVisualization(multiplier, multiplicand);
    switchBackground();
}

function createVisualization(multiplier, multiplicand) {
    visualizationElement.innerHTML = '';
    for (let i = 0; i < multiplicand; i++) {
        let row = document.createElement('div');
        for (let j = 0; j < multiplier; j++) {
            let circle = document.createElement('div');
            circle.classList.add('circle');
            row.appendChild(circle);
        }
        visualizationElement.appendChild(row);
    }
    visualizationElement.style.textAlign = 'center';
}

function showFeedback(isCorrect) {
    feedbackElement.innerHTML = isCorrect ? 'כל הכבוד!' : 'נסה שוב!';
    feedbackElement.style.backgroundColor = isCorrect ? '#00FF00' : '#FF0000';
    feedbackElement.style.display = 'block';
    if (isCorrect) {
        playFireworks();
        playCorrectSound();
    }
}

function playCorrectSound() {
    correctSound.play();
}

function playFireworks() {
    const fireworksContainer = document.createElement('div');
    fireworksContainer.classList.add('fireworks-container');
    document.body.appendChild(fireworksContainer);

    for (let i = 0; i < 10; i++) {
        let firework = document.createElement('div');
        firework.classList.add('firework');
        firework.style.left = Math.random() * 100 + '%';
        firework.style.top = Math.random() * 100 + '%';
        fireworksContainer.appendChild(firework);
    }

    setTimeout(() => {
        fireworksContainer.remove();
    }, 3000); // Remove after 3 seconds
}

function switchBackground() {
    const currentBackground = bodyElement.style.backgroundImage.includes('background1.jpg') ? 'background2.jpg' : 'background1.jpg';
    bodyElement.style.backgroundImage = `url(${currentBackground})`;
    bodyElement.style.backgroundSize = 'contain'; // Changed to contain for TILE effect
    bodyElement.style.backgroundRepeat = 'repeat'; // Set to repeat for TILE effect
}

document.getElementById("updateQuestion").addEventListener("click", () => {
    maxMultiplier = document.getElementById("maxMultiplier").value;
    maxMultiplicand = document.getElementById("maxMultiplicand").value;
    generateQuestion();
});

document.getElementById("submitAnswer").addEventListener("click", () => {
    let userAnswer = document.getElementById("answer").value;

    if (parseInt(userAnswer) === correctAnswer) {
        showFeedback(true);
        setTimeout(() => {
            generateQuestion();
            feedbackElement.style.display = 'none';
            document.getElementById("answer").value = '';
        }, 2000);
    } else {
        showFeedback(false);
    }
});

document.getElementById("nextQuestion").addEventListener("click", () => {
    if (confirm("האם אתה בטוח שברצונך לעבור לשאלה הבאה?")) {
        generateQuestion();
        feedbackElement.style.display = 'none';
        document.getElementById("answer").value = '';
    }
});

document.getElementById("showAnswer").addEventListener("click", () => {
    let sum = 0;
    visualizationElement.innerHTML = '';
    for (let i = 0; i < correctAnswer / questionMultiplierElement.innerHTML; i++) {
        let row = document.createElement('div');
        sum += parseInt(questionMultiplierElement.innerHTML);
        for (let j = 0; j < parseInt(questionMultiplierElement.innerHTML); j++) {
            let circle = document.createElement('div');
            circle.classList.add('circle');
            row.appendChild(circle);
        }
        row.innerHTML += ` = ${sum}`;
        visualizationElement.appendChild(row);
    }
    visualizationElement.style.textAlign = 'center';
});

window.onload = generateQuestion;
