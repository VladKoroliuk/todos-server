import ApiError from '../exeptions/api-error.js'
import taskService from '../services/task.js'

class Task {
    async create(req, res, next) {
        try {
            const { text, term, description, id, parentID, project, projectSection} = req.body

            if (!text || !term) {
                return next(ApiError.BadRequest('Ошибка при валидации'))
            }

            const task = await taskService.create({ text, term, user: req.user.id, description, id, parentID, project, projectSection })
            res.json(task)
        } catch (e) {
            next(e)
        }
    }
    async perform(req, res, next) {
        try {
            const { id } = req.body
            const task = await taskService.execute(id)

            res.json(task)
        } catch (e) {
            next(e)
        }
    }
    async get(req, res, next) {
        try{
            const tasks = await taskService.get(req.user)
            res.json(tasks)
        }catch(e){
            next(e)
        }
    }
    async setDescription(req, res, next){
        try{
            const task = await taskService.setDescription(req.body.id, req.body.description)
            res.json(task)
        }catch(e){
            next(e)
        }
    }
    async rename(req, res, next){
        try{
            const task = await taskService.rename(req.body.id, req.body.newName)
            res.json(task)
        }catch(e){
            next(e)
        }
    }
    async addLabel(req, res, next){
        try{
            const labelID = req.body.labelID
            const taskID = req.body.taskID

            const result = await taskService.addLabel(taskID, labelID)
            return res.json(result)
        }catch(e){
            next(e)
        }
    }
    async setLabels(req, res, next){
        try{
            const id = req.body.id
            const labels = req.body.labels
            console.log(labels)
            const result = await taskService.setLabels(id, labels)

            return res.status(200).json(result)
        }catch(e){
            next(e)
        }
    }
    async setPriority(req, res, next){
        try{
            const {taskID, priority} = req.body

            const result = await taskService.setPriority(taskID, req.user.id, priority)
            return res.status(200).json(result)
        }catch(e){
            next(e)
        }
    }
    async changeTerm(req, res, next){
        try{
            const {taskID, term} = req.body

            const result = await taskService.changeTerm(taskID, req.user.id, term)
            return res.status(200).json(result)
        }catch(e){
            next(e)
        }
    }
}

export default new Task()