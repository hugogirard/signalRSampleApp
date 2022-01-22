namespace SignalRServer.Hubs;

public interface ILearningHubClient
{
    Task ReceiveMessage(string message);
}