import { observable } from "mobx"

export default class Todo {
    @observable value: number
    @observable id: number;
    @observable complete: boolean;
    @observable toBeDeleted: boolean = false;
    @observable editable: "hidden" | "visible";
  
    constructor(id: number, value: number) {
      this.value = value;
      this.id = id;
      this.complete = false;
      this.editable = "hidden";
    }
}