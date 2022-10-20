import axios from "axios";

const BOLLYWOODDLE_BASE_URL = "http://localhost:8080/api/v1/nextImage?resolution=12";

class HomePageService {
  constructor() {
  }

  getNextImage() {
    let imageBlob
      try {
        imageBlob = (axios.get(BOLLYWOODDLE_BASE_URL, { responseType: 'blob' })).data
      } catch (err) {
        return null
      }
    return URL.createObjectURL(new Blob([imageBlob]))
  }
}

export default new HomePageService();