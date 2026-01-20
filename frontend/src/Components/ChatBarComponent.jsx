export default function ChatBarComponent(
  chatBox,
  handleOnChatSubmit,
  handleOnMessageChange,
  user,
) {
  return (
    <div>
      <p id="user">{user}</p>
      <form action="" onSubmit={(e) => handleOnChatSubmit(e)}>
        <input
          type="textarea"
          name="message"
          id="chat-box"
          placeholder="Start a chat..."
          value={chatBox.message}
          onChange={(e) => handleOnMessageChange(e)}
          required
        />
        <button>Send</button>
      </form>
    </div>
  );
}
