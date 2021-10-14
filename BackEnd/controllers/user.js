const {PrismaClient} = require('@prisma/client')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient()

//Inscription d'un Users
exports.signup = async (req, res, next) => {
    console.log(req.body);
    const user = await prisma.user.create({
        data: {
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 8)
        },
    }).then(() => res.status(201).json({message: 'Utilisateur enregistré !'}))
      .catch(error => res.status(500).json({message: error.message}));

}

//Connexion d'un Users
exports.login = async (req, res, next) => {
    const loginUser = prisma.user.findUnique({
            where: {
                email : req.body.email
            }
        }
    ).then(loginUser => {
            if (!loginUser) {
                return res.status(401).json({error: 'Utilisateur non trouvé !'});
            }
            bcrypt.compare(req.body.password, loginUser.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error: 'Mot de passe incorrect !'});
                    }
                    res.status(200).json({
                        userId: loginUser.id,
                        role: loginUser.role,
                        token: jwt.sign(
                            {
                                userId: loginUser.id,
                                role: loginUser.role
                            },
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({message: error.message}));
        })
        .catch(error => res.status(500).json({message: error.message}));
};

//Update des informations d'un Users
exports.update = async (req, res, next) => {
    const id = req.params.id;
    if (req.file) {
        const updatedUser = prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                pseudo: req.body.pseudo,
                imgURL: `${req.protocol}://${req.get('host')}/images/profile/${req.file.filename}`
            }
        }).then(() => res.status(200).json({message: 'User modifié avec Avatar !'}))
            .catch(error => res.status(400).json({message: error.message}));
    }else{
        const updatedUser = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                pseudo: req.body.pseudo
            }
        }).then(() => res.status(200).json({message: 'User modifié !'}))
            .catch(error => res.status(400).json({message: error.message}));
    }
}

//Suppression du compte d'un utilisateur
exports.delete = async (req, res, next) => {
    const id = req.params.id;
    const deletedUser = await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: {
            deletedAt: new Date(Date.now()),
        }
    }).then(() => res.status(200).json({message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({message: error.message}));
}

/* Obtention d'une sauce */
exports.getOneUser = async (req, res, next) => {
    const user = await prisma.user.findUnique({
        where: {
            id: Number(req.params.id),
        },
    }).then(user => res.status(200).json(user))
      .catch(error => res.status(404).json({message: error.message}));
};