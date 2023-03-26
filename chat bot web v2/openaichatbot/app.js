//creating some routes for the server
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

//creating a route to handle preflight requests
app.options('/chat', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, POST');
    res.sendStatus(200);
});

app.post('/chat', async (req, res) => {
    const messages = req.body.messages;
    const model = req.body.model;
    const temp = req.body.temp;

    //creating requests
    const completion = await openaiapi.createChatCompletion({
        model: model,
        messages: messages,
        temperature: temp,
    });
    res.header('Access-Control-Allow-Origin', '*');
    res.status(200).json({ result: completion.data.choices });
});

app.listen(port, () => {
    console.log(`Web chatbot app listening on port ${port}`);
});