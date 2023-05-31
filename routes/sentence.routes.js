const { Router } = require('express');
const Sentence = require('../models/Sentence');

const router = Router();


router.get('/', async (req, res) => {
    try {
        const find = await Sentence.find();
        return res.json(find);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Сұранысты орындау барысында қате болды.' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { correct, incorrect } = req.body;

        const item = new Sentence({
            correct,
            incorrect,
        });

        await item.save();

        return res.json({ success: true });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Сұранысты орындау барысында қате болды.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const find = await Sentence.findById(req.params.id);
        return res.json(find);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Сұранысты орындау барысында қате болды.' });
    }
});

router.post('/search', async (req, res) => {
    try {
        const regex = new RegExp(req.body.query, 'i');
        const find = await Sentence.find({ correct: regex, checked: true });
        return res.json(find);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Сұранысты орындау барысында қате болды.' });
    }
});

module.exports = router;
