const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const { addUser, getUser, getUsersInRoom, removeUser } = require("./users");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  //cuando el cliente se conecta
  console.log("we have a new connection !!");

  //tomamos los datos del usuario que se acaba de conectar
  socket.on("join", ({ name, room }, callback) => {
    //nuestra funcion addUser puede retornar dos cosas, o retorna un error si ha ocurrido alguno, o retorna un nuevo usuario si nada ha salido mal

    //recuerda que cuando un usuario se conecta al servidor por medio de sockect.io, automaticamente este paquete le asigna un id unico a cada usuario conectado y este id el que usamos como identificador

    const user = addUser({ id: socket.id, name: name, room: room });
    console.log(`user-name: ${name}; room: ${room}`);

    //con este callback podemos enlazar una respuesta inmediatamente despues de que este socket event es emitido. Esto es util para hacer ERROR HANDLING
    const error = false;
    if (error) return callback({ error: error });

    //emitimos un evento para saludar al usuario cuando entra al room (del servidor para el usuario que se conecta)
    socket.emit("message", {
      user: "admin",
      text: `${user.name} welcome to the room ${user.room}`,
    });

    //con este nuevo metodo estamos enviando un mensaje a todos los demas usuarios conectados a esta misma room pero no al usuario con el que estamos trabajando (este evento es del servidor para los demas usuarios)
    socket.broadcast
      .to(user.room)
      .emit("message", {
        user: "admin",
        text: `${user.name} has joined to the room!`,
      });

    //aqui estamos sucribiendo a usuario en la room que el escogio
    socket.join(user.room);

  });

  //el servidor escucha un evento del cliente que contiene los datos de un nuevo mensaje
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    console.log(user)

    // enviamos desde el servidor un evento a todos los usuarios dentro del room especificado, este evento tiene como data el contenido del mensaje que hehmos recibido
    io.to(user.room).emit("message", { user: user.name, text: message });

    io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});

    //para hacer algo despues de que se ha recibido el evento en el fronted
    callback();
  });

  //cuando el cleinte se desconecta
  socket.on("discconect", () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left the room` });
      io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
    }
  });
});

app.use(router);

server.listen(PORT, () => {
  console.log("the server is running on port: ", PORT);
});
