const customerModel = require("../Models/customerModel")
const bcrypt = require("bcryptjs")

// Create Customer
const createCustomer = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body

        // check if email already exists
        const existEmail = await customerModel.findOne({ email })
        if (existEmail) {
            return res.status(400).json({ error: "the email already exists" })
        }

        // hash password
        const hashPassword = await bcrypt.hash(password, 10)

        const newData = new customerModel({
            name,
            phone,
            email,
            password: hashPassword,
            image: req.file ? req.file.filename : null
        })

        await newData.save()
        res.status(201).json(newData)

    } catch (error) {
        return res.status(500).json({ message: "server error", error: error.message })
    }
}

// Login Customer
const customerLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        // check email
        const existEmail = await customerModel.findOne({ email })
        if (!existEmail) {
            return res.status(400).json({ error: "invalid email" })
        }

        // check password
        const checkPassword = await bcrypt.compare(password, existEmail.password)
        if (!checkPassword) {
            return res.status(400).json({ error: "invalid password" })
        }

        res.status(200).json({
            message: "success login",
            customer: {
                _id: existEmail._id,
                name: existEmail.name,
                phone: existEmail.phone,
                email: existEmail.email,
                image: existEmail.image
            }
        })

    } catch (error) {
        res.status(500).json({ error: "server error", details: error.message })
    }
}

// Read All Customers
const readCustomer = async (req, res) => {
    try {
        const getCustomer = await customerModel.find()
        res.status(200).json(getCustomer)
    } catch (error) {
        res.status(500).json({ error: "server error", details: error.message })
    }
}

// Read Single Customer
const readSingleCustomer = async (req, res) => {
    try {
        const { id } = req.params
        const customer = await customerModel.findById(id)

        if (!customer) {
            return res.status(404).json({ error: "customer not found" })
        }

        res.status(200).json(customer)
    } catch (error) {
        res.status(500).json({ error: "server error", details: error.message })
    }
}

// Update Customer
const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params
        const { name, phone, email, password } = req.body

        let updateData = { name, phone, email }

        // haddii image cusub la upload gareeyo
        if (req.file) {
            updateData.image = req.file.filename
        }

        // haddii uu password jiro, waa la hash gareeyaa
        if (password) {
            const hashPassword = await bcrypt.hash(password, 10)
            updateData.password = hashPassword
        }

        const updatedCustomer = await customerModel.findByIdAndUpdate(id, updateData, { new: true })

        if (!updatedCustomer) {
            return res.status(404).json({ error: "customer not found" })
        }

        res.status(200).json(updatedCustomer)

    } catch (error) {
        res.status(500).json({ error: "server error", details: error.message })
    }
}
// Delete Customer
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params
        const deletedCustomer = await customerModel.findByIdAndDelete(id)

        if (!deletedCustomer) {
            return res.status(404).json({ error: "customer not found" })
        }

        res.status(200).json({ message: "customer deleted successfully" })

    } catch (error) {
        res.status(500).json({ error: "server error", details: error.message })
    }
}

module.exports = {
    createCustomer,
    customerLogin,
    readCustomer,
    readSingleCustomer,
    updateCustomer,
    deleteCustomer
}
