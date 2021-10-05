import { LightningElement,api} from 'lwc';

export default class ToDoItem extends LightningElement {
    @api toDoId;
    @api toDoName;
    @api done= false;


    get containerClass(){
        return this.done?"completed" : "upcoming";
    }
}