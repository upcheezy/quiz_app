function getStarted() {
    $('.quiz').on('click', '.startButton', function(event) {
        // alert('you just clicked the start button')
        renderAQuestion();
    })
}

/*displays the question*/
function renderAQuestion() {
    let question = STORE[0];
    // console.log(question.question);
    // updateQuestionAndScore();
    const questionHtml = $(`
    <h3>Question 1</h3>
        <form id='js-questions'>
            <fieldset>
              <legend class="questionText">${question.question}</legend>
              <input type="radio" name="gender" value="option1" checked>${question.options[0]}<br>
                <input type="radio" name="gender" value="option2">${question.options[1]}<br>
                <input type="radio" name="gender" value="option3">${question.options[2]}<br>
                <input type="radio" name="gender" value="option4">${question.options[3]}
            </fieldset>
        </form>
        <button type="submit" class="questionButton button">Next</button>`);
    // console.log(questionHtml);
  $(".inner-quiz-box").html(questionHtml);
}

// console.log(STORE[0]);

function addQuestionNumber() {
    for (let i=0; i < STORE.length; i++) {
        // console.log(i);
        STORE[i].currentQuestion = i
    }

    // console.log(STORE)
}

// this will handle looping through the store object and adding the next question each time
function nextQuestion() {
    // STORE.score = 0;
    let questionNumber = 1
    $('.quiz').on('click', '.questionButton', function(event) {
        // alert('you just clicked the next button')
        item = STORE[questionNumber];
        questionNumber += 1;
        if (questionNumber > 10) {
            alert("sorry, that's the end of the quiz");
            getStarted();
        } else {
            $(".inner-quiz-box").html(updateQuestion(questionNumber, item));
        }
    })
}

function updateQuestion(questionNumber, item) {
    return `
    <h3>Question ${questionNumber}</h3>
        <form id='js-questions'>
            <fieldset>
              <legend class="questionText">${item.question}</legend>
              <input type="radio" name="gender" value="option1" checked>${item.options[0]}<br>
                <input type="radio" name="gender" value="option2">${item.options[1]}<br>
                <input type="radio" name="gender" value="option3">${item.options[2]}<br>
                <input type="radio" name="gender" value="option4">${item.options[3]}
            </fieldset>
        </form>
        <button type="submit" class="questionButton button">Next</button>`;
}

function determineCorrectness() {
    $('body').submit('#js-questions', function(event) {
        event.preventDefault();
        let currentQues = STORE.currentQuestion;
        let selectedOption = $("input[name=options]:checked").val();
        console.log(currentQues);
    })
}

function handleQuizApp() {
    getStarted();
    addQuestionNumber();
    nextQuestion();
    determineCorrectness();
}

$(handleQuizApp());
