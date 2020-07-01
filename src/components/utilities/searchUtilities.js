const findChosenElement = (id, array) => {
  if (array == null) { return null }
  for (let i = 0; i < array.length; i++) {
    if (id === array[i]._id) {
      return array[i]
    }
  }
}

export default findChosenElement