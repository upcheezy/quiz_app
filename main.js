function getStarted() {
  $('.quiz').on('click', '.startButton', function (event) {
    renderAQuestion(0);
  })
}

let questionNumber = 0;
let score = 0;
// this will handle looping through the store object and adding the next question each time
function nextQuestion() {
  // let questionNumber = 0
  $('.quiz').on('submit', '#js-questions', function (event) {
    event.preventDefault();

    let item = STORE[questionNumber];
    let selectedOption = $("input[name=option]:checked").val();
    console.log(questionNumber);
    if (questionNumber > 8) {
      // need to create a new function for this section to handle the last question
      // as well as a scoring page
      console.log('inside')
      determineFinalCorrectness(selectedOption, item);
      // questionNumber = 0;
    } else {
      $(".inner-quiz-box").html(renderAQuestion(questionNumber));
      determineCorrectness(selectedOption, item, questionNumber);
    }
    questionNumber += 1;
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

function determineCorrectness(selectedOption, item, questionNumber) {
  let currentAns = item.answer;
  // console.log(currentAns);
  // console.log(selectedOption);

  const isCorrect = currentAns === selectedOption ? true : false;
  // console.log(isCorrect);
  renderFeedback(isCorrect, currentAns, questionNumber);
}

function renderFeedback(isCorrect, currentAns, questionNumber) {
  // HTML portion of feedback reliant on correctness
  if (isCorrect) {
    console.log('inside rederfeedback');
    $(`li #${questionNumber}`).removeClass('far fa-square').addClass('far fa-plus-square');
    // console.log(imageCont);
    correctnessHTML = `Correct!`;
    score += 1;
  } else {
    // alert('esNawt')
    $(`li #${questionNumber}`).removeClass('far fa-square').addClass('far fa-minus-square');
    correctnessHTML = `Inccorrect, correct answer is ${currentAns}`
  }

  // incorporate that into the general HTML feedback 
  const feedbackHTML = `
      <section>
        <p>${correctnessHTML}</p>
        <button class='startButtonNext'>next</button>
      </section>
    `

  // render the HTML
  $('.inner-quiz-box').html(feedbackHTML)
}

function continueFeedback() {
  $('.quiz').on('click', '.startButtonNext', function (event) {
    renderAQuestion(questionNumber);
    // alert(questionNumber);
  })
}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////final pages/////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function determineFinalCorrectness(selectedOption, item, questionNumber) {
  let currentAns = item.answer;
  // console.log(currentAns);
  // console.log(selectedOption);

  const isCorrect = currentAns === selectedOption ? true : false;
  // console.log(isCorrect);
  renderFinalFeedback(isCorrect, currentAns, questionNumber);
}

function renderFinalFeedback(isCorrect, currentAns, questionNumber) {
  // HTML portion of feedback reliant on correctness
  if (isCorrect) {
    console.log('inside final rederfeedback');
    $(`li #${questionNumber}`).removeClass('far fa-square').addClass('far fa-plus-square');
    // console.log(imageCont);
    correctnessHTML = `Correct!`;
    score += 1;
  } else {
    // alert('esNawt')
    $(`li #${questionNumber}`).removeClass('far fa-square').addClass('far fa-minus-square');
    correctnessHTML = `Inccorrect, correct answer is ${currentAns}`
  }

  // incorporate that into the general HTML feedback 
  const feedbackHTML = `
      <section>
        <p>${correctnessHTML}</p>
        <button class='finalNext'>next</button>
      </section>
    `

  // render the HTML
  $('.inner-quiz-box').html(feedbackHTML)
}

function continueFinalFeedback() {
  $('.quiz').on('click', '.finalNext', function (event) {
    finalPage();
    // alert(questionNumber);
  })
}

function finalPage() {
  perc = (score/10)*100
  const questionHtml = $(`
      <h3>Thanks for testing you geog skillz!</h3>
      <p>Your score is ${score}/10!</p>
      <p>That's ${perc}%!</p>
      <button type="button" class="startOverButton button">start over</button>
  `);

  $(".inner-quiz-box").html(questionHtml);
}

function returnToBeginning() {
  $('.quiz').on('click', '.startOverButton', function (event) {
    questionNumber = 0;
    score = 0;
    renderAQuestion(questionNumber);
    // alert(questionNumber);
  })
}

function handleQuizApp() {
  getStarted();
  nextQuestion();
  continueFeedback();
  continueFinalFeedback();
  returnToBeginning();
}

$(handleQuizApp());