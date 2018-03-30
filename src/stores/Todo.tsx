import { observable } from "mobx"

export class Todo {
    @observable value: string
    @observable id: number;
    @observable complete: boolean;
    @observable toBeDeleted: boolean = false;
    @observable editable: "hidden" | "text";
  
    constructor(id: number, value: string) {
      this.value = value;
      this.id = id;
      this.complete = false;
      this.editable = "hidden";
    }
}