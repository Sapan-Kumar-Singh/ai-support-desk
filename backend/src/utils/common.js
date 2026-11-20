export const sanitizeUser = (user) => {
    const userData = user.toJSON();

    delete userData.password;
    delete userData.refreshToken;

    return userData;
};