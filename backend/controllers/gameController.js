// Generate random options including the solution
const generateOptions = (solution) => {
  const options = new Set([solution]); // Add the correct solution
  while (options.size < 4) {
    options.add(Math.floor(Math.random() * 10) + 1); // Generate random numbers between 1 and 10
  }
  return [...options].sort(() => Math.random() - 0.5); // Shuffle options
};

// Fetch game data and send to frontend
exports.getGameData = async (req, res) => {
  try {
    // API URL with parameters
    const apiUrl = "http://marcconrad.com/uob/banana/api.php?out=json&base64=no";

    // Fetch data from the Banana API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Generate options for the solution
    const options = generateOptions(data.solution);

    // Structure the response to send to the frontend
    res.status(200).json({
      question: data.question, // Image URL
      solution: data.solution, // Correct solution
      options, // Multiple-choice options
    });
  } catch (error) {
    console.error("Error fetching game data:", error);
    res.status(500).json({ message: "Error fetching game data" });
  }
};


