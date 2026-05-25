using CleanArcht.Application.Command;
using CleanArcht.Domain.Entities;
using CleanArcht.Domain.Interfaces;
using Moq;
using Xunit;

public class CreateTaskCommandValidatorTests
{
    [Fact]
    public void Should_Fail_When_Title_Is_Empty()
    {
        // Arrange
        var validator = new CreateTaskCommandValidator();

        var command = new CreateTaskCommand
        {
            Title = ""
        };

        // Act
        var result = validator.Validate(command);

        // Assert
        Assert.False(result.IsValid);
    }

    [Fact]
    public void Should_Pass_When_Title_Is_Provided()
    {
        // Arrange
        var validator = new CreateTaskCommandValidator();

        var command = new CreateTaskCommand
        {
            Title = "Complete CI Pipeline"
        };

        // Act
        var result = validator.Validate(command);

        // Assert
        Assert.True(result.IsValid);
    }
    [Fact]
    public async Task Handle_Should_Create_Task()
    {
        // Arrange

        var repositoryMock = new Mock<ITaskRepository>();

        repositoryMock
.Setup(x => x.AddAsync(It.IsAny<TaskItem>()))
.Returns(Task.CompletedTask);

        var handler =
            new CreateTaskCommandHandler(repositoryMock.Object);

        var command = new CreateTaskCommand
        {
            Title = "Implement CI Pipeline"
        };

        // Act

        var result = await handler.Handle(command);

        // Assert

        Assert.NotNull(result);
        Assert.Equal("Implement CI Pipeline", result.Title);

        repositoryMock.Verify(
            x => x.AddAsync(It.IsAny<TaskItem>()),
            Times.Once);
    }

}