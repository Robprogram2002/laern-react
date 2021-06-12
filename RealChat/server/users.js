//Aqui definiremos funciones helpers para manejar el flujo de usuarios

const users = [];

const addUser = ({id, name, room}) => {
    //formateamos el nombre para un mejor control
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // esto significa que alguien esta inetentando acceder a la misma habitacion con el mismo nombre 
    const existUser = users.find((user) => user.room === room && user.name === name );

    if(existUser) {
        return ({error: 'username is taken, please choose other option'});
    }

    //creamos una instancia del nuevo usuario
    const user = {id, name, room};

    //añadimos el usuario a nuestra lista de usuarios
    users.push(user);

    //retornamos al usuario para saber que usuario a sido registrado (saber sus datos)
    return user;
}

const removeUser = (id) => {

    //encontrar a usuario con el id que se recibe de parametro 
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0];
    }

    //eliminamos al usuario y retornamos sus datos para estar enterados si el proceso se completo y contra quien se hizo
}

const getUser = (id) => {
   const user =  users.find((user) => user.id === id);
   return user;
}
const getUsersInRoom = (room) => {
    const usersInRoom = users.filter((user) => user.room === room);
    return usersInRoom;
} 

module.exports = {addUser, getUser, removeUser, getUsersInRoom};