const connection = new signalR.HubConnectionBuilder()
                              .withUrl("/learningHub")
                              .configureLogging(signalR.LogLevel.Information)
                              .build();

connection.on("ReceiveMessage",(message) => {
    $('#signalr-message-panel').prepend($('<div/>').text(message));
});

$('#btn-broadcast').click(() => {
    var message = $('#broadcast').val();
    connection.invoke("BroadcastMessage", message).catch(err => console.error(err.toString()));
});

async function start() {
    try {
        await connection.start();
        console.log('connected');
    } catch (error) {
        console.log(error);
        setTimeout(() => start(), 5000);
    }
}

connection.onclose(async () => {
    await start();
});

start();