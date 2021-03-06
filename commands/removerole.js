module.exports = {
	name: 'removerole',
    description: 'Removes a users role',
    aliases: ['takerole'],
	execute(Discord, client, pool, config, message, args, userInfo, func, shitself) {

        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.react('592017668777967616')
            return;
          }

          message.delete()
          const userMention = message.mentions.users.first();
          //mention
          if (userMention) {
            var member = message.guild.member(userMention);
            //id
          } else if (args[0]){
              var userCheck = args[0];
              var member = message.guild.member(userCheck)
              if(!member) {
                message.channel.send('Invalid user.')
                return;
              }
          } else {
              message.channel.send(':gear: Take a role from a user.\nUsage: `' + config.prefix + 'removerole {user} {Role Name}`\nAbusing this command in anyway will result in a punishment.')
              return;
          }

          var roleName = args.slice(1).join(' ');
          if(!roleName) {
              message.channel.send('You need to specify a role')
              return;
          }

            var roleN = roleName.toLowerCase()
            var roleN = roleName.toLowerCase()
            if(roleN == 'game support' || roleN == 'modding support' || roleN == 'bot boio' || roleN == 'supporter' || roleN == 'bots') {
              message.channel.send(`I'm not allowed to take this role.`);
              return;
            }
            var role = message.guild.roles.find(role => role.name.toLowerCase() === roleN);

            if(!role) {
                message.channel.send('Role by the name `' + roleName + '` could not be found.')
                return;
            }


            member.removeRole(role).catch(console.error);
            message.channel.send(member.user.tag + ' has lost the `' + role.name + '` Role')

            const logs = message.guild.channels.find(channel => channel.name === config.logChannel);

            const embed = new Discord.RichEmbed()
            embed.setTitle(`Role removed using removerole command `)
            embed.setColor(role.color)
            embed.setTimestamp()
            embed.setDescription(member.user.tag + ' has lost the <@&' + role.id + '> role')
            embed.addField('Moderator responsible', message.member.user.tag, false)
            logs.send({embed});
            
          
}}