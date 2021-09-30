const {PrismaClient} = require('@prisma/client')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient()

exports.signup = async (req, res, next) => {
    const user = await prisma.user.create({
        data: {
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: bcrypt.hash((req.body.password, 10)).catch(error => res.status(500).json({error})),
            imgURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        },
    }).catch(error => res.status(500).json({error}));

}

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                return res.status(401).json({error: 'Utilisateur non trouvé !'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error: 'Mot de passe incorrect !'});
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.update = async (req, res, next) => {
    const updatedUser = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            username:
        }
    })
}

exports.delete = async (req, res, next) => {
    const deletedUser = await prisma.user.delete({
        where: {
            id: req.params.id
        },
    }).then(() => res.status(200).json({message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({error}));
}