
const chat = document.getElementById('chatGeral')
const socket = io('http://localhost')

function renderMessage(message) {
    $('.messages').append('<div class="message"><strong>' + message.author + '</strong>: ' + message.message + '</div>')
    chat.scrollTop = chat.scrollHeight
}

socket.on('receptiveAllMessage', (message) => {
    for (m of message) {
        renderMessage(m)
    }
})

socket.on('receivedMessage', (message) => {
    renderMessage(message)
})

$('#chat').submit((event) => {
    event.preventDefault()

    var author = $('input[name=username]').val()
    var message = $('input[name=message]').val()

    if (author.length && message.length) {
        var messageObject = {
            author: author,
            message: message
        }

        renderMessage(messageObject)

        document.querySelector('input[name=message]').value = ''

        socket.emit('sendMessage', messageObject)
    }
})

function writeUsername() {
    localStorage.setItem('user', $('input[name=username]').val())
}