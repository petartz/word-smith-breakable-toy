/* eslint-disable no-console */
import { connection } from "../boot.js"
import WordSeeder from "./migrations/seeders/WordSeeder.js"
import TagSeeder from "./migrations/seeders/TagSeeder.js"

class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("Seeding tags...")
    await TagSeeder.seed()

    console.log("Seeding words...")
    await WordSeeder.seed()


    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder