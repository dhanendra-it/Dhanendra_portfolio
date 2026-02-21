import { useState } from "react";

 const  Section4 =()=> {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <section className="bg-secondary dark:bg-dark-third text-slate-500 dark:text-white py-20 px-6  ">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-3xl mb-10 text-heading dark:text-white">
          Send me an email
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
        >

          {/* Left Side */}
          <div className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-transparent border border-gray-600 dark:border-slate-200 rounded-md px-4 py-3 focus:outline-none focus:border-yellow-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent border border-gray-600 dark:border-slate-200 rounded-md px-4 py-3 focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* Right Side */}
          <div className="flex flex-col">
            <textarea
              name="message"
              rows="6"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-transparent border border-gray-600 dark:border-slate-200 rounded-md px-4 py-3 focus:outline-none focus:border-yellow-400 resize-none"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 self-end bg-yellow-400 text-black px-6 py-3 rounded-md hover:bg-yellow-300 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send email"}
            </button>

            {success && (
              <p className="text-green-400 mt-4">
                Message sent successfully 🚀
              </p>
            )}
          </div>

        </form>
      </div>
    </section>
  );
}
export default Section4;