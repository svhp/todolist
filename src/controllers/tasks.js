const task_test = require('../models/zadanie');
const users = require('../models/user');
const wrapper = require('../middleware/asyncwrapper');

const pokazZadania = async (req, res) => {    
    try {
        const userID = await users.findOne({
            where: {
                token: req.headers.authorization
        }})

        const tasks = await task_test.findAll({
            where: {
                userid: userID.dataValues.id
            }
        });

        res.status(200).json({ tasks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Blad - pokazZadania" });
        return;
    }
};

const utworzZadanie = wrapper(async (req, res, next) => {
    console.log("Create task:", req.body);
    const { username, content, date } = req.body;
    const userID = await users.findOne({
        where: {
            username: username
    }})
    await task_test.create({
        userid: userID.dataValues.id,
        content: content,
        deadline: date
    });
    res.status(200).json({ success: true, msg: "Utworzono nowe zadanie." });
});


const usunZadanie = wrapper(async (req, res, next) => {
    await task_test.destroy({
        where: {
            id: req.params.id
        }
    });
    res.status(200).send("Usunieto zadanie!"); 
});

const zaktualizujZadanie = wrapper(async (req, res, next) => {
    await task_test.update({
        content: req.body.content,
        completed: req.body.completed,
        deadline: req.body.deadline
    }, {
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({ success: true, message: "Zaaktualizowano zadanie.", data: req.body });
})


const getZadanie = async (req, res) => {
    const task = await task_test.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!task) {
        res.status(404).json({ success: false, msg: "Nie znaleziono zadania o podanym id." });
        return;
    }
    res.status(200).json({ success: true, data: task })
}

module.exports = {
    pokazZadania,
    utworzZadanie,
    usunZadanie,
    zaktualizujZadanie,
    getZadanie
}


