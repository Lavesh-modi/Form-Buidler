import React from "react";
import JsonDisplay from "./displayJSON";

const DynamicForm = ({ formData, close, displayJSON }) => {
  console.log(formData,"form data")
  console.log(displayJSON,"json")
  const renderField = (field, index) => {
    let DynamicTag = field.tag;
    if (DynamicTag === "") {
      DynamicTag = "h1";
    }
    switch (field.type) {
      case "textarea":
        return (
          <div className="my-2">
            <label>
              {field.label}
              {field.required && <span className="ml-2 text-red-500">*</span>}
            </label>
            <textarea
              key={index}
              placeholder={field.value}
              rows="4"
              cols="50"
              required={field.required}
              className="border rounded-md p-2 mt-2 w-full"
            />
          </div>
        );
      case "checkbox":
        return (
          <div className="my-2">
            <label>
              {field.label}
              {field.required && <span className="ml-2 text-red-500">*</span>}
            </label>
            <div key={index} className="mt-2">
              {field.options.map((option, i) => (
                <label key={i} className="flex items-center">
                  <input
                    type="checkbox"
                    value={option.opvalue}
                    className="form-checkbox size-4"
                  />
                  <span className="ml-2">{option.text}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case "text":
        return (
          <div className="my-2">
            <label>
              {field.label}
              {field.required && <span className="ml-2 text-red-500">*</span>}
            </label>
            <input
              key={index}
              type={field.inputType}
              placeholder={field.value}
              required={field.required}
              className="border rounded-md p-2 mt-2 w-full"
            />
          </div>
        );
      case "radio":
        return (
          <div className="my-2">
            <label>
              {field.label}
              {field.required && <span className="ml-2 text-red-500">*</span>}
            </label>
            <div key={index} className="mt-2">
              {field.options.map((option, i) => (
                <label key={i} className="flex items-center m-2">
                  <input
                    type="radio"
                    name={field.label}
                    value={option.opvalue}
                    className="form-radio size-4"
                  />
                  <span className="ml-2">{option.text}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case "select":
        return (
          <div className="my-2">
            <label>
              {field.label}
              {field.required && <span className="ml-2 text-red-500">*</span>}
            </label>
            <select
              key={index}
              required={field.required}
              className="border rounded-md p-2 mt-2 w-full"
            >
              <option value="">Select...</option>
              {field.options.map((option, i) => (
                <option key={i} value={option.opvalue}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
        );
      case "button":
        return (
          <button
            key={index}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
          >
            {field.label}
          </button>
        );
      case "header":
        return (
          <div className="text-center mb-8">
            <DynamicTag key={index} className="">
              {field.label}
            </DynamicTag>
          </div>
        );
        case "date":
          return(
            <div className="flex  gap-2">
            <label
              htmlFor={`field-datetime-${index}`}
              className="text-md font-semibold"
            >
              {field.label}:
            </label>
        <span>{field.value}</span>
          </div>
          );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="text-right">
        <button
          onClick={close}
          className="bg-zinc-800 text-white hover:bg-zinc-700 px-4 py-2 rounded-md mb-5 mt-5"
        >
          Close
        </button>
      </div>
      {displayJSON ? (
        <div>
          <JsonDisplay jsonData={formData} />
        </div>
      ) : (
        <div>
          <form className="max-w-lg mx-auto my-10 ">
            {formData.map((field, index) => renderField(field, index))}
          </form>
        </div>
      )}
    </>
  );
};

export default DynamicForm;
