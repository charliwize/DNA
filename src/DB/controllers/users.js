const User = require('../models/users');

createUser = (req, res) => {
	const data = req.body;
  if (!data) {
    return res.status(400).json({
      success: false,
      error: 'Provide valid user details',
    })
  }

  const user = new User(data);
  if (!user) {
    return res.status(400).json({ success: false, error: err })
  }

  user
  .save()
  .then(() => {
    return res.status(201).json({
      success: true,
      id: user._id,
      message: "User added sucessfully!",
    })
  })
}

getUserById = async (req, res) => {
	await User.findOne(
		{ username: req.query.username }, (err, user) => {
			if (err) {
				return res.status(400).json({
					sucesss: false, error: err
				})
			}

			if(!user) {
				console.log("not user")
				return res
					.status(404)
					.json({ success: false, error: `User not found` })
			}

			return res.status(200).json({ sucess: true, data: user})
		})
		.catch(err => console.log(err))
}

module.exports = { createUser, getUserById }