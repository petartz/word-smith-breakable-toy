import HomeFolder from "../../../models/HomeFolder.js"

class HomeFolderSeeder{
  static async seed(){
    const ObscureEmotionsFolder =
      {
        name: "Obscure Sorrows",
        description: "Obscure emotions you didn't know you experienced",
        image: "https://i.pinimg.com/originals/76/28/84/76288499bf02be1d8e1d3c09ef3e3648.jpg",
        userId: 1
      }

    await HomeFolder.query().insert(ObscureEmotionsFolder)
  }
}

export default HomeFolderSeeder
