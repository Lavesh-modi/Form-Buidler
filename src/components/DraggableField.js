import React from "react";
import { useDrag, useDrop } from "react-dnd";
import FileUpload from "./FileUpload";

const DraggableField = ({
  index,
  field,
  moveField,
  setFormFields,
  formFields,
}) => {
  const ref = React.useRef(null);


  console.log(field,"fields from the draggable")
  // Use Drag hook
  const [{ isDragging }, drag] = useDrag({
    type: "FIELD",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Use Drop hook
  const [, drop] = useDrop({
    accept: "FIELD",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveField(draggedItem.index, index);
        draggedItem.index = index; // Update the index for the dragged item
      }
    },
  });

  drag(drop(ref)); // Connect drag and drop to the same element
  const handleFieldChange = (index, event) => {
    const { name, value, type, checked } = event.target;
    setFormFields((prevFields) => {
      const updatedFields = [...prevFields];
      if (type === "checkbox") {
        updatedFields[index] = { ...updatedFields[index], [name]: checked };
      } else {
        updatedFields[index] = { ...updatedFields[index], [name]: value };
      }
      return updatedFields;
    });
  };

  const addOption = (index) => {
    console.log(index, "index");
    setFormFields((prevFields) => {
      const updatedFields = [...prevFields];
      console.log(updatedFields, "prev fields");
      updatedFields[index].options.push({ text: "", opvalue: "" });
      console.log(updatedFields, "updated Fields");
      return updatedFields;
    });
  };

  const removeOption = (fieldIndex, optionIndex) => {
    setFormFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[fieldIndex].options.splice(optionIndex, 1);
      return updatedFields;
    });
  };

  const removeField = (index) => {
    setFormFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const moveElement = (action, index) => {
    if (action === "up" && index > 0) {
      setFormFields((prevFields) => {
        const updatedFields = [...prevFields];
        [updatedFields[index], updatedFields[index - 1]] = [
          updatedFields[index - 1],
          updatedFields[index],
        ];
        return updatedFields;
      });
    }
    if (action === "down" && index < formFields.length - 1) {
      setFormFields((prevFields) => {
        const updatedFields = [...prevFields];
        [updatedFields[index], updatedFields[index + 1]] = [
          updatedFields[index + 1],
          updatedFields[index],
        ];
        return updatedFields;
      });
    }
  };

  return (
    <div
      ref={ref}
      className={`p-4 rounded-lg bg-gray-100 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div key={index} className="bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center">
          <input
            type="text"
            name="label"
            placeholder="Label"
            value={field.label}
            onChange={(e) => handleFieldChange(index, e)}
            className="input mx-3 p-2 my-2"
          />
          {field.type === "text" ? (
            <>
              <select
                className="input px-4 py-2"
                name="inputType"
                onChange={(e) => {
                  handleFieldChange(index, e);
                }}
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="password">Password</option>
                <option value="number">Number</option>
              </select>
            </>
          ) : null}
          {field.type === "header" ? (
            <>
              <select
                className="input px-4 py-2"
                name="tag"
                onChange={(e) => {
                  handleFieldChange(index, e);
                }}
              >
                <option value="h1">h1</option>
                <option value="h2">h2</option>
                <option value="h3">h3</option>
                <option value="h4">h4</option>
                <option value="h5">h5</option>
                <option value="h6">h6</option>
              </select>
            </>
          ) : null}
          {field.type === "text" || field.type === "textarea" ? (
            <textarea
              name="value"
              placeholder="Default Value"
              value={field.value}
              onChange={(e) => handleFieldChange(index, e)}
              className="input mx-3 p-2 h-10"
            />
          ) : null}
        </div>
        {field.type === "radio" ? (
          <>
            <input
              type="text"
              name="value"
              placeholder="value"
              onChange={(e) => handleFieldChange(index, e)}
              className="input my-2 mx-3 p-2 block"
            />
            {field.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className="flex items-center space-x-4 space-y-0"
              >
                <input
                  type={field.type}
                  name={`option-${index}-${optionIndex}`}
                  checked={field.value === option.opvalue}
                  onChange={(e) => handleFieldChange(index, e)}
                  className="input mx-3 p-2"
                />
                <input
                  type="text"
                  name={`option-${index}-${optionIndex}`}
                  placeholder="Option"
                  value={option.text}
                  onChange={(e) => {
                    const newOptions = [...field.options];
                    newOptions[optionIndex] = {
                      ...option,
                      text: e.target.value,
                    };
                    setFormFields((prevFields) => {
                      const updatedFields = [...prevFields];
                      updatedFields[index].options = newOptions;
                      return updatedFields;
                    });
                  }}
                  className="input mx-3 p-2"
                />
                <button
                  className="btn m-5 bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
                  onClick={() => removeOption(index, optionIndex)}
                >
                  Remove Option
                </button>
              </div>
            ))}
            <button
              className="btn m-5 bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
              onClick={() => addOption(index)}
            >
              Add Option
            </button>
          </>
        ) : (
          ""
        )}
        {field.type === "checkbox" ? (
          <>
            {field.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className="flex items-center space-x-4 space-y-0"
              >
                <input
                  type={field.type}
                  name={`option-${index}-${optionIndex}`}
                  checked={field.value === option.opvalue}
                  onChange={(e) => handleFieldChange(index, e)}
                  className="checkbox mx-3 p-2"
                />

                <div className="flex items-center">
                  <input
                    type="text"
                    name={`option-text-${index}-${optionIndex}`}
                    placeholder="Option"
                    value={option.text}
                    onChange={(e) => {
                      const newOptions = [...field.options];
                      newOptions[optionIndex] = {
                        ...option,
                        text: e.target.value,
                      };
                      setFormFields((prevFields) => {
                        const updatedFields = [...prevFields];
                        updatedFields[index].options = newOptions;
                        return updatedFields;
                      });
                    }}
                    className="input mx-3 p-2"
                  />
                  <input
                    type="text"
                    name={`option-value-${index}-${optionIndex}`}
                    placeholder="Option Value"
                    value={option.opvalue}
                    onChange={(e) => {
                      const newOptions = [...field.options];
                      newOptions[optionIndex] = {
                        ...option,
                        opvalue: e.target.value,
                      };
                      setFormFields((prevFields) => {
                        const updatedFields = [...prevFields];
                        updatedFields[index].options = newOptions;
                        return updatedFields;
                      });
                    }}
                    className="input mx-3 p-2"
                  />
                </div>

                <button
                  className="btn m-5 bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
                  onClick={() => removeOption(index, optionIndex)}
                >
                  Remove Option
                </button>
              </div>
            ))}
            <button
              className="btn m-5 bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
              onClick={() => addOption(index)}
            >
              Add Option
            </button>
          </>
        ) : null}
        {field.type === "select" ? (
          <>
            <select
              name="value"
              value={field.value}
              onChange={(e) => handleFieldChange(index, e)}
              className="input mx-3 p-2 w-36 m-4"
            >
              {field.options.map((option, optionIndex) => (
                <option key={optionIndex} value={option.opvalue}>
                  {option.text}
                </option>
              ))}
            </select>
            {field.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-4">
                <input
                  type="text"
                  name={`option-text-${index}-${optionIndex}`}
                  placeholder="Option"
                  value={option.text}
                  onChange={(e) => {
                    const newOptions = [...field.options];
                    newOptions[optionIndex] = {
                      ...option,
                      text: e.target.value,
                    };
                    setFormFields((prevFields) => {
                      const updatedFields = [...prevFields];
                      updatedFields[index].options = newOptions;
                      return updatedFields;
                    });
                  }}
                  className="input mx-3 p-2"
                />
                <input
                  type="text"
                  name={`option-value-${index}-${optionIndex}`}
                  placeholder="Option Value"
                  value={option.opvalue}
                  onChange={(e) => {
                    const newOptions = [...field.options];
                    newOptions[optionIndex] = {
                      ...option,
                      opvalue: e.target.value,
                    };
                    setFormFields((prevFields) => {
                      const updatedFields = [...prevFields];
                      updatedFields[index].options = newOptions;
                      return updatedFields;
                    });
                  }}
                  className="input mx-3 p-2"
                />
                <button
                  className="btn bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
                  onClick={() => removeOption(index, optionIndex)}
                >
                  Remove Option
                </button>
              </div>
            ))}
            <button
              className="btn m-5 bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
              onClick={() => addOption(index)}
            >
              Add Option
            </button>
          </>
        ) : null}

        {field.type === "date" && (
          <div className="flex items-center">
            <input
              type="datetime-local"
              name="value"
              value={field.value}
              onChange={(e) => handleFieldChange(index, e)}
              className="input mx-3 p-2"
            />
            <label className="ml-2">
              {field.label || "Pick a Date and Time"}
            </label>
          </div>
        )}

        {field.type === "files" && (
          <div className= "w-[100%]">
            {/* ngkngkwngkegnkngkenkg */}
            <FileUpload />
          </div>
        )}
        <div className=" inline-flex items-center justify-center gap-5">
          <button
            className="btn m-5 bg-blue-950 text-white border-2 border-white hover:bg-blue-800 px-4 py-2 rounded-md"
            onClick={() => removeField(index)}
          >
            Remove Field
          </button>
        </div>

        {field.type !== "button" || field.type !== "header" ? (
          <>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="required"
                id={index}
                checked={field.required}
                onChange={(e) => handleFieldChange(index, e)}
                className="checkbox mx-3 p-2 size-5"
              />
              <label htmlFor={index}>Is Required</label>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default DraggableField;
