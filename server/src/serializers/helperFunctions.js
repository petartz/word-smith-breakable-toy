class Helper{
  static firstIndexOf = (object, array) => {
    for (var i = 0; i < array.length; i++) {
        if (array[i].title == object.title) {
            return i;
        }
    }
    return -1;
  }
  static lastIndexOf = (object, array) => {
    for (var i = array.length-1; i >= 0; i--) {
        if (array[i].title == object.title) {
            return i;
        }
    }
    return -1;
  }

}

export default Helper