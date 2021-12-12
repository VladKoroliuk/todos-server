import projectService from '../services/project.js'
import userService from '../services/user.js'

class Project{
    async create(req, res, next){
        try {
            
            const { name, color, type } = req.body

            const creator = req.user.id

            const response = await projectService.create(creator, name, color, type)

            userService.addProject(creator, response._id)

            res.json(response)

        } catch (e) {
            next(e)
        }
    }
    async get(req, res, next){
        try {
            const response = await projectService.get(req.user.id)

            res.json(response)

        } catch (e) {
            next(e)
        }
    }
    async delete(req, res, next){
        try {
            
            const projectID = req.body.projectID

            const userID = req.user.userID

            const response = await projectService.delete(projectID, userID)

            res.json(response)

        } catch (e) {
            next(e)
        }
    }
    async change(req, res, next){
        try {
            
            const newData = req.body.data

            const userID = req.user.userID

            const response = await projectService.change(newData, userID) 

            res.json(response)

        } catch (e) {
            next(e)
        }
    }
    async createSection(req, res, next){
        try {

            const data = {...req.body, creator: req.user.id}

            const response = await projectService.createSection(data)

            res.json(response)

        } catch (e) {
            next(e)
        }
    }
    async getSections(req, res, next){
        try {

            const user = req.user.id

            const { projectID } = req.body

            const response = await projectService.getSections(projectID, user)

            res.json(response)

        } catch (e) {
            next(e)
        }
    }
    async setSubsequenceSections(req, res, next){
        try {

            const { subsequence } = req.body

            const response = await projectService.setSubsequenceSections(subsequence)

            res.json(response)

        } catch (e) {
            next(e)
        }
    }
    async deleteSection(req, res, next){
        try {

            const id = req.body.id

            const response = await projectService.deleteSection(id)

            res.json(response)

        } catch (e) {
            next(e)
        }
    }
    async renameSection(req, res, next){
        try {

            const data = req.body.data

            const response = await projectService.renameSection(data)

            res.json(response)

        } catch (e) {
            next(e)
        }
    }
}

export default new Project()