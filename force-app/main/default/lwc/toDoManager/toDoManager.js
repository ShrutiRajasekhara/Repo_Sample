import { LightningElement, track } from 'lwc';

export default class ToDoManager extends LightningElement {

    @track time = "8:15 PM"; 
    greeting = "Good Evening";

    @track  toDos = [];

    //this method is called when ever component is initialized that means whenever it is refreshed
    connectedCallback(){
        this.getTime();

        setInterval(()=>{
            this.getTime();
            console.log("set Intreval Time");
        },1000*60)
    }
        getTime(){
                const date = new Date();
                const hours = date.getHours();
                const min   = date.getMinutes();

                this.time = `${this.getHour(hours)}:${this.getDoubleDigit(min)} ${this.getMidday(hours)}`;
                this.setGreeting(hours);

        }


        getHour(hours){
            return hours===0 ?12:hours>12?(hours-12):12;
        }

        getMidday(hours){
            return hours >=12 ?"PM":"AM"
        }

        getDoubleDigit(min){
            return min<10?'0'+min:min;
        }

    setGreeting(hours){
        if(hours < 12){
            this.greeting = "Good Morning";
        }

        else if(hours >= 12 && hours <17){
            this.greeting="Good AfterNoon";
        }
        else{
            this.greeting = "Good Night";
        }
    }

    addToDoHandle(){
        const inputBox = this.template.querySelector("lightning-input");
        console.log('Current value : '+inputBox.value);
      //  this.toDos.push(inputBox.value);//Way 1--here we are pushing value one by one
        const toDo ={
            toDoId : this.toDos.length,
            toDoName : inputBox.value,
            done :true,
            toDoDate:new Date()

        }
        this.toDos.push(toDo);
        
        inputBox.value ="";
    }

    get upComingTasks(){
        return this.toDos && this.toDos.length
        ?  this.toDos.filter(toDo=>!toDo.done)
        :[];
    }

    get completedTasks(){
        return this.toDos && this.toDos.length
        ? this.toDos.filter(toDo=>toDo.done)
        :[];
    }

}