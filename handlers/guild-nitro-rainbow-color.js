const { bot, errorLog } = require('../app');
const config = require("../bot-settings.json");

//////////////////////////////////////////////////////////////////////////////////////////////
//                                    READY EVENT HANDLER                                   //
//////////////////////////////////////////////////////////////////////////////////////////////

bot.on('ready', () => {
    setInterval(changeRoleColor, 60000 * 3);
    //////////////////////////////////////////////////////////////////////////////////////////////

    function changeRoleColor() {

        // Array with the Colors
        let ColorsArray = [
            'FF00EC', '7D10CB', '00FF32', 'FEFFFF', 'A700C1',
            '36EA54', '2CE4A7', 'B2F15C', 'E8B046', '1CFBE0',
            '010101', 'E6B7F2', '34F08E', '68E3C4', '8682B6',
            'E5C7CE', '2DFAB4', '5639CC', '2C69E5', '54A1E9'];
        let randomColor = ColorsArray[Math.floor(Math.random() * ColorsArray.length)];

        let role = bot.guilds.cache.get(config.LaezariaServerID).roles.cache.get(config.NitroRoleID);
        if (!role) return errorLog(`guild-nitro-rainbow-color.js:1 changeRoleColor()\nrole is undefined.`, undefined);

        role.edit({ color: randomColor })
            // .then(updated => console.log(`Changed ${updated.name} role color to ${role.hexColor}`))
            .catch(error => errorLog(`guild-nitro-rainbow-color.js:1 changeRoleColor()\nError to change ${role.name} color.`, error));
    }
});