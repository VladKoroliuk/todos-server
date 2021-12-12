import ApiError from '../exeptions/api-error.js'
import commentService from '../services/comment.js'

class Comment{
    async create(req, res, next){
        try{
            const { task, text, userName } = req.body
            const result = await commentService.create(task, text, req.user.id, userName)

            return res.json(result)
        }catch(e){
            next(e)
        }
    }
    async get(req, res, next){
        try{
            const result = await commentService.get(req.user.id)
            return res.json(result)
        }catch(e){
            next(e)
        }
    }
    async delete(req, res, next){
        try{
            const {commentID} = req.body
            const result = await commentService.delete(req.user.id, commentID)
            return res.json(result)
        }catch(e){
            next(e)
        }
    }
    async change(req, res, next){
        try{
            const {commentID, text} = req.body
            const result = await commentService.change(commentID, req.user.id, text)
            return res.json(result)
        }catch(e){
            next(e)
        }
    }
}


export default new Comment()