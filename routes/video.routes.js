const { Router } = require('express');
const Video = require('../models/Video');

const router = Router();


router.get('/', async (req, res) => {
    try {
        const find = await Video.find();
        return res.json(find);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Сұранысты орындау барысында қате болды.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const find = await Video.findById(req.params.id);

        if (find) {
            find.viewCount = Number(find.viewCount) + 1;
            await find.save();
            return res.json(find);
        }

        return res.status(404).json({ message: 'Видео табылмады' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Сұранысты орындау барысында қате болды.' });
    }
});

module.exports = router;
