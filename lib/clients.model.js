module.exports = (sequelize, Sequelize) => {
    const Clients = sequelize.define('client', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nom: {
            type: Sequelize.STRING
        },
        mail: {
            type: Sequelize.STRING
        },
        tel: {
            type: Sequelize.STRING
        },
        adr: {
            type: Sequelize.STRING
        },
        pass: {
            type: Sequelize.STRING
        },
        mailOtp: {
            type: Sequelize.STRING
        },
        phoneOtp: {
            type: Sequelize.STRING
        },
    });

    return Clients;
}