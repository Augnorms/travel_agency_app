import React, { useState } from "react";
import { FiMapPin, FiPhone, FiMessageSquare } from "react-icons/fi";
import { FaPaperPlane } from "react-icons/fa";

export default function ContactPage() {
  const [status, setStatus] = useState(""); // "success", "error", "sending", or ""
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setStatus("sending");

  //   const formData = new FormData(e.currentTarget);

  //   const response = await fetch(
  //     "https://formsubmit.co/ajax/428f97d4fc0452ff5d4932a1bf2a1599",
  //     {
  //       method: "POST",
  //       body: formData,
  //     }
  //   );

  //   // Check if the response is OK (status 200-299)
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }

  //   // Get the response as text first to see what it is
  //   const responseText = await response.text();

  //   // Check if the response is HTML (indicating an error page)
  //   if (responseText.startsWith("<!DOCTYPE") || responseText.startsWith("<")) {
  //     throw new Error(
  //       "FormSubmit returned an HTML error page. The submission may have failed."
  //     );
  //   }

  //   // Now try to parse the text as JSON
  //   try {
  //     const data = JSON.parse(responseText);

  //     if (data.success) {
  //       setStatus("success");
  //       // Fixed line - use e.target instead of e.currentTarget
  //       const formElement = e.target as HTMLFormElement;
  //       formElement.reset();
  //       setTimeout(() => setStatus(""), 4000);
  //     } else {
  //       setStatus("error");
  //       setTimeout(() => setStatus(""), 4000);
  //     }
  //   } catch (parseError) {
  //     console.error("Error parsing JSON:", parseError);
  //     setStatus("error");
  //     setTimeout(() => setStatus(""), 4000);
  //   }
  // };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/send-email", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          phone,
          message
        })
      });

      if (res.ok) {
         console.log(res)
        setStatus("success");
        // Clear form
        setFirstname("");
        setLastname("");
        setEmail("");
        setPhone("");
        setMessage("");
        setTimeout(() => setStatus(""), 3000)
        
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  return (
    <div className="bg-gray-50 w-full min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* === TOP: CONTACT US (standalone full-width block) === */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="w-full pt-4 pb-8">
            <h1 className="text-4xl text-center md:text-left lg:text-5xl font-bold text-gray-800 mb-4">
              Contact Us
            </h1>
            <p className="text-gray-600 text-center md:text-left max-w-md mb-8">
              The Shama Sister City Commission fosters friendship, cultural
              exchange, and mutual understanding between Shama, Ghana and South
              Molton, UK. We connect communities through education, arts,
              business, and service programs that build lasting global
              relationships.
            </p>

            <div className="relative">
              <FaPaperPlane className="text-4xl text-blue-300 transform -rotate-12 absolute -bottom-4 left-1/2 -translate-x-1/2 md:static md:translate-x-0" />
            </div>
          </div>
        </div>

        {/* === MIDDLE: Blue Background + Overlapping Form (separate block) === */}
        <div className="max-w-6xl mx-auto mt-6 mb-32 lg:mb-32 px-0">
          <div className="relative w-full min-h-[430px] md:min-h-[320px]">
            {/* Blue background full block */}
            <div className="absolute inset-0 bg-blue-600 rounded-3xl shadow-lg md:pr-[45%] lg:pr-[40%] z-0" />

            {/* Decorative shapes inside blue area */}
            <div className="absolute -top-12 right-12 md:-right-12 w-48 h-48 bg-orange-500 rounded-full z-0 opacity-90" />
            <div className="absolute -bottom-16 left-0 md:-left-16 w-40 h-40 bg-yellow-400 rounded-full z-0 opacity-80" />
            <div className="absolute bottom-4 left-1/2 w-32 h-32 bg-blue-400 rounded-full z-0 opacity-60" />

            {/* White Form Card - positioned on the right (overlap) */}
            <div
              className="
                absolute 
                -top-20 
                left-1/2 -translate-x-1/2 
                md:top-8 md:-translate-y-1/2 md:right-8 md:left-auto md:translate-x-0 
                bg-white rounded-2xl shadow-xl 
                p-4 sm:p-6 md:p-8 
                w-[100%]   lg:w-6/12 xl:w-5/12 
                z-20
            "
            >
              {/* Status Message - Appears above the form */}
              {status && (
                <div
                  className={`mb-6 p-4 rounded-lg text-center font-medium ${status === "success"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : status === "error"
                        ? "bg-red-100 text-red-800 border border-red-200"
                        : "bg-blue-100 text-blue-800 border border-blue-200"
                    }`}
                >
                  {status === "success" &&
                    "✅ Message sent successfully! We'll get back to you soon."}
                  {status === "error" &&
                    "❌ Failed to send message. Please try again."}
                  {status === "sending" && "⏳ Sending your message..."}
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Need help contact us
              </h3>

              <div className="space-y-6">
                <input type="hidden" name="_captcha" value="false" />
                <input
                  type="hidden"
                  name="_subject"
                  value="New Contact Form Submission"
                />

                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="text-sm text-gray-500"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      name="first-name"
                      className="w-full mt-1 pb-2 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 transition"
                      required
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="text-sm text-gray-500"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      name="last-name"
                      className="w-full mt-1 pb-2 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 transition"
                      required
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                </div>

                {/* Email and Phone Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="text-sm text-gray-500">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full mt-1 pb-2 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 transition"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-sm text-gray-500">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full mt-1 pb-2 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 transition"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="text-sm text-gray-500">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="w-full mt-1 pb-2 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 transition"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full cursor-pointer bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "SENDING..." : "SUBMIT"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* === BOTTOM: Info Cards (unchanged) === */}
        <div className="mt-8 md:mt-0 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            We&apos;re here for you.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Location Card (Spans 2 columns) */}
            <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6 flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FiMapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800">Location</p>
                <p className="text-gray-600">MILTON KEYNES, UNITED KINGDOM</p>
              </div>
            </div>

            {/* Email Card (Spans 2 columns) */}
            <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6 flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FiMessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left min-w-0 flex-1">
                <p className="font-semibold text-gray-800">Email</p>
                <p className="text-gray-600 truncate">
                  shamasistercitycommission@yahoo.com
                  <br />
                  fm209281@yahoo.com
                </p>
              </div>
            </div>

            {/* Right side cards container (spans 1 column on md) */}
            <div className="md:col-span-1 space-y-6">
              {/* Phone Card */}
              <div className="bg-white rounded-xl shadow-md p-6 flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full shrink-0">
                  <FiPhone className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left min-w-0">
                  <p className="font-semibold text-gray-800">Phone 1</p>
                  <p className="text-gray-600 break-words">00447975963012</p>
                </div>
              </div>

              {/* Phone 2 Card */}
              <div className="bg-white rounded-xl shadow-md p-6 flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full shrink-0">
                  <FiPhone className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left min-w-0">
                  <p className="font-semibold text-gray-800">Phone 2</p>
                  <p className="text-gray-800 break-words">00447405294745</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
