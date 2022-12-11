let countSpan = document.querySelector(".count span");
let bulletsSpanContainer = document.querySelector(".bullets .spans")
let quizArea = document.querySelector(".quiz-area");
let answers_area = document.querySelector('.answers-area');
let submitButton = document.querySelector(".submit-button");
let Bullets = document.querySelector(".bullets");
let ResultsContainer = document.getElementById("results");
let countdownElement = document.querySelector('.countdown ')
let currentIndex = 0;
let rAnswer = 0;
let CountDownIntervl;
let z;
let count;
let ahmed;
let mood = "submit"





function getQuestions(){
    let myRequest = new XMLHttpRequest;
    myRequest.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let qustionsObject = JSON.parse(this.responseText)
            let qustionsCount = qustionsObject.length;
            count = qustionsCount;
            // create Bullets
            createBullets(qustionsCount);

            addQuestionData(qustionsObject[currentIndex] , qustionsCount);

            countDown(15 , qustionsCount);

                submitButton.onclick = () =>{
                    if(mood == "next" ){
                        quizArea.innerHTML = "";
                        answers_area.innerHTML = "";
                        currentIndex++
                        console.log(currentIndex);
                        addQuestionData(qustionsObject[currentIndex] , qustionsCount);
                        countDown(15 , qustionsCount)
                        handleBullets();
                        if(currentIndex < qustionsCount){
                            let button = document.getElementById("submit-button").innerHTML = "Submit Answer";
                        }else{
                            showResult(qustionsCount);
                        }
                        mood = "submit";
                    }else{
                        let RightAnswer = qustionsObject[currentIndex].right_answer;
                        let Answer_number = qustionsObject[currentIndex].Answer_number;
                        checkAnswer(RightAnswer , qustionsCount ,Answer_number )
                        if(currentIndex == 9 && mood == "next"){
                            let button = document.getElementById("submit-button").innerHTML = "Show the Ruselt";
                            console.log("hi");
                        }
                    }

                }
            }
        }


    myRequest.open("GET",'http://127.0.0.1:8000/api/All')
    myRequest.send()
}


getQuestions();

function createBullets(num){

    countSpan.innerHTML = num;

    // create spans

    for (let i = 0; i < num; i++) {

        let Bullet = document.createElement('span');

        if(i == 0){
            Bullet.className = 'on';
        }

        // append

        bulletsSpanContainer.appendChild(Bullet);


    }

}

function addQuestionData(obj , count){


  if(currentIndex < count){
      // creat h2 qetion titel
      let questionTitel = document.createElement("h2");

      let questionText = document.createTextNode(obj.title);

      questionTitel.appendChild(questionText);

      quizArea.appendChild(questionTitel);

      // answers
      for (let i = 1; i <= 4; i++) {

          let mainDev = document.createElement("div");
          mainDev.className = "answer";
          mainDev.setAttribute("id" , `div_${i}`)
          let radioInput = document.createElement("input");
          // add type + name + id + Data
          radioInput.name = 'question';
          radioInput.type = "radio";
          radioInput.id = `answer_${i}`;
          radioInput.dataset.answer = obj[`answer_${i}`];


          if(i == 1){
              radioInput.checked = true;
          }

          // label

          let Label = document.createElement("label");

          Label.htmlFor = `answer_${i}`;
          Label.setAttribute("id" , `id_${i}`);
          // label text

          let LabelText = document.createTextNode(obj[`answer_${i}`]);

          Label.appendChild(LabelText);

          mainDev.appendChild(radioInput);

          mainDev.appendChild(Label);

          answers_area.appendChild(mainDev);

      }
  }




}

function checkAnswer(rightAnswer , count , Answer_number){
    let answers = document.getElementsByName("question");
    let ChoosenAnswer;

    for (let i = 0; i < answers.length ; i++) {
       if(answers[i].checked){
            z = answers[i].id;
            ChoosenAnswer = answers[i].dataset.answer;
       }
    }
    ahmed = z[7]

   if(mood == "submit"){
        if(ChoosenAnswer){
            let x =  document.getElementById(`div_${ahmed}`).style.backgroundColor = "orange";
            let b =  document.getElementById(`id_${ahmed}`).style.color = "#FFF";
            let button = document.getElementById("submit-button").innerHTML = "chek the right answer";
            if(ChoosenAnswer == rightAnswer){
                rAnswer++
            }
            clearInterval(CountDownIntervl);
            mood = "chek";
        }
   }else if(mood == "chek"){
    chek(rightAnswer , ChoosenAnswer , Answer_number);
    let button = document.getElementById("submit-button").innerHTML = "Next Question";
    mood = "next";
   }

}

function chek(rightAnswer , ChoosenAnswer , Answer_number){
    if(rightAnswer == ChoosenAnswer){
        let sucsses = document.getElementById(`div_${Answer_number}`).style.backgroundColor = "green";
        let b =  document.getElementById(`id_${Answer_number}`).style.color = "#FFF";
    }else{
        let bad_choise = document.getElementById(`div_${ahmed}`).style.backgroundColor = "red";
        let sucsses = document.getElementById(`div_${Answer_number}`).style.backgroundColor = "green";
        let RightChossenColor =  document.getElementById(`id_${Answer_number}`).style.color = "#FFF";
        let BadChossenColor =  document.getElementById(`id_${ahmed}`).style.color = "#FFF";
    }
}

function handleBullets(){
    let bulletSpans = document.querySelectorAll(".bullets .spans span");
    let arrayofSpans = Array.from(bulletSpans);
    arrayofSpans.forEach((span , index) => {
        if(currentIndex == index){
            span.className = "on";
        }
    })
}


function showResult(count){
    let Results;
    if(currentIndex == count){
        quizArea.remove();
        answers_area.remove();
        submitButton.remove();
        Bullets.remove();

        if(rAnswer > (count / 2) && rAnswer < count){
            Results = `<span class = "good"> Good  </span> you are answered ${rAnswer} from ${count} `;
        }
            else if(rAnswer == count){
                Results = `<span class = "perfect"> perfect </span> you are answered ${rAnswer} from ${count}`
            }
            else{
                Results = `<span class = "bad"> bad </span> you are answered ${rAnswer} from ${count}`
            }
    }
    ResultsContainer.style.textAlign = "center";
    ResultsContainer.style.padding = "9px 0 0";
    ResultsContainer.innerHTML = Results;

}


function countDown(duration , count){
    if(currentIndex < count){
        let minutes , seconds;
        CountDownIntervl = setInterval(function(){
            minutes = parseInt(duration/60);
            seconds = parseInt(duration%60);

            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;

            countdownElement.innerHTML = `${minutes}:${seconds}`
            if(--duration < 0 ){
                clearInterval(CountDownIntervl);
                mood = "chek";
                submitButton.click();
            }
        } , 1000)
    }
}

//////////////////////////////// The End /////////////////////////////


