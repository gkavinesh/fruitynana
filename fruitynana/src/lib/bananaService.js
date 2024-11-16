export const fetchGameData = async () => {
    try {
      const response = await fetch("https://marcconrad.com/uob/banana/api.php?out=json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch game data:", error);
      throw error;
    }
  };
  
  export const checkAnswer = async (word) => {
    try {
      const response = await fetch(`https://marcconrad.com/uob/banana/check.php?word=${word}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to check answer:", error);
      throw error;
    }
  };
  