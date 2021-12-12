import pkg from 'mongoose'
const { Schema, model } = pkg

const projectSection = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    projectID: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    name: {
        type: String,
        default: "No name",
        required: true
    },
    subsequenceIndex: {
        type: Number,
        required: false
    }
})

export default model('projectSection', projectSection)