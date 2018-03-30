import { computed, observable } from "mobx"
import {Todo} from './Todo'
import { ApiCalls, Method } from '../service/ApiCalls'

export class TodoStore {
  todos: any = [];
  @observable filter : string= ""
  @computed get filteredTodos() {
    var matchesFilter = new RegExp(this.filter, "i")
    return this.todos.filter((todo: Todo) => !this.filter || matchesFilter.test(todo.value))
  }

  getAllToDosFromServer() : void{
    ApiCalls.call(Method.GET,
                  this.getAllToDosSuccessCall.bind(this));
  }

  getAllToDosSuccessCall(response: any) : void{
    this.todos = response.data.map((element: any) => new Todo(element.id, element.content)); 
  }
  
  createTodo(content: any) : void{
    const note = { content }
    ApiCalls.call(Method.POST,
                  this.createToDoSuccessCall.bind(this), 
                  undefined,
                  note);
  }

  createToDoSuccessCall(response: any) : void{
    const todo : Todo = new Todo(response.data.id, response.data.content);
    this.todos.push(todo);
  }
   
  editToDo(id: number, value: string) : void{
    const content = {    
      id: id,
      content: value     
    }

    ApiCalls.call(Method.PUT,
                  this.editToDoSuccessCall.bind(this), 
                  undefined,
                  content);
  }

  editToDoSuccessCall(response: any) : void{
    const toDoToEdit = this.todos.find((x: any) => x.id == response.data.id) as any
    console.log(response.data)
    toDoToEdit.value = response.data.content  
    toDoToEdit.editable = "hidden"
  }

  deleteToDo(todo: Todo)  : void{
    ApiCalls.call(Method.DELETE,
                 this.deleteToDoSuccessCall.bind(this), 
                 todo.id);
    this.todos.delete(todo)
  }

  deleteToDoSuccessCall(response: any) : void{
    console.log(response)
  }
  
  clearComplete = () => {
    const listToRemove = this.todos.filter((todo: any) => todo.complete).map((x: any) => x.id)
    const data = { Ids : listToRemove} 
    
    ApiCalls.call(Method.DELETE,
                  this.clearCompleteSuccesssCall.bind(this), 
                  undefined,
                  data);    
  }
  
  clearCompleteSuccesssCall() : void{
    let incompleteTodos = this.todos.filter((todo: any) => !todo.complete)
    this.todos.replace(incompleteTodos)
  }
}

export default new TodoStore()