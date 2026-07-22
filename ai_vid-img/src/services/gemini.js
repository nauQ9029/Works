/**
 * Analyzes an image or video using the Google Gemini API (REST fallback)
 * 
 * @param {File} file - The file to analyze
 * @param {string} apiKey - Gemini API Key provided by user
 * @returns {Promise<string>} - The markdown response from Gemini
 */
export const analyzeMedia = async (file, apiKey) => {
  if (!apiKey) {
    throw new Error('API Key is missing. Please add it in settings.');
  }

  // Convert File to Base64 String
  const base64Data = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // FileReader result looks like "data:image/jpeg;base64,...base64string..."
      const result = reader.result;
      const base64String = result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const prompt = `You are an expert appraiser and moving logistics coordinator. 
Examine the provided media carefully. 
Please provide your analysis strictly in the following JSON format without any markdown wrappers or codeblocks (just the raw JSON string):
{
  "items": [
    {
      "name": "String (Name of the discovered object)",
      "actualWeight": "Number (Estimated weight in kg)",
      "actualDimensions": {
        "length": "Number (in cm)",
        "width": "Number (in cm)",
        "height": "Number (in cm)"
      },
      "actualVolume": "Number (Estimated volume in cubic meters)",
      "condition": "String (Must be EXACTLY one of: 'GOOD', 'DAMAGED', 'FRAGILE')",
      "notes": "String (Any specific material or handling notes)"
    }
  ],
  "totalActualWeight": "Number (Total sum of weights)",
  "totalActualVolume": "Number (Total sum of volumes)",
  "totalActualItems": "Number (Total count of items)",
  "suggestedVehicle": "String (Must be EXACTLY one of: '500KG', '1TON', '1.5TON', '2TON')",
  "suggestedStaffCount": "Number (Minimum 1)",
  "notes": "String (General notes about the overall move or survey)"
}`;

  // We use the REST API to avoid any Browser/Node SDK mismatch issues entirely.
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        parts: [
          {
             inlineData: {
               mimeType: file.type,
               data: base64Data
             }
          },
          {
            text: prompt
          }
        ]
      }
    ]
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to analyze media');
    }

    // Extract the text content from the Gemini response structure
    if (data.candidates && data.candidates.length > 0) {
      const parts = data.candidates[0].content?.parts;
      if (parts && parts.length > 0) {
        return parts[0].text;
      }
    }

    throw new Error('Empty response from AI completely.');
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
