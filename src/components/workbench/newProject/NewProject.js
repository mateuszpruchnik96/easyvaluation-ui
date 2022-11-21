import React from "react";

const NewProject = () => {
  const handleClick = (event) => {
    console.log("handleClick ran");
    event.preventDefault(); // 👈️ prevent page refresh
  };

  return (
    <div className="new-project">
      <header className="new-project__header">New project</header>
      <form
        className="new-project__form"
        onkeydown="return event.key != 'Enter';"
      >
        <label for="new-project__form__name">
          Project name:
          <input
            type="text"
            id="new-project__form__name"
            placeholder="Give your project some name"
          />
        </label>

        <label>
          Deadline:
          <input type="date" />
        </label>

        <label className="new-project__form__desc">
          Description:
          <input type="text" placeholder="Describe your project here" />
        </label>
        <button
          type="button"
          className="new-project__form__button"
          omClick={handleClick}
        >
          Create a new project
        </button>
      </form>
    </div>
  );
};

export default NewProject;
