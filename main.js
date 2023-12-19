let questionsArea = document.querySelector(".questions");
let submitBtn = document.querySelector(".submit-btn");
let result = document.querySelector(".result span");
let resultBox = document.querySelector(".result");
let dataBox = document.querySelector(".data");
const redobtn = document.querySelector("#redo");
const overlay = document.querySelector(".overlay");
const passinput = document.querySelector("#pass");
const getBtn = document.querySelector(".get-in");
const password = 123456;
// const backBtn = document.querySelector("#back");
// cheking input
getBtn.onclick = () => {
  if (passinput.value == password) {
    overlay.style.display = "none";
  } else {
    passinput.value = "";
    document.querySelector(".error").style.display = "block";
  }
};
// End
let currentIndex = 0;

function getQuestions() {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questions = JSON.parse(this.responseText);
      let qcount = questions.length;
      createQ(questions, qcount);
      let inputs = document.querySelectorAll("input");
      submitBtn.onclick = function () {
        let truesArr = [];
        let falseArr = [];
        let allTrues = [];
        let trues = 0;
        inputs.forEach((ele) => {
          if (ele.value === ele.dataset.answer) {
            allTrues.push(ele);
          }
          if (ele.checked) {
            if (ele.value === ele.dataset.answer) {
              truesArr.push(ele);
              trues++;
            } else {
              falseArr.push(ele);
            }
          }
        });
        allTrues.forEach((el) => {
          el.parentElement.classList.add("right");
        });
        truesArr.forEach((el) => {
          el.parentElement.classList.remove("right");
          el.parentElement.classList.add("true");
        });
        falseArr.forEach((el) => {
          el.parentElement.classList.add("false");
        });
        dataBox.classList.add("active");
        questionsArea.classList.add("done");
        result.parentElement.classList.add("show");
        result.innerHTML = `100 / ${Math.floor((100 / qcount) * trues)} `;
        let theResult = Math.floor((100 / qcount) * trues);
        if (theResult >= 50 && theResult < 80) {
          resultBox.style.color = "lightgreen";
        } else if (theResult >= 80) {
          resultBox.style.color = "green";
        }
        submitBtn.style.display = "none";
        redobtn.classList.add("active");
        // backBtn.classList.add("active");
        window.scrollTo(0, 0);
      };
    }
  };
  request.open("GET", "./questions.json");
  request.send();
}
getQuestions();

function createQ(obj, count) {
  for (let i = 0; i < count; i++) {
    //main div
    let question = document.createElement("div");
    question.className = "question";
    questionsArea.appendChild(question);
    // q title
    let title = document.createElement("div");
    let titleT = document.createTextNode(obj[i].title);
    title.className = "title";
    title.appendChild(titleT);
    question.appendChild(title);
    // answers box
    let answersBox = document.createElement("div");
    answersBox.className = "answers";
    question.appendChild(answersBox);
    // input & label
    for (let j = 1; j < 6; j++) {
      let mainDiv = document.createElement("div");
      let input = document.createElement("input");
      input.type = "radio";
      input.dataset.answer = obj[i].ra;
      // NAME
      input.id = `${obj[i].id}a-${j}`;
      input.name = obj[i].name;
      input.value = j;
      let label = document.createElement("label");
      let labelT = document.createTextNode(obj[i][`a-${j}`]);
      label.appendChild(labelT);
      label.htmlFor = `${obj[i].id}a-${j}`;
      mainDiv.appendChild(label);
      mainDiv.appendChild(input);
      answersBox.appendChild(mainDiv);
    }
  }
}

redobtn.onclick = () => {
  redobtn.classList.remove("active");
  // backBtn.classList.remove("active");
  window.scrollTo(0, 0);
  setTimeout(() => {
    window.location.reload();
  }, 500);
};
