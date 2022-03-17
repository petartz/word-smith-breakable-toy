/* eslint-disable no-console */
import { connection } from "../boot.js"
import WordSeeder from "./migrations/seeders/WordSeeder.js"
import TagSeeder from "./migrations/seeders/TagSeeder.js"
import CategorizationSeeder from "./migrations/seeders/CategorizationSeeder.js"
import UserSeeder from "./migrations/seeders/UserSeeder.js"
import HomeFolderSeeder from "./migrations/seeders/HomeFolderSeeder.js"
import HomeDictionarySeeder from "./migrations/seeders/HomeDictionarySeeder.js"

class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("Seeding first user...")
    await UserSeeder.seed()

    console.log("Seeding tags...")
    await TagSeeder.seed()

    console.log("Seeding words...")
    await WordSeeder.seed()

    console.log("Seeding categorizations...")
    await CategorizationSeeder.seed()

    console.log("Seeding first Folder")
    await HomeFolderSeeder.seed()

    console.log("Seeding first Dictionary")
    await HomeDictionarySeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder