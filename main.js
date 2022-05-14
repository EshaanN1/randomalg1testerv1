//LOADING
window.setTimeout(bringIn, 3100);
window.setTimeout(randomDeterminer, 1000);
window.setTimeout(update, 1000);
window.setTimeout(updateStats, 1000);

//FINISH TRANSITION
function bringIn() {
  document.getElementById("h1").style.opacity = 1;
  document.getElementById("h2").style.opacity = 1;
  document.getElementById("question").style.opacity = 1;
  document.getElementById("statistics").style.opacity = 1;
}

//RANDOM NUMBER GENERATOR
function random(max) {
  number = Math.floor(Math.random() * max);
}

//QUESTION PICKER
function randomDeterminer() {
  random(3);
  if (number == 0) {
    questionType = "Sequences";
    setSequence();
  } else if (number == 1) {
    questionType = "Linear Slope";
    setSlope();
  } else if (number == 2) {
    questionType = "Exponential Growth/Decay";
    setExpGD();
  } else if (number == 3) {
    questionType = "Exponent Laws";
  }
  if (questionType == "Exponential Growth/Decay") {
    document.getElementById("answers").type = "text";
  } else {
    document.getElementById("answers").type = "number";
  }
}

//LOCAL STORAGE FETCHER
function fetch(key) {
  if (localStorage.getItem(key) == null) {
    localStorage.setItem(key, 0);
  }
  return localStorage.getItem(key);
}

//LOCAL STORAGE SAVER
function save(key, toSave) {
  localStorage.setItem(key, toSave);
}

//IF QUESTIONTYPE = SEQUENCE
function setSequence() {
  random(2);
  if (number == 0) {
    sequenceType = "Arithmetic";
  } else if (number == 1) {
    sequenceType = "Geometric";
  }

  random(2);
  if (number == 0) {
    sequenceQuestionType = "find-ratio";
  } else if (number == 1) {
    sequenceQuestionType = "find-term";
  }

  if (sequenceType == "Arithmetic") {
    random(1000);
    ratio = number + 1;
    random(1000);
    term1 = number;

    random(4);
    if (number == 1) {
      ratio = ratio * -1;
    } else if (number == 2) {
      ratio = ratio * -1;
      if (term1 != 0) {
        term1 = term1 * -1;
      }
    } else if (number == 3) {
      if (term1 != 0) {
        term1 = term1 * -1;
      }
    }

    term2 = term1 + ratio;
    term3 = term2 + ratio;
    term4 = term3 + ratio;
    term5 = term4 + ratio;
    term6 = term5 + ratio;

  } else if (sequenceType == "Geometric") {
    random(8);
    ratio = number + 1;
    random(12);
    term1 = number + 1;

    random(4);
    if (number == 1) {
      ratio = ratio * -1;
    } else if (number == 2) {
      ratio = ratio * -1;
      term1 = term1 * -1;
    } else if (number == 3) {
      term1 = term1 * -1;
    }

    term2 = term1 * ratio;
    term3 = term2 * ratio;
    term4 = term3 * ratio;
    term5 = term4 * ratio;
    term6 = term5 * ratio;
  }

  if (sequenceQuestionType == "find-ratio") {
    correctAnswer = ratio;
    if (sequenceType == "Arithmetic") {
      document.getElementById("questionText1").innerHTML = "Find the common difference.";
    } else if (sequenceType == "Geometric") {
      document.getElementById("questionText1").innerHTML = "Find the common ratio.";
    }
  } else if (sequenceQuestionType == "find-term") {
    if (sequenceType == "Arithmetic") {
      random(7);
      termNumber = number + 7;
      correctAnswer = term1 + (termNumber - 1) * ratio;
    } else if (sequenceType == "Geometric") {
      random(4);
      termNumber = number + 7;
      correctAnswer = term1 * Math.pow(ratio, (termNumber - 1));
    }
    document.getElementById("questionText1").innerHTML = "Find the " + termNumber + "th term.";
  }

  finalSequence = term1 + ", " + term2 + ", " + term3 + ", " + term4 + ", " + term5 + ", " + term6;


  document.getElementById("questionType").innerHTML = "Question Type: " + questionType;
  document.getElementById("typeType").innerHTML = "Sequence Type: " + sequenceType;
  document.getElementById("questionText2").innerHTML = finalSequence;

  console.log(questionType);
  console.log(sequenceType);
  console.log(sequenceQuestionType);
  console.log(ratio);
  console.log(term1);
  console.log(finalSequence);
  if (sequenceQuestionType == "find-term") {
    console.log(termNumber);
  }
  console.log(correctAnswer);
}

//IF QUESTIONTYPE = SLOPE
function setSlope() {
  document.getElementById("questionType").innerHTML = "Question Type: Linear Equation";

  random(100);
  intercept = number;
  random(21);
  slope = number + 2;

  random(2);
  if (number == 1) {
    slopeQuestionType = "identify-y-inter";
    document.getElementById("typeType").innerHTML = "Indentifying: Intercept";
    document.getElementById("questionText1").innerHTML = "Find the y-intercept.";
    correctAnswer = intercept;
  } else if (number == 0) {
    slopeQuestionType = "identify-slope";
    document.getElementById("typeType").innerHTML = "Indentifying: Slope";
    document.getElementById("questionText1").innerHTML = "Find the slope.";
    correctAnswer = slope;
  }

  equation = "y = " + slope + "x";
  if (intercept != 0) {
    equation += " + " + intercept;
  }

  document.getElementById("questionText2").innerHTML = equation;

  console.log(questionType);
  console.log(slopeQuestionType);
  console.log(correctAnswer);
  console.log(equation);
}

