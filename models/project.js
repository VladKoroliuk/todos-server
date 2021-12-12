import pkg from 'mongoose'
const { Schema, model } = pkg

const project = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    users: {
        type: Array,
        default: [],
        required: false
    },
    name: {
        type: String,
        default: "No name",
        required: true
    },
    type: {
        type: String,
        default: "LIST"
    },
    color: {
        type: String,
        default: '#919191'
    }
})

export default model('Project', project)