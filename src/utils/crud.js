import chalk from "chalk"

export const getOne = model => async (req, res) => {
    try {
        const doc = await model
            .findAll({
                where: { userId: req.user, id: req.params.id }
            })
        if (doc.length) {
            return res.status(200).json({ data: doc[0] })
        } else {
            return res.status(404).end()
        }
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

export const getMany = model => async (req, res) => {
    console.log(chalk.yellow(JSON.stringify(model)))
    try {
        const docs = await model.findAll({
            where: { userId: req.user }
        })
        res.status(200).json({ data: docs })
    } catch (e) {
        console.error(e)
        res.status(400).json({ error: e })
    }
}

export const createOne = model => async (req, res) => {
    let userId = req.user
    try {
        const doc = await model.create({ ...req.body, userId })
        res.status(201).json({ data: doc })
    } catch (e) {
        console.error(e)
        res.status(400).send({ error: e })
    }
}

export const updateOne = model => async (req, res) => {
    try {
        let updatedDoc = await model
            .findByPk(req.params.id)

        if (updatedDoc.userId === req.user) {
            updatedDoc.update({
                ...req.body
            })
            await updatedDoc.save()
        } else {
            return res.status(401).end()
        }

        if (!updatedDoc) {
            return res.status(404).end()
        }

        res.status(200).json({ data: updatedDoc })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

export const removeOne = model => async (req, res) => {
    try {
        const removed = await model.destroy({
            where: {
                userId: req.user,
                id: req.params.id
            }
        })

        if (!removed) {
            return res.status(401).end()
        }
        return res.status(200).json({ data: removed })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

export const crudControllers = model => ({
    removeOne: removeOne(model),
    updateOne: updateOne(model),
    getMany: getMany(model),
    getOne: getOne(model),
    createOne: createOne(model)
})
