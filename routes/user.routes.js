const { Router } = require('express');
const User = require('../models/User');

const router = Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'E-mail немесе пароль енгізбедіңіз' });
        }

        const find = await User.findOne({ email, password });

        if (find) {
            return res.json(find);
        }

        return res.status(404).json({ message: 'E-mail немесе пароль дұрыс емес' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Сұранысты орындау барысында қате болды.' });
    }
});

router.post('/reg', async (req, res) => {
    try {
        const { email, password, fullname, bday, phone } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'E-mail немесе пароль енгізбедіңіз' });
        }

        const user = new User({
            email,
            password,
            fullname: fullname || '',
            phone: phone || '',
            bday: bday || '',
        });

        await user.save();

        return res.json(user);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Сұранысты орындау барысында қате болды.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const find = await User.findById(req.params.id);

        if (find) {
            return res.json(find);
        }

        return res.status(404).json({ message: 'Қолданушы табылмады' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Сұранысты орындау барысында қате болды.' });
    }
});

module.exports = router;
