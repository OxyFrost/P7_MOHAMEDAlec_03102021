# Groupomania
Projet Groupomania pour OpenClassrooms

##Prérequis

Pour pouvoir lancer cette application, assurez vous d'avoir node et NPM d'installé.

## Backend

Veuillez vous assurer que PostgreSQL ou MySQL est installé et lancé. <br>
Créez une base de données et assurez vous d'avoir un fichier .env configuré comme le `.env.example`

Pour lancer le serveur, depuis la racine
```sh
cd BackEnd
npm i
npx prisma migrate dev --name init
npx prisma generate
nodemon server.js
```

Si vous avez des problèmes avec la base de données, la structure sous fichier .sql est fourni dans le dossier `Backend\Prisma`.

## FrontEnd

Pour lancer l'application, depuis la racine
```sh
cd FrontEnd
npm i
npm run serve
```


