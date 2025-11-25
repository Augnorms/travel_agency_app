"use client"
import React, { useEffect, useState } from "react";
type Prop = {
  show?: boolean;
  className?:string;
};
export default function Transparent(prop: Prop) {
  const { show, className } = prop;

    const [aboutContent, setAboutContent] = useState({
      id: 0,
      title: "",
      description: "",
      created_at: "",
      updated_at: ""
    });
    const [_isLoading, setIsLoading] = useState(false);

     //fetch about content
  const fetchAboutContent = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/about/get-about-for-site", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const result = await response.json();

        // result.data is the actual about record
        if (result.data) {
          setAboutContent(result.data);  // Remove array brackets
          console.log(aboutContent)
        } else {
          setAboutContent({
            id: 0,
            title: "",
            description: "",
            created_at: "",
            updated_at: ""
          });
        }

      }

    } catch (error) {
      console.error("Error fetching about content:", error);
    }finally{
      setIsLoading(false);
    }
  };

  useEffect(()=>{
   fetchAboutContent();
  },[]);

  return (
   <div className={`${className} flex items-center justify-center relative`}>
      {/* Transparent Glass Div */}
      {show && (
        <div
          className="
          w-full lg:h-[60vh] lg:w-3/4 p-2 mt-2 mb-2
          lg:p-10 lg:rounded-2xl
          bg-[dodgerblue]
          shadow-xl 
          border border-white/30
          text-center text-white
          lg:overflow-y-auto
          mt-20
        "
        >
          <h2 className="text-2xl font-bold mb-4">{aboutContent ? aboutContent.title :'About Us'}</h2>
          {
            aboutContent
            ?
           <p className="text-lg text-center p-2 shadow-lg rounded-md mt-10" style={aboutContent ? { border: '1px solid white' } : {}}>
            {aboutContent.description }
           </p>
            :
            <p className="text-lg text-center mt-10">
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
          </p>}
        </div>
      )}
    </div>
  );
}
