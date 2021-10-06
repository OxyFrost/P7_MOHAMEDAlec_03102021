const {PrismaClient} = require('@prisma/client')
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient()



/* Création d'un comment */
exports.createComment = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    const createdComment = await prisma.comment.create({
        data:{
            message: req.body.message,
            authorId: Number(userId),
            PostId: Number(req.params.id),
        }
    }).then(() => res.status(201).json({message: 'Le Commentaire a bien été créée'}))
        .catch(error => res.status(400).json({message: error.message}));
}

//Update des informations d'un comment
exports.updateComment = async (req, res, next) => {
    const updatedComment = await prisma.comment.update({
        where:{
            id: Number(req.params.id),
        },
        data:{
            message: req.body.message,
        }
    }).then(() => res.status(201).json({message: 'Le Commentaire a bien été créée'}))
        .catch(error => res.status(400).json({message: error.message}));
}

//Suppression du comment d'un utilisateur
exports.deleteComment = async (req, res, next) => {
    const id = req.params.id;
    const deletedComment = await prisma.comment.delete({
        where: {
            id: Number(id)
        }
    }).then(() => res.status(200).json({message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({message: error.message}));
}
