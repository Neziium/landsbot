const Discord = require ('discord.js')
const fs = require ('fs')
const low = require ("lowdb")
const FileSync = require ("lowdb/adapters/FileSync")
const client = new Discord.Client();
const cheerio = require('cheerio'),
    snekfetch = require('snekfetch'),
    querystring = require('querystring');


function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }



const adapter = new FileSync('database.json')
const db = low(adapter)

db.defaults({xp: [], lvl: []}).write()




let path_to_warns = './seewarn.json';
let avertissements = require(path_to_warns);

var bot = new Discord.Client();
var prefix = '/'


bot.on('ready', ()=>{
    bot.user.setGame('En dév ! [/help/hh]', 'http://twitch.tv/URL%22%22')
    console.log('BoT Ready');
})

bot.on('guildMemberAdd', member =>{
    let role = member.guild.roles.find("name", "『 Membres 』");
    member.guild.channels.find('name', 'commandes').send(` :large_orange_diamond: Bienvenue ${member} sur **Bot'sLand**, n'hésite pas à consulter le #information !`)
    member.addRole(role)
})












bot.on('message', message =>{

    var args = message.content.substring(prefix.length).split(" ");


        const swearWords = ["connard", "fdp", "enculé", "batard"];
        if( swearWords.some(word => message.content.includes(word)) ) {
            message.delete();
        message.reply("Ton language !");
        // Or just do message.delete();
        }


     


            // First, this must be at the top level of your code, **NOT** in any event!
        const talkedRecently = new Set();
            // Inside your message event, this code will stop any command during cooldown.
        // Should be placed after your code that checks for bots & prefix, for best performance

        if (talkedRecently.has(message.author.id))
        return;

        // Adds the user to the set so that they can't talk for 2.5 seconds
        talkedRecently.add(message.author.id);
        setTimeout(() => {
        // Removes the user from the set after 2.5 seconds
         talkedRecently.delete(message.author.id);
        }, 2500);


        //let points = require("./points.json")

       

        //if (message.author.bot) return;
      
        //if (!points[message.author.id]) points[message.author.id] = {
          //points: 0,
         ///level: 0
       // };
        //let userData = points[message.author.id];
        //userData.points++;
      
        ////let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
       // if (curLevel > userData.level) {
          // Level up!
        //  userData.level = curLevel;
        //  message.reply(`Tu es passé level **${curLevel}**! Bien joué !`);
      //   }
     //
      //  if (message.content.startsWith(prefix + "level")) {
      //    message.reply(`Tu es niveau ${userData.level}, avec ${userData.points} xp.`);
      //  }
      //  fs.writeFile("./points.json", JSON.stringify(points), (err) => {
      //    if (err) console.error(err)
      //  });
      



         const clean = text => {
         if (typeof(text) === "string")
             return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
         else
              return text;
        }
      
        if (message.content.startsWith(prefix + "eval")) {
          if(message.author.id !== "278597710012219394") return message.reply("Tu n'est pas mon fondateur !");
          try {
            const code = args.join(" ");
            let evaled = eval(code);
      
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);
      
            message.channel.send(clean(evaled), {code:"xl"});
          } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
          }
        }

    var msgauthor = message.author.id;
    var msguser = message.author.username;

    if(message.author.bot)return;

    if(!db.get("xp").find({user: msgauthor, msguser}).value()){
        db.get("xp").push({user: msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user: msgauthor}).find("xp").value();
        console.log(userxpdb);
        var userxp = Object.values(userxpdb)
        console.log(userxp);
        console.log(`Nombre d'xp : ${userxp[1]}`)

        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();
    }

    



    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(prefix)) return;

    

    var guild = message.guild;

    var member = message.member;

    var user = message.mentions.users.first();

    var guild = message.guild;

    var args2 = message.content.split(" ").slice(1);

    if (message.content.startsWith(prefix + "logout")) {

        if(message.author.id == "278597710012219394"){
   
         message.channel.sendMessage("Arrêt en cours");
   
           console.log('/ Je suis désormais offline / ');
   
           bot.destroy();
   
           process.exit()
   
       } else {
   
         message.channel.send("**Erreur** ! Tu n'es pas l'owner")
   
       }
    }

    if (message.content === prefix + "xpstats"){
        var xp = db.get("xp").filter({user: msgauthor}).find("xp").value()
        var xpfinal = Object.values(xp);
        var xpembed = new Discord.RichEmbed()
            .setTitle(`XP de ${message.author.username}`)
            .setDescription("Voici votre xp")
            .addField("Xp :", `${xpfinal[1]} xp`)
        message.channel.send({embed : xpembed});
    }

    

        
    




    

    switch (args[0].toLowerCase()){


        


        case "roleadd":
        let rolename = args.slice(1).join(' ');
        let roleadd = member.guild.roles.find("name", rolename);
        if (!rolename) return message.reply ("Tu dois chosir un role ! :warning: ")
        if (!roleadd) return message.reply("Cette couleur n'existe pas ! Fais /couleurlist pour voir les couleurs disponibles.")
        member.addRole(roleadd)
        message.reply("Tu as maintenant le role :"+ rolename + "!")





        break;

        case "google":
            async function googleCommand(msg, args) {

            // These are our two variables. One of them creates a message while we preform a search,
            // the other generates a URL for our crawler.
            let searchMessage = await Message.reply('Searching... Sec.');
            let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(msg.content)}`;
         
            // We will now use snekfetch to crawl Google.com. Snekfetch uses promises so we will
            // utilize that for our try/catch block.
            return snekfetch.get(searchUrl).then((result) => {
         
               // Cheerio lets us parse the HTML on our google result to grab the URL.
               let $ = cheerio.load(result.text);
         
               // This is allowing us to grab the URL from within the instance of the page (HTML)
               let googleData = $('.r').first().find('a').first().attr('href');
         
               // Now that we have our data from Google, we can send it to the channel.
               googleData = querystring.parse(googleData.replace('/url?', ''));
               searchMessage.edit(`Result found!\n${googleData.q}`);
         
           // If no results are found, we catch it and return 'No results are found!'
           }).catch((err) => {
              searchMessage.edit('No results found!');
           });
         }
        break;

        case "roleremove":
        let rolename2 = args.slice(1).join(' ');
        let roleadd2 = member.guild.roles.find("name", rolename2);
        if (!rolename2) return message.reply ("Tu dois chosir un role ! :warning: ")
        member.removeRole(roleadd2)
        message.reply("Tu n'as plus le role : "+ rolename2 + "!")





        break;

        case "couleurlist":
        var couleurembed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setFooter("Land'sBot©    By They")
            .setTimestamp()
            .setColor('#FFFF00')
            .addField("Les couleurs disponibles :", "Vert, Violet, Or!, Turquoise, Rose, Orange, Rouge, Bleu, Jaune (Faîtes /roleadd [couleur] pour les utilisées !)")
            message.channel.sendEmbed(couleurembed)





        break;

        //case "roledelete":
       // let rolename2 = args.slice(1).join(' ');
        //let roleadd2 = member.guild.roles.find("name", rolename2);
       // if (!rolename2) return message.reply ("Tu dois chosir un role ! :warning: ")
        //member.role.delete(roleadd2)
       // message.reply("Tu as maintenant le role :"+ rolename2 + "!")
        //break;

        case "everyone":
        message.delete()
        message.channel.sendMessage("<@everyone>")


        break;

        case "0.0.1":
        var betaembed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('<@everyone> **Mise à jour !**')
        .addBlankField()
        .addField("Version du Bot : 0.0.1 Béta", "Ajout de la commande /kick !\nAjout de la commande /ban !\nAjout de la commande /purge !\nAjout de la commande /mute !\nAjout de la commande /unmute !\nAjout de la commande /help !\nAjout de la  commande /membres !\nAjout de la commande /ping !")
        .addBlankField()
        .addField("__**A finir !**__", "La commande /info")
        .addBlankField()
        .addField("__**A venir**__", "Systeme de warn\nPile Ou Face\n et bien plus !")
        .setColor('#FFFF00')
        .setTimestamp()
        .setFooter("Land'sBot©    By They")
        message.delete()
        message.channel.sendEmbed(betaembed)

       break;

       case "video":
       var videoembed = new Discord.RichEmbed()
       .setAuthor(message.author.username, message.author.avatarURL)
       .setFooter("Land'sBot©    By They")
       .setTimestamp()
       .setColor('#FFFF00')
       .addField("**Mon créateur vient de sortir une nouvelle vidéo ! aller la voir ! ;)**", "Title : [TUTO] Comment coder un bot Discord ? Part 4 - 'En Streaming' ! ")
       .addField("__**La Vidéo !**__ ", "https://youtu.be/xEDR84GttTs")
       message.delete();
       message.channel.sendEmbed(videoembed)


       break;
         
        case "kick":
            let reasonkick = args.slice(2).join(' ');
            let userkick = message.mentions.users.first();
            if (message.mentions.users.size < 1) return message.reply("Tu dois mentionner quelqu'un ! :warning: ")
            if (reasonkick.length < 1) return message.reply("Tu dois préciser la raison ! :warning: ")

            if (!message.guild.member(userkick).kickable) return message.reply("Vous ne pouvez pas kick cette personne ! :warning:");
            message.guild.member(userkick).kick().then((userkick) => {
            message.channel.send(`${member} a été kick ! `);
            }).catch(() => {
                message.channel.sendMessage("Kick Refusé ! :warning:")
            })
            
            



            var embedkick = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setFooter("Land'sBot©    By They")
            .setTimestamp()
            .setColor('#FFFF00')
            .addField('Action :', 'Kick')
            .addField('Utilisateur :', `${userkick.username}#${userkick.discriminator}`)
            .addField("Staff :", `${message.author.username}#${message.author.discriminator}`)
            .addField("Raison", reasonkick)
            return bot.channels.get(logkick.id).sendEmbed(embedkick)


        
        break;

        case "warn":
            let user = message.mentions.users.first();
            let logwarn = bot.channels.find('name', 'log-landsbot');
            let reason = args.slice(2).join(' ');
            if (!message.channel.permissionsFor(message.member).hasPermission("KICK_MEMBERS")){
                message.reply("Tu n'as pas les droits de warn ! :warning: ")}
            if (!logwarn) return message.reply("Je n'ai pas trouvé le channel des logs ! :warning: ");
            if (message.mentions.users.size < 1) return message.reply("Tu dois mentionner quelqu'un ! :warning: ");
            if (reason.length < 1) return message.reply("Tu dois préciser la raison ! :warning: ");

            var embedwarn = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setFooter("Land'sBot©    By They")
            .setTimestamp()
            .setColor('#FFFF00')
            .addField('Action :', 'Warn')
            .addField('Utilisateur :', `${user.username}#${user.discriminator}`)
            .addField("Staff :", `${message.author.username}#${message.author.discriminator}`)
            .addField("Raison", reason)
            message.guild.channels.find("name", "sanction").send(embedwarn);
            return bot.channels.get(logwarn.id).sendEmbed(embedwarn);













        break;

        case "kooko":
        message.delete()
        message.channel.sendMessage('`Kooko est pas cool, je le boude aussi.`')



        break;

        case "say":
        let say = args.slice(1).join(' ');
        let logsay = bot.channels.find('name', 'log-landsbot');
        if (!message.channel.permissionsFor(message.member).hasPermission("KICK_MEMBERS")){
            return message.reply("Tu n'as pas les droits d'utiliser cette commande ! :warning: ")}
        if (!logsay) return message.reply("Je n'ai pas trouvé le channel des logs ! :warning: ");
        if (!say) return message.reply("Tu as oublier le message !")
        var embedsay = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setFooter("Land'sBot©    By They")
            .setTimestamp()
            .setColor('#00FEDC')
            .addField(`__${message.author.username}__ a dit`, '**'+say+'**') 
            message.delete();     
            message.channel.sendEmbed(embedsay)


        break;


        
        case "ban":

        if (!message.channel.permissionsFor(message.member).hasPermission("BAN_MEMBERS")){
            message.reply("Tu n'as pas les droits de ban ! :warning: ")
        }else{
            var memberban = message.mentions.users.first();
            if(!memberban){
                message.reply("Cette personne n'existe pas ! :warning: ");
            }else{
                if(!message.guild.member(memberban).bannable){
                    message.reply("Personne impossible à ban ! :warning: ");
                }else{
                    message.guild.member(memberban).ban().then((member) => {
                    message.channel.send(`${member} a été ban ! `);
                }).catch(() => {
                    message.channel.send("Ban Refusé ! :warning: ")
                })
            }
        }
        }


        case "mute":
        let roleMute = member.guild.roles.find("name", "Muted");
        let log = member.guild.channels.find("name", "log-landsbot");
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Tu n'as pas la permission d'excéuter la commande. :x:");
        if(!log) return message.reply("Je ne trouve pas de channel log.");  
        var member = message.mentions.members.first();
        if (message.mentions.users.size < 1) return message.reply("À qui je dois mettre la sanction: MUTE")
        message.channel.sendMessage(member.toString() + " a bien été mute. ✅")
        member.addRole(roleMute)
        
        var embed = new Discord.RichEmbed()
       .addField("Action :", "Mute")
        .addField("Utilisateur :", member.toString())
        .addField("Staff :", message.author.toString())
        .setColor("#FFFF00")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTimestamp()
        member.guild.channels.find("name", "log-landsbot").sendEmbed(embed);
        break;

        case "unmute":
        let roleunMute = member.guild.roles.find("name", "Mute");
        let logunmute = member.guild.channels.find("name", "log-landsbot");
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Tu ne peux exécuter cette commande.");
        if(!logunmute) return message.reply("Je ne trouve pas de channel log.");
        var member = message.mentions.members.first();
        if (message.mentions.users.size < 1) return message.reply("À qui je retire la sanction: MUTE ?")
        member.removeRole(roleunMute)
        message.channel.sendMessage(user.toString() + " a bien été unmute ✅")
        
        var embed = new Discord.RichEmbed()
        .addField("Commande :", "UNMUTE")
        .addField("Utilisateur :", user.toString())
        .addField("Staff :", message.author.username)
        .addField("Heure:", message.channel.createdAt)
        .setColor("#FFFF00")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTimestamp()
        member.guild.channels.find("name", "log-landsbot").sendEmbed(embed);
        break;


        


        

        case "help":
            var embedhelp = new Discord.RichEmbed()
                .setColor("#FFFF00")
                .setFooter("Idée de commande ? Proposez en MP!")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Voici les commandes du Land'sBot !")
                .setTimestamp()
                .addField("`Moderation 🔗 : `", "`/ban : Cette commande permet de bannir un utilisateur ! Pour l'utiliser, faites /ban @(utilisateur) (raison)`\n\n`/kick : Cette commande permet de kick un utilisateur ! Pour l'utiliser, faites /kick @(utilisateur) (raison)`\n\n`/purge : Cette commande permet de supprimé des messages beaucoup plus rapidement ! Pour l'utiliser, faites /purge (nombre de messages)`\n\n`/mute : Cette commande permet de muté un utilisateur pendant un certain temps. Pour l'utiliser, faites /mute @(utilisateur) (raison)`\n\n`/unmute : Cette commande permet d'unmute un utilisateur. Pour l'utiliser, faites /unmute @(utilisateur)`\n\n`/warn : Cette commande permet de warn un utilisateur ! Pour l'utiliser, faites /warn @(utilisateur) (raison)`")
                .addField("`Utilitaire 📌 : `", "`/say : Cette commande permet de dire un message dans un embed grâce au bot ! Pour l'utiliser, faites /say (votre message)`\n\n`/ping : Grâce à cette commande, tu pourras savoir le ping du bot !`\n\n`/membres : Grâce à cette commande, tu pourras savoir combien de membres a ce discord !`\n\n`/roleadd : Grâce à cette commande, tu pourras t'attribruer une couleur disponibles sur le serveur ! /couleurlist pour voir les couleurs disponibles !`\n\n`/couleurlist : Grâce à cette commande, tu pourras savoir toutes les couleurs disponibles sur le serveur !`")
                .addField("`Fun 🔥 : `", "`En Dev`")
            message.channel.send(embedhelp)
        break;

        case "hh":
            var embedhh = new Discord.RichEmbed()
                .setColor("#FFFF00")
                .setFooter("Idée de commande ? Proposez en MP!")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Voici les commandes du Land'sBot !")
                .setTimestamp()
                .addField("`Moderation 🔗 : `", "`/ban : Cette commande permet de bannir un utilisateur ! Pour l'utiliser, faites /ban @(utilisateur) (raison)`\n\n`/kick : Cette commande permet de kick un utilisateur ! Pour l'utiliser, faites /kick @(utilisateur) (raison)`\n\n`/purge : Cette commande permet de supprimé des messages beaucoup plus rapidement ! Pour l'utiliser, faites /purge (nombre de messages)`\n\n`/mute : Cette commande permet de muté un utilisateur pendant un certain temps. Pour l'utiliser, faites /mute @(utilisateur) (raison)`\n\n`/unmute : Cette commande permet d'unmute un utilisateur. Pour l'utiliser, faites /unmute @(utilisateur)`\n\n`/warn : Cette commande permet de warn un utilisateur ! Pour l'utiliser, faites /warn @(utilisateur) (raison)`")
                .addField("`Utilitaire 📌 : `", "`/say : Cette commande permet de dire un message dans un embed grâce au bot ! Pour l'utiliser, faites /say (votre message)`\n\n`/ping : Grâce à cette commande, tu pourras savoir le ping du bot !`\n\n`/membres : Grâce à cette commande, tu pourras savoir combien de membres a ce discord !`\n\n`/roleadd : Grâce à cette commande, tu pourras t'attribruer une couleur disponibles sur le serveur ! /couleurlist pour voir les couleurs disponibles !`\n\n`/couleurlist : Grâce à cette commande, tu pourras savoir toutes les couleurs disponibles sur le serveur !`")
                .addField("`Fun 🔥 : `", "`En Dev`")
            message.author.send(embedhh)
            message.reply("Help envoyé en message privé !");
        break;
          


        break;

        case "idée":
            var ideehelp = new Discord.RichEmbed()
            .setColor("#FFFF00")
            .setFooter("Idée de commande ? Proposer en MP!")
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp()
            .addField("Propose tes idées ici !", "Ou en MP à @They Graphics.#7631 ! ")
            message.delete();
            message.channel.sendEmbed(ideehelp)




        break;

        

        case "purge":
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Tu ne peux exécuter cette commande.");
            var messagecount = parseInt(args2.join(" "));
            message.channel.fetchMessages({
                limit: messagecount
            }).then(messages => message.channel.bulkDelete(messagecount));
                        message.delete()
            var embedpurge = new Discord.RichEmbed()
            .addField("Commande :", "PURGE")
            .addField("Staff :", message.author.username)
            .addField("Message supprimé", messagecount)
            .addField("Heure:", message.channel.createdAt)
            .setColor("#FFFF00")
            .setFooter("Ouf ! ça a fait un bon ménage dans le channel ! ^^")
            member.guild.channels.find("name", "log-landsbot").sendEmbed(embedpurge);
            break;;

            case "membres":
            message.reply("Nous sommes " + bot.users.size + " membres sur le discord !");
        break;

        
        
        case "info":
        var infoembed = new Discord.RichEmbed()
        .addField("Nom d'utilisateur", message.author.username)
        .addField("ID", message.author.id)
        .setThumbnail(message.author.avatarURL)
        .addField("Discriminateur", message.author.discriminator)
        
        .setColor('#FFFF00')
        message.channel.send(infoembed)
        break;

        case "ping":
        message.channel.sendMessage("Pong! J'ai actuellement `" + bot.ping + " ms !` :D");
        break;
        
        
        let msg = message.content.toUpperCase();
        let sender = message.author;
        let cmd = args.shift().toLowerCase();


        
        //case "serverinfo":

        //var embedserver = new Discord.RichEmbed()
        //.setColor("#FFFF00")
        //.setFooter("Idée de commande ? Proposez en MP!")
        //.setAuthor(message.author.username, message.author.avatarURL)
        //.setTimestamp()
        //.addField('Nom de serveur', "BotsLand©", false)
        //.addField("Proriétaire du serveur", guild.owner, false)
        //.addField("Nombre de membres", "Membres :" + bot.users.size + "\nBot :" + guild.bot + "\nHumain :", "dhegfbh", false)
       // .addField("Date de création", guild.createdAt, false)
       // .addField("Emojis du serveur !", guild.emojis.size, false)
       // .addField("Liste des émojis !", guild.emojis.id, false)
        //.addField("Nombre de Roles !", guild.roles.size, false)
       // .addField("DefaultRole", guild.defaultRole, false)
        //.addField("Nombre de channel", guild.channels.size, false)
       // message.channel.sendEmbed(embedserver)








        break;




        case "test":
            var embedtest = new Discord.RichEmbed()
                .setColor("#FFFF00")
                .setFooter("Idée de commande ? Proposez en MP!")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTimestamp()
                .addField("test", "test")
           let test = bot.guilds.get('376377745367629825').channels.get('394955833651232775');
           if(message.channel.id != "394955833651232775") return message.reply('pas ici')
           message.channel.sendEmbed(embedtest);
           
            





        break;


        case "discord":
        var embedtest = new Discord.RichEmbed()
            .setColor("#FFFF00")
            .setFooter("Idée de commande ? Proposez en MP!")
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp()
            .addField("=>", "`Voici un lien d'invitation du serveur PlayGam's:`https://discord.gg/Sh8US7T ")
        message.channel.sendEmbed(embedtest);
        break;

        case "regles":
        var embedtest = new Discord.RichEmbed()
            .setColor("#FFFF00")
            .setFooter("Idée de commande ? Proposez en MP!")
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp()
            .addField("=>", "`Voici le lien des règles de PlayGam's` : http://playgams.forumactif.com/t6-reglement-de-playgam-s-discord")
        message.channel.sendEmbed(embedtest);
        break;

        case "stats":
        var embedtest = new Discord.RichEmbed()
            .setColor("#FFFF00")
            .setFooter("Idée de commande ? Proposez en MP!")
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp()
            .addField("=>", "---\n\nVoici les `statistiques` du serveur `Bot'sLand` : \n\n- Nous possédons actuellement"+"`"+bot.users.size+"`"+"membres"+"`"+"\n\n- Il y a actuellement `24 bots` sur le serveur .")
        message.channel.sendEmbed(embedtest);
        break;


        
        case "alerte":
            let members = message.members;
            let reasonalert = args.slice(1).join(' ');
            if (reasonalert.length < 1) return message.reply("Tu dois préciser la raison ! :warning: ")
            var embedalerte = new Discord.RichEmbed()
                .setColor("#FFFF00")
                .setFooter("Idée de commande ? Proposez en MP!")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTimestamp()
                .addField(message.author.username, reasonalert)
            message.guild.roles.get("396059611268120576").members.forEach(m => m.users.send(embedalerte));


        break;

        

    

        
    }

    

      




    


    
    
})




bot.login(process.env.TOKEN);
