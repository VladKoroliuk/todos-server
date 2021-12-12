import pkg from 'mongoose'
const { Schema, model } = pkg

const comment = new Schema({
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userName: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
})

export default model('Comment', comment)