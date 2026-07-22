const testApi = async () => {
    try {
        const apiKey = "DUMMY_KEY_OR_YOUR_KEY";
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("AVAILABLE MODELS:", data.models.map(m => m.name));
    } catch(e) {
        console.error(e);
    }
}

testApi();
