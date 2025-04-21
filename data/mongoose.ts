import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export const DBConnect = async () => {

    try {

        const url = process.env.MONGOOSE_URL//Pour recupérer notre varible MONGOOSE_URL qui contient la chaine de connection pour notre cluster, stocker dans le fichier .env

        //On definie les options de connexion au cluster mongoose

        //On se connecte à la base de données
        await mongoose.connect("mongodb://localhost:27017/", {
            dbName: "db_clinique"
        })
        console.log("Connexion réussi à la base de données")
        return "ok"

    } catch (error) {
        console.log(error)
    }


}