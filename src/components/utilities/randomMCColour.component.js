const getRandomColour = () => {
  const headerColours = ["#EF2A30", "#F47E2E", "#FFD71A", "#4BB250", "#1589C8", "#4C5962"]
  return headerColours[Math.floor(Math.random() * headerColours.length)];
}

export default getRandomColour