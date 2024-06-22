import React, { useState, useEffect, useRef } from "react";
import FadeIn from "./FadeIn";
import TextInput from "./TextInput";
import RadioInput from "./RadioInput";
import Button from "./Button";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    guest: "",
    guestName: ""
  });

  const [errors, setErrors] = useState({});
  const [attendingWithGuest, setAttendingWithGuest] = useState(false);
  const [summary, setSummary] = useState(null);
  const summaryRef = useRef(null);

  const handleGuestChange = (event) => {
    const { value } = event.target;
    setAttendingWithGuest(value === "Yes");
    setFormData((prevData) => ({
      ...prevData,
      guest: value
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const validate = () => {
    let errors = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData.age) {
      errors.age = "Age is required";
    } else if (isNaN(formData.age) || formData.age <= 0) {
      errors.age = "Age must be a number greater than 0";
    }
    if (attendingWithGuest && !formData.guestName) {
      errors.guestName = "Guest Name is required";
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSummary(formData);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <FadeIn>
      {summary && (
         <div ref={summaryRef} className="mb-8 p-6 border rounded-lg bg-gradient-to-r from-white/30 to-white/50 shadow-md">
         <h2 className="text-2xl font-semibold mb-4 text-black/80">Form Summary</h2>
         <div className="space-y-2 text-black/75">
           <p><strong>Name:</strong> {summary.name}</p>
           <p><strong>Email:</strong> {summary.email}</p>
           <p><strong>Age:</strong> {summary.age}</p>
           <p><strong>Attending with Guest:</strong> {summary.guest}</p>
           {summary.guest === "Yes" && (
             <p><strong>Guest Name:</strong> {summary.guestName}</p>
           )}
         </div>
       </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="isolate mt-2 -space-y-px rounded-2xl bg-white/50">
          <div className="border border-neutral-300 px-2 py-4 first:rounded-t-2xl last:rounded-b-2xl">
            <TextInput
              label="Name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
            />
            {errors.name && <p className="text-red-600">{errors.name}</p>}
          </div>
          <div className="border border-neutral-300 px-2 py-4 first:rounded-t-2xl last:rounded-b-2xl">
            <TextInput
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            {errors.email && <p className="text-red-600">{errors.email}</p>}
          </div>
          <div className="border border-neutral-300 px-2 py-4 first:rounded-t-2xl last:rounded-b-2xl">
            <TextInput
              label="Age"
              name="age"
              autoComplete="age"
              value={formData.age}
              onChange={handleInputChange}
              error={errors.age}
            />
            {errors.age && <p className="text-red-600">{errors.age}</p>}
          </div>
          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">Are you attending with a guest?</legend>
            </fieldset>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <RadioInput
                label="Yes"
                name="guest"
                value="Yes"
                onChange={handleGuestChange}
              />
              <RadioInput
                label="No"
                name="guest"
                value="No"
                onChange={handleGuestChange}
              />
            </div>
          </div>
          {attendingWithGuest && (
            <div className="border border-neutral-300 px-2 py-4 first:rounded-t-2xl last:rounded-b-2xl">
              <TextInput
                label="Guest Name"
                name="guestName"
                autoComplete="guest-name"
                value={formData.guestName}
                onChange={handleInputChange}
                error={errors.guestName}
              />
              {errors.guestName && <p className="text-red-600">{errors.guestName}</p>}
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="mt-2">
            SUBMIT NOW
          </Button>
        </div>
      </form>
    </FadeIn>
  );
};

export default ContactForm;
