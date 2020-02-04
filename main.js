function getStarted() {
  $('.quiz').on('click', '.startButton', function (event) {
    renderAQuestion(0);
  })
}

// this will handle looping through the store object and adding the next question each time
function nextQuestion() {
  let questionNumber = 0
  $('.quiz').on('submit', '#js-questions', function (event) {
    event.preventDefault();

    let item = STORE[questionNumber];
    let selectedOption = $("input[name=option]:checked").val();

    questionNumber += 1;
    if (questionNumber > 9) {
      alert("sorry, that's the end of the quiz");
      // getStarted();
    } else {
      determineCorrectness(selectedOption, item);
      $(".inner-quiz-box").html(renderAQuestion(questionNumber));
    }
  })
}

/*displays the question*/
function renderAQuestion(questionNum) {
  let question = STORE[questionNum];
  const questionHtml = $(`
      <h3>Question ${questionNum + 1}</h3>
          <form id='js-questions'>
              <fieldset>
                <legend class="questionText">${question.question}</legend>
                  <input type="radio" name="option" value="${question.options[0]}" checked>${question.options[0]}<br>
                  <input type="radio" name="option" value="${question.options[1]}">${question.options[1]}<br>
                  <input type="radio" name="option" value="${question.options[2]}">${question.options[2]}<br>
                  <input type="radio" name="option" value="${question.options[3]}">${question.options[3]}
              </fieldset>
              <button type="submit">Next</button>
          </form>
          `);

  $(".inner-quiz-box").html(questionHtml);
}

function determineCorrectness(selectedOption, item) {
  let currentAns = item.answer;
  console.log(currentAns);
  console.log(selectedOption);
  // if (currentQues === selectedOption) {
  //   renderFeedback(selectedOption);
  // } else {
  //   handleIncorrect();
  // }

  const isCorrect = currentAns === selectedOption ? true : false;
  console.log(isCorrect);
  renderFeedback(isCorrect, currentAns);
}

function renderFeedback(isCorrect, currentAns) {
  // HTML portion of feedback reliant on correctness 
  const correctnessHTML = isCorrect ? `Inccorrect, correct answer is ${currentAns}` : `Correct!`
  console.log(correctnessHTML);

  // incorporate that into the general HTML feedback 
  const feedbackHTML = `
      <section>
        <p>${correctnessHTML}</p>
        <button>next</button>
      </section>
    `

  // render the HTML
  $('.inner-quiz-box').html(feedbackHTML)
}

function handleQuizApp() {
  getStarted();
  nextQuestion();
}

$(handleQuizApp());