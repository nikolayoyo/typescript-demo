import { computed, observable } from "mobx"
import Todo from './Todo'
import { ApiCalls, Method } from '../service/ApiCalls'

export class TodoStore {
  @observable todos: any = []
  @observable filter = ""
  @computed get filteredTodos() {
    var matchesFilter = new RegExp(this.filter, "i")
    return this.todos.filter((todo: any) => !this.filter || matchesFilter.test(todo.value))
  }

  getAllToDosFromServer(){
    ApiCalls.call(Method.GET,
                  this.getAllToDosSuccessCall.bind(this));
  }

  getAllToDosSuccessCall(response: any) {
    this.todos = response.data.map((element: any) => new Todo(element.id, element.content)); 
  }
  
  createTodo(content: any) {
    const note = { content }
    ApiCalls.call(Method.POST,
                  this.createToDoSuccessCall.bind(this), 
                  undefined,
                  note);
  }

  createToDoSuccessCall(response: any){
    const todo = new Todo(response.data.id, response.data.content);
    this.todos.push(todo);
  }
   
  editToDo(id: any, value: any){
    const content = {    
      id: id,
      content: value     
    }

    ApiCalls.call(Method.PUT,
                  this.editToDoSuccessCall.bind(this), 
                  undefined,
                  content);
  }

  editToDoSuccessCall(response: any){
    const toDoToEdit = this.todos.find((x: any) => x.id == response.data.id) as any
    console.log(response.data)
    toDoToEdit.value = response.data.content  
    toDoToEdit.editable = "hidden"
  }

  deleteToDo(todo: any) {
    ApiCalls.call(Method.DELETE,
                 this.deleteToDoSuccessCall.bind(this), 
                 todo.id);
    this.todos.remove(todo)
  }

  deleteToDoSuccessCall(response: any){
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
  
  clearCompleteSuccesssCall(){
    let incompleteTodos = this.todos.filter((todo: any) => !todo.complete)
    this.todos.replace(incompleteTodos)
  }
}

export default new TodoStore()