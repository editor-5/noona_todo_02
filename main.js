//유저가 값을 입력한다
//+ 버튼을 클릭하면, 할일이 추가된다
// delete버튼을 누르면 할일이 삭제된다
//check버튼을 누르면 할일이 끝나면서 밑줄이 간다
//1. check 버튼을 클릭하는순간 true false
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난걸로 간주하고 그대로
//진행중 끝남 탭을 누르면, 언더바가 이동한다
//끝남탭은, 끝남 아이템만, 진행중탭은 진행중인 아이템맘
//전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let taskList =[]
let mode ='all'
let filterList = []
addButton.addEventListener("click",addTask)

for(let i=1;i<tabs.length;i++){
  tabs[i].addEventListener("click",function(event){
    filter(event);
  });
}
console.log(tabs)

// taskInput 요소에 keyup 이벤트 리스너 추가
taskInput.addEventListener('keyup', function(event) {
  // Enter 키의 keyCode는 13입니다.
  if (event.keyCode === 13) {
      addTask();
  }
});

function addTask(){
  let taskContent = taskInput.value.trim(); // 입력값 공백 제거
  if (taskContent === '') {
      alert('할 일을 입력해주세요!'); // 메시지 표시
      return; // 함수 종료
  }
    
    let task = {
      id:randomIDGenerate(), 
      taskContent: taskInput.value,
      isComplete:false
    }
    taskList.push(task);
    taskInput.value = ''; // 입력 창 비우기
    console.log(taskList);
    render()
}

function render(){
    // 1. 내가 선택한 탭에 따라서
    let list = []
    if(mode ==='all'){
      list = taskList;
    }else if(mode === 'ongoing' || mode === "done"){
      list = filterList
    }
    // 2. 리스트를 달리 보여준다
       
    let resultHTML = "";
    for(let i=0;i<list.length;i++){
      if(list[i].isComplete == true){
        resultHTML += `<div class="task">
          <div class="task-done">${list[i].taskContent}</div>
          <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button>
              <i class="fas fa-check-square"></i>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
              <i class="fas fa-trash"></i>
          </div>
        </div>`;
      }else{
        resultHTML += `<div class="task">
          <div>${list[i].taskContent}</div>
          <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button>
              <i class="far fa-square"></i>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
              <i class="fas fa-trash"></i>
          </div>
        </div>`;
      }
        
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
   for(let i=0;i<taskList.length;i++){
    if(taskList[i].id == id){
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
   }
   render();
   console.log(taskList);
}

function deleteTask(id){
  for(let i=0; i<taskList.length; i++) {
      if(taskList[i].id === id){
          taskList.splice(i, 1);
          break;
      }
  }
  // 삭제 후 바로 필터링 적용
  if(mode === 'ongoing' || mode === 'done') {
      filterList = taskList.filter(task => {
          if(mode === 'ongoing') {
              return !task.isComplete; // 진행중인 아이템만 필터링
          } else {
              return task.isComplete; // 끝난 아이템만 필터링
          }
      });
  }
  render();
}

function filter(event){
  mode = event.target.id;
  if(mode === 'ongoing' || mode === 'done') {
      filterList = taskList.filter(task => {
          if(mode === 'ongoing') {
              return !task.isComplete; // 진행중인 아이템만 필터링
          } else {
              return task.isComplete; // 끝난 아이템만 필터링
          }
      });
  }
  render();
}
function randomIDGenerate(){
  return Math.random().toString(36).substr(2, 16);
}
 