const express = require('express');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const ai = new GoogleGenAI({});

app.post('/webhook', async (req, res) => {
    const userMessage = req.body.text;
    
    if (!userMessage) {
        return res.json({ reply: "Hello! Welcome to our premium grooming assistant. How may we serve you today?" });
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: userMessage,
            config: {
                systemInstruction: "You are an elite, premium mobile barber booking assistant. Be extraordinarily polite, clear, and professional. Guide clients beautifully through your booking options, subscription details, and service lists."
            }
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error("Error connecting to Gemini:", error);
        res.json({ reply: "Thank you for reaching out! We are experiencing a high volume of requests. Please message back in a minute or call us directly." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Your WhatsApp engine is active on port ${PORT}`));
