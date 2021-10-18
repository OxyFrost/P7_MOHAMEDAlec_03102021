const {PrismaClient} = require('@prisma/client')
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient()


/* Création d'un post */
exports.createPost = async (req, res, next) => {
    var post = {
        title: req.body.title,
        authorId: Number(req.body.authorId),
    }

    if (req.body.message !== undefined && req.body.message !== "") {
        post = {
            ...post,
            message: req.body.message
        };
    }

    if (req.file) {
        post = {
            ...post,
            imgURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        };
    }

    console.log(post);
    const createdPost = await prisma.post.create({
        data: post,
    }).then(() => res.status(201).json({message: 'Le Post a bien été créée'}))
        .catch(error => res.status(400).json({message: error.message}));
}

//Update des informations d'un Post
exports.updatePost = async (req, res, next) => {
    const id = req.params.id;
    var post = {
        title: req.body.title,
    }

    if (req.body.message !== undefined && req.body.message !== "") {
        post = {
            ...post,
            message: req.body.message
        };
    }

    if (req.file) {
        post = {
            ...post,
            imgURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        };
    }

    const updatedPost = prisma.post.update({
        where: {
            id: Number(id)
        },
        data: post,
    }).then(() => res.status(200).json({message: 'Post modifié avec succès !'}))
        .catch(error => res.status(400).json({message: error.message}));
}

//Suppression du Post d'un utilisateur
exports.deletePost = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);

    const deletedComment = prisma.comment.deleteMany({
        where: {
            postId: Number(id)
        }
    })

    const deletedPost =  prisma.post.delete({
        where: {
            id: Number(id)
        }
    })

    const transaction = await prisma.$transaction([deletedComment, deletedPost])
        .then(() => res.status(200).json({message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({message: error.message}));
}

/* Obtention de tout les posts */
exports.getAllPosts = async (req, res, next) => {
    const posts = await prisma.post.findMany({
        include:{
            author:true,
            comments:true,
        },
        orderBy: [
            {
                createdAt: 'desc',
            },
        ],
    }).then(posts => res.status(200).json(posts))
        .catch(error => res.status(404).json({message: error.message}));
};

/* Obtention d'un Post */
exports.getOnePost = async (req, res, next) => {
    const post = await prisma.post.findUnique({
        where: {
            id: Number(req.params.id),
        },
        include: {
            author: true,
            comments: true,
        }
    }).then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({message: error.message}));
};

/**
 * Partie Commentaire
 */

/* Création d'un comment */
exports.createComment = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    console.log(req.body);
    console.log(req.params);
    const createdComment = await prisma.comment.create({
        data:{
            message: req.body.message,
            authorId: Number(userId),
            postId: Number(req.params.id),
        }
    }).then(() => res.status(201).json({message: 'Le Commentaire a bien été créée'}))
        .catch(error => res.status(400).json({message: error.message}));
}

exports.getComments = async (req, res, next) => {
    const comments = await prisma.comment.findMany({
        where: {
            postId: Number(req.params.id),
        },
        include: {
            author: true,
        },
        orderBy: [
            {
                createdAt: 'desc',
            },
        ],
    }).then(comments => res.status(200).json(comments))
        .catch(error => res.status(404).json({message: error.message}));
}

//Update des informations d'un comment
exports.updateComment = async (req, res, next) => {
    const updatedComment = await prisma.comment.update({
        where:{
            id: Number(req.params.idComment),
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