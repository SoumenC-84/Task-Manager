namespace CleanArcht.Domain.Entities;

public class TaskItem
{
    public Guid Id { get; private set; }
    public string Title { get; private set; }
    public string? Status { get; set; }
    public string? UserId { get; set; }

    public TaskItem(string title)
    {
        Id = Guid.NewGuid();
        Title = title;
        Status = "To Do";
    }

    public void MarkComplete()
    {
        Status = "Done";
    }
    public void MarkInProgress()
    {
        Status = "In Progress";
    }
    public void MarkAssigned()
    {
        Status = "Assigned";
    }
}
