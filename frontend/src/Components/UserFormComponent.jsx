export default function UserFormComponent({
  formData,
  handleOnFormChange,
  handleOnFormSubmit,
}) {
  return (
    <div>
      <form action="" onSubmit={(e) => handleOnFormSubmit(e)}>
        <input
          type="text"
          name="username"
          placeholder="Username..."
          value={formData.username}
          onChange={(e) => handleOnFormChange(e)}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password..."
          value={formData.password}
          onChange={(e) => handleOnFormChange(e)}
          required
        />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}
