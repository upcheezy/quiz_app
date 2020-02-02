function getStarted() {
    $('.quiz').on('click', '.startButton', function(event) {
        // alert('you just clicked the start button')
        let selectedOption = $("input[name=option]:checked").val();
        console.log(selectedOption);
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
            <button type="submit">Next</button>
        </form>
        `);
    // console.log(questionHtml);
  $(".inner-quiz-box").html(questionHtml);
  
//   determineCorrectness(question);
}

// this will handle looping through the store object and adding the next question each time
function nextQuestion() {
    // STORE.score = 0;
    let questionNumber = 1
    $('.quiz').on('submit', '#js-questions', function(event) {
        event.preventDefault();
        let item = STORE[questionNumber];
        let selectedOption = $("input[name=option]:checked").val();
        // alert('you just clicked the next button')
        // console.log(selectedOption);
        console.log(item);
        questionNumber += 1;
        if (questionNumber > 10) {
            alert("sorry, that's the end of the quiz");
            getStarted();
        } else {
            $(".inner-quiz-box").html(updateQuestion(questionNumber, item));
            determineCorrectness(selectedOption, item);
        }
    })
}

function updateQuestion(questionNumber, item) {
    return `
    <h3>Question ${questionNumber}</h3>
        <form id='js-questions'>
            <fieldset>
              <legend class="questionText">${item.question}</legend>
              <input type="radio" name="option" value="${item.options[0]}" checked>${item.options[0]}<br>
                <input type="radio" name="option" value="${item.options[1]}">${item.options[1]}<br>
                <input type="radio" name="option" value="${item.options[2]}">${item.options[2]}<br>
                <input type="radio" name="option" value="${item.options[3]}">${item.options[3]}
            </fieldset>
            <button type="submit" class="questionButton button">Next</button>
        </form>
        `;
}

function determineCorrectness(selectedOption, item) {
        let currentQues = item.answer;
        // let selectedOption = $("input[name=option]:checked").val();
        console.log(currentQues);
        console.log(selectedOption);
        if (currentQues === selectedOption) {
            alert('you got the right answer');
        } else {
            alert('sorry, not right')
        }
}

function handleQuizApp() {
    getStarted();
    nextQuestion();
    // determineCorrectness()
}

$(handleQuizApp());
