const {PrismaClient} = require('@prisma/client')

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
    const deletedPost = await prisma.post.delete({
        where: {
            id: Number(id)
        }
    }).then(() => res.status(200).json({message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({message: error.message}));
}

/* Obtention de tout les posts */
exports.getAllPosts = async (req, res, next) => {
    const posts = await prisma.post.findMany({
        where:{
            author:{
                deletedAt: false,
            }
        },
        include:{
          author:true,
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