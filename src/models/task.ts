import {Schema, Document, model} from 'mongoose';


export interface ITaskModel extends Document {
    createdAt: Date,
    updatedAt: Date,
    name: string,
    phrase: string,
    schedule: string,
    job: any
}

let TaskSchema: Schema = new Schema({
    createdAt: Date,
    updatedAt: Date,

    name: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    phrase: {
        type: String,
        default: '',
        required: true
    },
    schedule: {
        type: Schema.Types.Mixed,
        default: '',
        required: true
    }
});

export default model<ITaskModel>('Task', TaskSchema);