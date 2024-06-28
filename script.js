/*
author : Dawoud Tormos
To-Do Assignment 
*/


// Get the modal
var modal = document.getElementById("modal-addTask");

// Get the button that opens the modal
var btn = document.getElementById("Btn-addTask");

// Get the <span> element that closes the modal
var closeModalTask = document.getElementById("closeModalTask");

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeModalTask.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}








let currentDate = new Date();
console.log("Current Date and Time:", currentDate.toISOString());


//LocalStorage

if(localStorage.length == 0){

let users = [];
let jsonUsers = JSON.stringify(users);

let tasks = [];
let jsonTasks = JSON.stringify(tasks);


    localStorage.setItem("users" , jsonUsers);
    localStorage.setItem("tasks" , jsonTasks);
    localStorage.setItem("num" , 1);

}

    let getUsers = () =>{
        return JSON.parse(localStorage.getItem("users" ))
    }

    let getTasks = () =>{
        return JSON.parse(localStorage.getItem("tasks" ))
    }


    let addUser= (val)=>{

        let users = getUsers();
        users.push(val)
        localStorage.setItem("users" , JSON.stringify(users));

    }

    let addTask= (text , user ,  date, state)=>{
        let tasks = getTasks();
        tasks.push([text , user , date , state])
        localStorage.setItem("tasks" , JSON.stringify(tasks));

    }





    let updateUsers= ()=>{

        let users = getUsers();

        let usersList = document.getElementById("usersList");
        let UsersMenu = document.getElementById("usersMenu");

        let temp ="";//using a temp varaible for concatenation will be faster ( instead of directly usersList.innerHTML +=)

        users.forEach(
            (item, index)=>{
                temp +=`            <tr>
                <td class="td-flex">
                    <div>`+item+`</div>
                    <button class="button buttonRed" onclick="deletUser(`+index+`)">Delete</button>
                </td>            </tr>`
            }
        )


        usersList.innerHTML = temp;

        temp="";


        users.forEach(
            (item, index)=>{
                temp +=` <option value="`+item+`">`+item+`</option>`
            }
        )

        UsersMenu.innerHTML = temp;




    }

    let addUserForm = ()=>{

        let userInput = document.getElementById("userInput").value;
        if(userInput != ""){
                  addUser(userInput);
        updateUsers();
        document.getElementById("userInput").value = "";  
        }




    }

    let deletUser = (index)=>{

        let users = getUsers();
        let tasks = getTasks();

        for (let i = 0; i < tasks.length; ) {
            if(tasks[i][1] == users[index]){
                tasks.splice(i, 1);

            }else{
                i++;
            }
        }
        
        tasks.forEach((item , indexx)=>{
            
            console.log(indexx)

            while(item[1] == users[index]){
                tasks.splice(indexx, 1);

            }
        }

        )
        console.log()
        localStorage.setItem("tasks" , JSON.stringify(tasks));



        users.splice(index, 1);
        localStorage.setItem("users" , JSON.stringify(users));

        updateUsers();
        UpdateTasks();


    }



    let UpdateTasks = ()=>{
        let tasks = getTasks();

        let container2_inner = document.getElementById("container2-inner");
        let temp=""
        tasks.forEach(
            (item, index)=>{

                let d = new Date(item[2]);


                let status1 = "";
                let status2 = "";

                if(item[3] == 1){

                    status1 = `    <div class="card card-complete">`;
                    status2 = `           <div class="card-detail"><strong>Status:</strong> <span class="status complete">Complete</span></div>
            </div>
        </div>
    </div>`;

                }else{

                    if(d.getTime() > (new Date()).getTime() ){

                        status1 = `    <div class="card">`;

                        status2 = `           <div class="card-detail"><strong>Status:</strong> <span class="status pending">Pending</span></div>
                        </div>
                    </div>
                </div>`;

                    }else{

                        status1 = `    <div class="card card-pastDue">`;

                        status2 = `           <div class="card-detail"><strong>Status:</strong> <span class="status past-due">Past Due</span></div>
                        </div>
                    </div>
                </div>`;

                    }
                }








                temp += status1 +`<div class="card-content">
            <div class="header-flex-row"> 
                <div class="card-header taskContent">`+item[0]+`</div><Button class="header-child button buttonGrey" type="checkbox" onclick = "toggleTaskstatusForm(`+index+`)">Toggle</Button>
                </div>
    
    
    
            <div class="card-flex-row"> 
                <div class="card-detail"><strong>Assigned to:</strong> `+item[1]+`</div>
                <div class="card-detail"><strong>Due Date:</strong> `+d.toDateString()+", " + d.getHours()+`:`+d.getMinutes()+`</div>
     `+status2 ;
            }
        )



        container2_inner.innerHTML = temp;


    }


    let addTaskForm = ()=>{

        let text = document.getElementById("task").value;
        let user = document.getElementById("usersMenu").value;
        let date = document.getElementById("dueDate").value;

        if(text != ""  &&  user != ""   &&  date != ""){
        addTask(text, user , date,0);
        UpdateTasks();
        document.getElementById("task").value = "";  
        document.getElementById("usersMenu").value = "";  
        document.getElementById("dueDate").value = "";  
        }




    }


    let toggleTaskstatusForm = (index)=>{

        let tasks = getTasks();
        if(tasks[index][3]==0){
            tasks[index][3]=1
        }else{
            tasks[index][3]=0

        }
        localStorage.setItem("tasks" , JSON.stringify(tasks));

        console.log(tasks)
        UpdateTasks();



    }



    
    updateUsers();
    UpdateTasks();




    console.log(getUsers())


    console.log(getTasks())




