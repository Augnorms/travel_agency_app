"use client"
import React, { useEffect, useState } from 'react';

export default function ImageDisplay() {
    const [mediaItems, setMediaItems] = useState([
        {
            src: "/event_images/canada_amb1.jpeg",
            alt: "Meeting with Canadian Ambassador",
            title: "Diplomatic Meeting",
            description: "Discussion on cultural exchange programs with the Canadian Ambassador"
        },
        {
            src: "/event_images/chief1.jpeg",
            alt: "Chief's Conference",
            title: "Traditional Council",
            description: "Annual gathering with local chiefs and community leaders"
        },
        {
            src: "/event_images/group1.jpeg",
            alt: "Group Activity",
            title: "Team Building",
            description: "Team building exercises during the annual retreat"
        },
        {
            src: "/event_images/group2.jpeg",
            alt: "Group Photo",
            title: "Community Event",
            description: "Celebration of cultural heritage day with community members"
        },
        {
            src: "/event_images/self1.jpeg",
            alt: "Keynote Speech",
            title: "Personal Shot",
            description: "Personal Shot at the occation"
        },
        {
            src: "/event_images/meeting1.jpeg",
            alt: "Board Meeting",
            title: "Strategic Planning",
            description: "Quarterly strategic planning session with board members"
        },
        {
            src: "/event_images/self2.jpeg",
            alt: "Award Ceremony",
            title: "Personal Shot",
            description: "Personal Shot at the occation"
        },
        {
            src: "/event_images/self_chief1.jpeg",
            alt: "Traditional Ceremony",
            title: "Airport",
            description: "Meeting and welcoming the chief at the Airport"
        },
        {
            src: "/event_images/self_chief3.jpeg",
            alt: "Chief's Council",
            title: "Airport",
            description: "Meeting and welcoming the chief at the Airport"
        },
        {
            src: "/event_images/lecture_vedio1.mp4",
            alt: "Educational Lecture",
            title: "Educational Seminar",
            description: "Guest lecture on leadership and governance"
        },
        {
            src: "/event_images/cheif_vedio1.mp4",
            alt: "Chief's Address",
            title: "Royal Address",
            description: "Chief's address to the community on development projects"
        }
    ]);

    //fetch event memmories
    const handlefetchMemories = async () => {
        try {
            const response = await fetch("/api/event/get-event-memories", {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log(data.data);

            if (data.ok) {
                const mapped = data.data.map((item: any) => ({
                    src: item.image_url,
                    alt: item.title || "Event Image",
                    title: item.title,
                    description: item.description
                }));

                setMediaItems(prev => [...mapped, ...prev]);
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        handlefetchMemories()
    }, [])   

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Event Gallery</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaItems.map((item, index) => (
                    <div key={index} className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                        <div className="relative flex-1 min-h-[200px] max-h-[300px] overflow-hidden">
                            {item.src?.endsWith('.mp4') ? (
                                <div className="relative w-full h-full">
                                    <video
                                        src={item.src}
                                        className="absolute inset-0 w-full h-full object-contain bg-black"
                                        controls
                                        muted
                                        loop
                                        title={item.alt}
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        className="max-w-full max-h-full object-contain p-2"
                                        style={{ maxHeight: '280px' }}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                            <p className="text-gray-600 flex-grow">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
