const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers 
    ] 
});

client.on('messageCreate', async (message) => {
    // أمر البرودكاست (مثلاً !bc)
    if (message.content.startsWith('!bc')) {
        const args = message.content.slice(4).trim(); // النص بعد !bc
        if (!args) return message.reply('اكتب الرسالة اللي تبي ترسلها!');

        // نرسل لأعضاء السيرفر
        message.guild.members.fetch().then(members => {
            let count = 0;
            members.forEach((member, index) => {
                if (member.user.bot) return; // نتجاهل البوتات

                // تأخير بسيط عشان ديسكورد ما يعطيك حظر (سبام)
                setTimeout(() => {
                    member.send(args).catch(err => console.log(`تعذر الإرسال لـ ${member.user.tag}`));
                }, index * 3000); // 3 ثواني بين كل رسالة
            });
            message.reply('تم البدء بإرسال البرودكاست بنجاح!');
        });
    }
});

// ضع التوكين الخاص ببوتك هنا
client.login('');