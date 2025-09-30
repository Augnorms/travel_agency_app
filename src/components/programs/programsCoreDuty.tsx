import React from "react";

export default function CoreDuties() {
  const duties = [
    {
      title: "Promote International Friendship & Understanding",
      desc: "Facilitate cultural exchanges, art exhibits, music performances, and encourage citizen diplomacy.",
    },
    {
      title: "Coordinate Sister City Activities",
      desc: "Plan and host delegations, organize events, and recommend new partnerships.",
    },
    {
      title: "Support Educational & Youth Programs",
      desc: "Collaborate with schools and universities to create opportunities for study abroad and classroom connections.",
    },
    {
      title: "Foster Economic & Business Ties",
      desc: "Promote trade, tourism, and investment opportunities, including business delegations and entrepreneurial exchanges.",
    },
    {
      title: "Advisory Role",
      desc: "Advise local government leaders on international relations and policies that strengthen diplomacy.",
    },
    {
      title: "Community Engagement",
      desc: "Encourage residents, businesses, and organizations to participate in sister city programs and events.",
    },
    {
      title: "Fundraising & Grant Writing",
      desc: "Secure funding through grants, sponsorships, and fundraising activities to support initiatives.",
    },
  ];

  return (
    <section className="py-16 px-6 bg-white">
      {/* Title */}
      <div className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-12">
        OUR CORE DUTIES
        <div className="w-24 h-1 bg-blue-500 mx-auto mt-2 rounded"></div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {duties.map((duty, idx) => (
          <div
            key={idx}
            className="relative bg-gradient-to-br from-blue-50 to-blue-100 
                       rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
          >
            {/* Number badge */}
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
              {idx + 1}
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {duty.title}
            </h3>
            <p className="text-gray-600 text-sm">{duty.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
