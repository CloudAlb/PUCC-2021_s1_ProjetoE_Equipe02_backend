import { Router } from 'express';

import { v4 } from 'uuid';

const usersRouter = Router();

interface User {
    // info
    id_user: string;
    name: string;
    username: string;
    email: string;
    password: string;

    // profile
    avatarImage: string | null;
    backgroundImage: string | null;
    bio: string | null;
    nivel: string;
    moedas: string;
    amigos: string;

    // bd
    created_at: string;
    updated_at: string;

    socials: {
        telegram?: string;
        facebook?: string;
        twitter?: string;
        twitch?: string;
    }
};

let users: User[] = [];

users.push({
    id_user: "1",
    name: "Rafael",
    username: "rafa2021",
    email: "rafa@gmail.com",
    password: "1234",

    avatarImage: null,
    backgroundImage: null,
    bio: "Gosto de peixe frito.",
    nivel: "1",
    moedas: "0",
    amigos: "0",

    created_at: "2021-03-28-15-29-00",
    updated_at: "2021-03-28-15-29-00",

    socials: {
        telegram: "bottled",
        facebook: "Matt",
        twitter: "cloudy",
        twitch: "weather"
    }
})

usersRouter.get('/', async (request, response) => {
    return response.json({ data: users })
});

usersRouter.get('/:id', async (request, response) => {
    let { id } = request.params;

    let findUser = users.find((user) => {
        return user.id_user == id;
    });

    if (!findUser) {
        return response.json({ message: "User not found" });
    }

    return response.json({ data: findUser })
});

usersRouter.post('/', async (request, response) => {
    const { name, username, email, password } = request.body;

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    const todayFormattedDate = dd + '/' + mm + '/' + yyyy;

    const user = { id_user: v4(), name, username, email, password, avatarImage: "", backgroundImage: "", bio: "", nivel: "1", moedas: "0", amigos: "0", created_at: todayFormattedDate, updated_at: todayFormattedDate, socials: {} };

    users.push(user);

    return response.json({ message: "User successfully created." })
});

usersRouter.patch('/edit/:id', async (request, response) => {
    const { id } = request.params;
    const { name, username, bio, email, password } = request.body;

    const findUserIndex = users.findIndex((user) => {
        if (user.id_user == id) return true;
    });

    if (findUserIndex == -1) {
        return response.json({ message: "User not found." });
    }

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const todayFormattedDate = dd + '/' + mm + '/' + yyyy;

    users[findUserIndex].name = name;
    users[findUserIndex].username = username;
    users[findUserIndex].bio = bio;
    users[findUserIndex].email = email;
    users[findUserIndex].password = password;
    users[findUserIndex].updated_at = todayFormattedDate;

    return response.json({ message: "User sucessfully updated." })
});

usersRouter.patch('/edit/socials/:id', async (request, response) => {
    const { id } = request.params;
    const { telegram, facebook, twitter, twitch } = request.body;

    const findUserIndex = users.findIndex((user) => {
        if (user.id_user == id) return true;
    });

    if (findUserIndex == -1) {
        return response.json({ message: "User not found." });
    };

    if (!!telegram) users[findUserIndex].socials.telegram = telegram;
    if (!!facebook) users[findUserIndex].socials.facebook = facebook;
    if (!!twitter) users[findUserIndex].socials.twitter = twitter;
    if (!!twitch) users[findUserIndex].socials.twitch = twitch;

    return response.json({ message: "Social data sucessfully updated." })
});

usersRouter.patch('/edit/password/:id', async (request, response) => {
    const { id } = request.params;
    const { password_old, password_new } = request.body;

    const findUserIndex = users.findIndex((user) => {
        if (user.id_user == id) return true;
    });

    if (findUserIndex == -1) {
        return response.json({ message: "User not found." });
    };

    if (users[findUserIndex].password != password_old) return response.json({ message: "Senha atual incorreta." })

    users[findUserIndex].password = password_new;

    return response.json({ message: "Password sucessfully updated." })

});

export default usersRouter;
