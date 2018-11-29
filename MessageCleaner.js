const fs = require('fs');

class MessageCleaner {
    constructor(file = './words.txt') {
        this._file = file;
    }

    getWords() {
        return fs.readFileSync(this._file, 'utf8');
    }

    clean(message) {
        let messageArray = this.toArray(message);
        let fileArray = this.toArray(this.getWords());
        for (var i = 0; i < messageArray.length; i++) {
            fileArray.forEach(word => {
                if (messageArray[i].toLowerCase() === word.toLowerCase()) {
                    messageArray[i] = this.toStars(messageArray[i]);
                }
            });
        }
        return messageArray.join(" ");
    }

    toArray(message) {
        return message.split(' ');
    }

    toStars(message) {
        let stars = '';
        for (var i = 0; i < message.length; i++) {
            stars += '*';
        }
        return stars;
    }
}

module.exports = MessageCleaner;