const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const userdb = JSON.parse(fs.readFileSync("../car-rental-app/db.json", "utf-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "72676376";

const expiresIn = "1h";

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function isLoginAuthenticated({ email, password }) {
  let user = JSON.parse(fs.readFileSync("../car-rental-app/db.json", "utf-8"));
  let data = user.users.findIndex(
    (user) =>
      user.profile.email === email && user.profile.password === password
  )
  console.log(data);
  return (
    data !== -1
  );
}

function findRole({ email }) {
  let userData = JSON.parse(fs.readFileSync("../car-rental-app/db.json", "utf-8"));
   let user =  userData.users.find((user) => user.profile.email === email);
   console.log(user)
   return user.profile.role
}

function isRegisterAuthenticated({ email }) {
  return userdb.users.findIndex((user) => user.profile.email === email) !== -1;
}

server.post("/api/auth/register", (req, res) => {
  const { email, password, aadharCardNo, contactNo, name } = req.body;
  if (isRegisterAuthenticated({ email })) {
    const status = 401;
    const message = "Email already exist";
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("../car-rental-app/db.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }
    data = JSON.parse(data.toString());

    let last_item_id = data.users[data.users.length - 1].profile.id;

    data.users.push({
      profile: {
        id: last_item_id + 1,
        name,
        contactNo,
        email,
        password,
        aadharCardNo,
        role: "customer",
      },
      cart: {},
      bookingStatus: null,
    });

    let writeData = fs.writeFile(
      "../car-rental-app/db.json",
      JSON.stringify(data),
      (err, result) => {
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });
  res.status(200).json({})
});

server.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!isLoginAuthenticated({ email, password })) {
    const status = 401;
    const message = "Incorrect Email or Password";
    res.status(status).json({ status, message });
    return;
  }
  const role = findRole({email})
  console.log(role)
  const access_token = createToken({ email, password });
  res.status(200).json({ access_token, role });
});

server.post("/api/auth/updateuser", (req, res) => {
  fs.readFile("../car-rental-app/db.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }
    data = JSON.parse(data.toString());


    var userDataIndex = data.users.findIndex(user => user.profile.name === req.body.profile.name);

    data.users[userDataIndex] = req.body

    let writeData = fs.writeFile(
      "../car-rental-app/db.json",
      JSON.stringify(data),
      (err, result) => {
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });
})


server.post("/api/auth/deletecartitem", (req, res) => {
  fs.readFile("../car-rental-app/db.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }
    data = JSON.parse(data.toString());

    console.log(req.body)
    var userDataIndex = data.users.findIndex(user => user.profile.email === req.body.user);


    data.users[userDataIndex].cart= {}


    let writeData = fs.writeFile(
      "../car-rental-app/db.json",
      JSON.stringify(data),
      (err, result) => {
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });
})





server.post("/api/auth/bookcar", (req, res) => {

  fs.readFile("../car-rental-app/db.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }
    data = JSON.parse(data.toString());


    var userDataIndex = data.users.findIndex(user => user.profile.email === req.body.email);

    data.users[userDataIndex].bookings.push({
      carsBooked : req.body.booking,
      bookingStatus: "pending"
    })

    let writeData = fs.writeFile(
      "../car-rental-app/db.json",
      JSON.stringify(data),
      (err, result) => {
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  
});
});

server.listen(5000, () => {
  console.log("Running fake api json server");
});


