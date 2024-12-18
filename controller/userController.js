const db = require("../db");

// get all the users

exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query(
      'Select id,name, email, age, department, role , image from users Where role = "User"'
    );
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// get single user
exports.getUser = async (req, res) => {
  console.log("inside get user rou");

  const { id } = req.params;

  try {
    const [user] = await db.query(
      "Select id,name, email, age, department, role , image from users where id = ?",
      [id]
    );
    res.status(200).send(user[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

//updating the user

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, age, department } = req.body;
  console.log(req.body);
    
if (req.file) {
  imageUrl = `/uploads/${req.file.filename}`;
}

  try {
    const [result] = await db.query(
      "UPDATE users SET email = ?, age = ?, department = ?, image = ?  WHERE id = ?",
      [email, age, department, imageUrl, id]
    );
    res.status(200).send({ message: "User updated successfully", result });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// deleting the user

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
    res.status(200).send({ message: "User deleted successfully", result });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

/* exports.searchUser = async (req, res) => {
    console.log("searching");
    
    const { name } = req.query;
  
    if (!name) {
      return res.status(400).json({ error: 'Name query parameter is required' });
    }
    try{
        const [users] = await db.query(
         `SELECT * FROM users WHERE LOWER(name) LIKE LOWER(CONCAT('%', ?, '%'))`,[name]);
         if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
          }
          res.status(200).send(users)
    }catch(err){
        res.status(500).json({ error: 'Failed to retrieve users from the database' });
    }
  };
   */

//  search with sort parameter inserted
exports.searchUser = async (req, res) => {
  console.log("searching");

  const { name, sort } = req.query;

  if (!name) {
    return res.status(400).json({ error: "Name query parameter is required" });
  }
  try {
    const [users] = await db.query(
      `SELECT * FROM users WHERE LOWER(name) LIKE LOWER(CONCAT('%', ?, '%')) ORDER BY name ${sort.toUpperCase()}`,
      [name]
    );
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).send(users);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to retrieve users from the database" });
  }
};