//IF QUESTIONTYPE = EXPGD
function setExpGD() {
  document.getElementById("questionType").innerHTML = "Question Type: Exponential Equation";
  document.getElementById("typeType").innerHTML = "Identify: Growth/Decay";
  document.getElementById("questionText1").innerHTML = "Case Sensitive; Use: 'Decay', 'Growth', 'Neither' ";
  
  random(10000000);
  start = number + 1;
  random(200);
  percent = (number + 1)/100;

  if (percent < 1) {
    correctAnswer = "Decay";
  } else if (percent == 1) {
    correctAnswer = "Neither";
  } else if (percent > 1) {
    correctAnswer = "Growth";
  }

  equation = start + "(" + percent + ")<sup>x</sup>";
  document.getElementById("questionText2").innerHTML = equation;

  console.log(questionType);
  console.log(start);
  console.log(percent);
  console.log(equation);
}

//ON ANSWER SUBMISSION
function check() {
  submittedAnswer = document.getElementById("answers").value;
  if (submittedAnswer == correctAnswer) {
    document.getElementById("feedback").innerHTML = "Correct! <br> <h2 class='button' onclick='nextQuestion()'>Next Question</h2><br>";
    if (questionType == "Sequences") {
      if (sequenceType == "Arithmetic") {
        ariSeqCorrect = Number(ariSeqCorrect) + 1;
      } else if (sequenceType == "Geometric") {
        geoSeqCorrect = Number(geoSeqCorrect) + 1;
      }
    } else if (questionType == "Linear Slope") {
      if (slopeQuestionType == "identify-y-inter") {
        interceptCorrect = Number(interceptCorrect) + 1;
      } else if (slopeQuestionType == "identify-slope") {
        slopeCorrect = Number(slopeCorrect) + 1;
      }
    } else if (questionType == "Exponential Growth/Decay") {
      expCorrect = Number(expCorrect) + 1;
    }
  } else {
    document.getElementById("feedback").innerHTML = "Incorrect (Answer was " + correctAnswer + ")! <br><h2 class='button' onclick='nextQuestion()'>Next Question</h2><br>";
  }
  if (questionType == "Sequences") {
    if (sequenceType == "Arithmetic") {
      ariSeqTotal = Number(ariSeqTotal) + 1;
    } else if (sequenceType == "Geometric") {
      geoSeqTotal = Number(geoSeqTotal) + 1;
    }
  } else if (questionType == "Linear Slope") {
    if (slopeQuestionType == "identify-y-inter") {
      interceptTotal = Number(interceptTotal) + 1;
    } else if (slopeQuestionType == "identify-slope") {
      slopeTotal = Number(slopeTotal) + 1;
    }
  } else if (questionType == "Exponential Growth/Decay") {
    expTotal = Number(expTotal) + 1;
  }
  reloadDatabase();
  updateStats();
}


//WHEN DONE COMPLAINING ABOUT INCORECT
function nextQuestion() {
  document.getElementById("feedback").innerHTML = "<br>";
  document.getElementById("answers").value = "";
  randomDeterminer();
}

//GET SCORES
function update() {
  ariSeqCorrect = fetch("ariSeqCorrect");
  ariSeqTotal = fetch("ariSeqTotal");
  geoSeqCorrect = fetch("geoSeqCorrect");
  geoSeqTotal = fetch("geoSeqTotal");
  slopeTotal = fetch("slopeTotal");
  slopeCorrect = fetch("slopeCorrect");
  interceptTotal = fetch("interceptTotal");
  interceptCorrect = fetch("interceptCorrect");
  expCorrect = fetch("expCorrect");
  expTotal = fetch("expTotal");

  console.log("AriSeq: " + ariSeqCorrect + "/" + ariSeqTotal);
  console.log("GeoSeq: " + geoSeqCorrect + "/" + geoSeqTotal);
  console.log("Slope: " + slopeCorrect + "/" + slopeTotal);
  console.log("Inter: " + interceptCorrect + "/" + interceptTotal);
  console.log("Exp: " + expCorrect + "/" + expTotal);
}

//SAVE DATA
function reloadDatabase() {
  save("ariSeqCorrect", ariSeqCorrect);
  save("geoSeqCorrect", geoSeqCorrect);
  save("ariSeqTotal", ariSeqTotal);
  save("geoSeqTotal", geoSeqTotal);
  save("interceptTotal", interceptTotal);
  save("interceptCorrect", interceptCorrect);
  save("slopeTotal", slopeTotal);
  save("slopeCorrect", slopeCorrect);
  save("expCorrect", expCorrect);
  save("expTotal", expTotal);
}

//UPDATE STAT BOARD
function updateStats() {
  document.getElementById("aS").innerHTML = "Arithmetic: " + ariSeqCorrect + "/" + ariSeqTotal + " or " + (ariSeqCorrect*100/ariSeqTotal) + "%";
  document.getElementById("gS").innerHTML = "Geometric: " + geoSeqCorrect + "/" + geoSeqTotal + " or " + (geoSeqCorrect*100/geoSeqTotal) + "%";
  document.getElementById("sL").innerHTML = "Slope: " + slopeCorrect + "/" + slopeTotal + " or " + (slopeCorrect*100/slopeTotal) + "%";
  document.getElementById("yL").innerHTML = "Y-Intercept: " + interceptCorrect + "/" + interceptTotal + " or " + (interceptCorrect*100/interceptTotal) + "%";
  document.getElementById("gdE").innerHTML = "Growth/Decay: " + expCorrect + "/" + expTotal + " or " + (expCorrect*100/expTotal) + "%";
}