using FluentAssertions;
using Moq;
using UserService.Application.Features.Users.Commands;
using UserService.Application.Features.Users.Handlers;
using UserService.Application.Interfaces;
using UserService.Domain.Entities;
using Xunit;

public class CreateUserCommandHandlerTests
{
    [Fact]
    public async Task Handle_Should_Create_User()
    {
        // Arrange

        var repositoryMock = new Mock<IUserRepository>();

        repositoryMock
            .Setup(x => x.AddAsync(It.IsAny<User>()))
            .Returns((User u) => u);

        var handler = new CreateUserHandler(repositoryMock.Object);

        var command = new CreateUserCommand
        {
            FirstName = "Soumen",
            LastName = "Chakraborty",
            Email = "soumen@test.com"
        };

        // Act

        var result = await handler.Handle(command);

        // Assert

        result.Should().NotBe(Guid.Empty);
        //result.FirstName.Should().Be("Soumen");

        repositoryMock.Verify(
            x => x.AddAsync(It.IsAny<User>()),
            Times.Once);
    }
}