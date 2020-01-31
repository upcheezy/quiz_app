function getStarted() {
    $('.quiz').on('click', '.startButton', function(event) {
        // alert('you just clicked the start button')
        renderAQuestion();
    })
}

/*displays the question*/
function renderAQuestion() {
    let question = STORE[0];
    console.log(question.question);
    // updateQuestionAndScore();
    const questionHtml = $(`
    <h3>Question 1</h3>
        <form>
            <fieldset>
              <legend class="questionText">${question.question}</legend>
              <input type="radio" name="gender" value="option1" checked>${question.options[0]}<br>
                <input type="radio" name="gender" value="option2">${question.options[1]}<br>
                <input type="radio" name="gender" value="option3">${question.options[2]}<br>
                <input type="radio" name="gender" value="option4">${question.options[3]}
            </fieldset>
        </form>
        <button type="button" class="startButton button">Next</button>`);
    console.log(questionHtml);
  $("quiz").find('inner-quiz-box').html(questionHtml);
//   updateOptions();
// $("#next-question").hide();
}

$(getStarted())