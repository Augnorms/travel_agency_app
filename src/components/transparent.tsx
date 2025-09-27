import React from "react";
type Prop = {
  show?: boolean;
};
export default function Transparent(prop: Prop) {
  const { show } = prop;
  return (
    <div className="min-h-[65vh] flex items-center justify-center">
      {/* Transparent Glass Div */}
      {show && (
        <div
          className="
          w-full lg:w-3/4 p-2 mt-2 mb-2
          lg:p-10 lg:rounded-2xl
          bg-[dodgerblue]
          shadow-xl 
          border border-white/30
          text-center text-white
        "
        >
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p className="text-lg text-center">
            The Shama Sister City Commission (S₂C₂) is a community-based
            advisory body registered in the the United Kingdom as a charitable
            organization, dedicated to building enduring partnerships between
            Shama Municipality (Ghana) and international sister cities. Since
            2010, the Commission has nurtured a special connection with South
            Molton Town Council in Devonshire, UK, with the goal of promoting
            cultural, educational, and economic exchange. Our mission is to
            foster global understanding and cooperation by facilitating
            people-to-people relationships, collaborative programs, and shared
            learning between partner communities. Through cultural exchanges,
            youth and educational initiatives, trade collaborations, and
            community development projects, S₂C₂ aims to enrich both Shama and
            its sister cities by: Celebrating and sharing culture, traditions,
            and heritage Enabling student, artist, and professional exchanges
            Stimulating trade, small business links, and entrepreneurship
            Supporting joint projects in education, environment, health, and
            infrastructure Building friendships, trust, and mutual respect
            across borders As a commission rooted in both local commitment and
            global outreach, we invite citizens, organizations, and institutions
            to join us in forging bridges across continents — connecting Ghana
            and the UK in a spirit of mutual growth, friendship, and shared
            prosperity.
          </p>
        </div>
      )}
    </div>
  );
}
