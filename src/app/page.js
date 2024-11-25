"use client"

import DraggableField from "@/components/DraggableField";
import DynamicForm from "@/components/dynamicform";
import Image from "next/image";
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Home() {
  const [formFields, setFormFields] = useState([]);
  const [show, setShow] = useState(false);
  const [jsondisplayed, setJsonDisplayed] = useState(false);

  const addField = (type) => {
    const field = {
      id: Date.now(), // Unique ID for React DnD
      type,
      label: "",
      value: "",
      options: [],
      inputType: "",
      tag: "",
      required: false,
    };

    if (type === "radio") {
      field.options = ["Option 1", "Option 2"];
    } else if (type === "checkbox" || type === "select") {
      field.options = [
        { text: "Option Name 1", opvalue: "value1" },
        { text: "Option Name 2", opvalue: "value2" },
      ];
    }

    setFormFields((prevFields) => [...prevFields, field]);
  };

  const moveField = (dragIndex, hoverIndex) => {
    const updatedFields = [...formFields];
    const [draggedField] = updatedFields.splice(dragIndex, 1); // Remove the dragged item
    updatedFields.splice(hoverIndex, 0, draggedField); // Insert it at the hovered position
    setFormFields(updatedFields);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 bg-slate-200 px-2 py-4 fixed w-full top-0">
          <button
            onClick={() => addField("textarea")}
            className="btn bg-blue-950 text-white px-4 py-2 rounded-md"
          >
            Add Textarea
          </button>
          <button
            onClick={() => addField("checkbox")}
            className="btn bg-blue-950 text-white px-4 py-2 rounded-md"
          >
            Add Checkbox
          </button>
          <button
            onClick={() => addField("text")}
            className="btn bg-blue-950 text-white px-4 py-2 rounded-md"
          >
            Add Text Field
          </button>
          <button
            className="btn bg-blue-950 text-white hover:bg-blue-800 px-4 py-2 rounded-md"
            onClick={() => addField("radio")}
          >
            Add Radio Button
          </button>
          <button
            className="btn bg-blue-950 text-white hover:bg-blue-800 px-4 py-2 rounded-md"
            onClick={() => addField("select")}
          >
            Add Select Dropdown
          </button>
          <button
            className="btn bg-blue-950 text-white hover:bg-blue-800 px-4 py-2 rounded-md"
            onClick={() => addField("button")}
          >
            Add Button
          </button>
          <button
            className="btn bg-blue-950 text-white hover:bg-blue-800 px-4 py-2 rounded-md"
            onClick={() => addField("header")}
          >
            Add Header Text
          </button>
          <button
            className="btn bg-blue-950 text-white hover:bg-blue-800 px-4 py-2 rounded-md"
            onClick={() => addField("date")}
          >
            Add Date  Fields
          </button>
          <button
            className="btn bg-blue-950 text-white hover:bg-blue-800 px-4 py-2 rounded-md"
            onClick={() => addField("files")}
          >
            Add Files
          </button>
        </div>

        <div className="space-y-4 mt-44">
          {formFields.map((field, index) => (
            <DraggableField
              key={field.id}
              index={index}
              field={field}
              moveField={moveField}
              setFormFields={setFormFields}
              formFields={formFields}
            />
          ))}
        </div>

        {formFields.length > 0 && (
          <div>
            <button
              className="btn m-5 bg-blue-950 text-white px-4 py-2 rounded-md"
              onClick={() => {
                setShow(true);
                setJsonDisplayed(false);
              }}
            >
              Preview Form
            </button>
            <button
              className="btn m-5 bg-blue-950 text-white px-4 py-2 rounded-md"
              onClick={() => {
                setShow(true);
                setJsonDisplayed(true);
              }}
            >
              Check JSON
            </button>
          </div>
        )}

        {show && (
          <div className="shadow-lg inline-block px-4 bg-slate-200 fixed top-0 right-0 w-1/3 overflow-y-auto h-full">
            <DynamicForm
              formData={formFields}
              close={() => {
                setShow(false);
                setJsonDisplayed(false);
              }}
              displayJSON={jsondisplayed}
            />
          </div>
        )}
      </div>
    </DndProvider>
  );
};
