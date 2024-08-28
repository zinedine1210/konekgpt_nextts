import { trainingTypeStatus } from "@@/src/constant/status";
import { TrainingType } from "./types";
export class TrainingDataModel {
    private code: string;
    private description: string;
    private id: string;
    private name: string;
    private org_id: string;
    private prompt: string;
    private status_training: number;
    private type_training: number;
    private user_id: string;
    private _files: string[];
    private type_training_name: string;


    constructor(props: TrainingType){
        this.code = props.code
        this.description = props.description
        this.id = props.id
        this.name = props.name
        this.org_id = props.org_id
        this.prompt = props.prompt
        this.status_training = props.status_training
        this.type_training = props.type_training
        this.user_id = props.user_id
        this._files = props._files
        this.type_training_name = trainingTypeStatus[this.type_training as unknown as keyof typeof trainingTypeStatus]
    }

    static toDatatableResponse = (array: TrainingType[]) => {
        return array.map((item: TrainingType) => {
            return new TrainingDataModel(item)
        })
    }
}