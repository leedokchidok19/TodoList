//Select the Elements
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

//Variables
//let LIST = []
//    , id = 0;
let LIST, id;

//get item from localstorage
let data = localStorage.getItem('todo');
console.log('dat', data);

//check if data is not empty
if(data){
    console.log('ture !');
    LIST = JSON.parse(data);
    id = LIST.length;//set the id to the last one in the list
    loadList(LIST);//load the list to the user interface
}else{//if data isn't empty
     console.log('false !');
    LIST = [];
    id = 0;
}
console.log('ss');
//load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear the local storage
clear.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
});

//Classes names
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';

//Show todays date
const options = {weekday : 'long', month : 'short', day : 'numeric'};
const today = new Date();

//dateElement.innerHTML = today.toLocaleDateString('en-US', options);

//add to do function

function addToDo(todo, id, done, trash){
    if(trash){return;}
    
    const DONE = done ? CHECK : 'fa-circle-thin';
    const LINE = done ? LINE_THROUGH : '';
    
    const item =`
                <li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${todo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>
                `;
    const position = 'beforeend';
    
    list.insertAdjacentHTML(position, item);
}//addToDo end

//add an item to the list user the enter key
document.addEventListener('keyup', function(even){

    if(event.keyCode==13){
        const todo = input.value;
        
        //if the input isn't empty
        if(todo){
            addToDo(todo, id, false, false);
            
            LIST.push({
                name : todo,
                id : id,
                done : false,
                trash : false
            });
            
            //add item to localstorage
            //(this code must be added where the LIST array is udated)
            localStorage.setItem('todo', JSON.stringify(LIST));

            id++;

        }//todo end
        input.value = '';

    }//event.keyCode end

});//addEventListener end

//Complete to do
function completeTodo(element){

    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;

}//completeTodo end

//Remove to do
function removeToDo(element){

    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;

}//removeToDo end

//Target the items created dynamically
list.addEventListener('click', function(event){

    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; //complete or delete

    if(elementJob == 'complete'){
        completeTodo(element);
    }else if(elementJob == 'delete'){
        removeToDo(element);
    }

    //add item to localstorage
    //(this code must be added where the LIST array is udated)
    localStorage.setItem('todo', JSON.stringify(LIST));

});
//addToDo('coffee', 1, true, false);

///////////////////알림
        //알림 허용 여부
        window.onload = function () {
            if (window.Notification) {
                Notification.requestPermission();
            }
        }

        function set_notify(event) {
            //var div = event.target;
            var input = prompt('예약 시간을 설정해 주세요.(단위 : 초)', '숫자만 입력해 주세요.');
            var text = event.target.textContent;
            text = text.substring(0, text.length-1);//'X' remove
            //console.dir(div);
            alert(text);
            setTimeout(function () {
                notify(text);
            }, Number(input)*1000);//5000 = 5초 = 5s
        }

        function notify(body_text) {
            if (Notification.permission !== 'granted') {
                alert('notification is disabled');
            }
            else {
                var notification = new Notification('Notification title', {
                    icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
                    body: body_text,
                });
 
                notification.onclick = function () {
                    window.open('http://google.com');
                };
            }
        }