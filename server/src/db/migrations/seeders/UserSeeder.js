import User from "../../../models/User.js"

class UserSeeder {
  static async seed(){
    const userZero = {
      email: "nana@gmail.com",
      cryptedPassword: "1234"
    }

    await User.query().insert(userZero)

  }
}

export default UserSeeder
