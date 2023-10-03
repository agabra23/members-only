// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const User = require("./models/User");
const Message = require("./models/Message");

const users = [];
const messages = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUsers();
  await createMessages();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.

async function userCreate(
  index,
  first_name,
  last_name,
  email,
  password,
  isMember
) {
  const userdetail = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
    isMember: isMember,
  };

  const user = new User(userdetail);

  await user.save();
  users[index] = user;
  console.log(`Added user: ${first_name} ${last_name}`);
}

async function messageCreate(index, timestamp, text, user) {
  const messagedetail = {
    timestamp: timestamp,
    text: text,
    user: user,
  };

  const message = new Message(messagedetail);
  await message.save();
  messages[index] = message;
  console.log(`Added message: ${text}`);
}

async function createUsers() {
  console.log("Adding users");
  await userCreate(
    0,
    "Andrew",
    "Gabra",
    "agabra23@gmail.com",
    "testPassword",
    false
  );
}

async function createMessages() {
  console.log("Adding Messages");
  await messageCreate(0, new Date(), "Test Message", users[0]);
}
