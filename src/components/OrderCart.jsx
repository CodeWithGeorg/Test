import { useState } from "react";

export default function OrderForm() {
  const [file, setFile] = useState(null);

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 mt-10 shadow-lg rounded-xl">

      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Place Your Order
      </h2>

      <form className="space-y-5">

        <div>
          <label className="font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            className="w-full mt-2 p-3 border rounded-xl"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="font-medium text-gray-700">Email / WhatsApp</label>
          <input
            type="text"
            className="w-full mt-2 p-3 border rounded-xl"
            placeholder="Your contact"
          />
        </div>

        <div>
          <label className="font-medium text-gray-700">Service Type</label>
          <select className="w-full mt-2 p-3 border rounded-xl">
            <option>Academic Writing</option>
            <option>Transcription</option>
            <option>Editing / Proofreading</option>
          </select>
        </div>

        <div>
          <label className="font-medium text-gray-700">Deadline</label>
          <input type="date" className="w-full mt-2 p-3 border rounded-xl" />
        </div>

        <div>
          <label className="font-medium text-gray-700">Upload File</label>
          <input
            type="file"
            className="w-full mt-2 p-3 border rounded-xl"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}
