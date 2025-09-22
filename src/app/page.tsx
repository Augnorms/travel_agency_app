'use client';
import { ChatComponent } from "@/components/chat-component";

import { MessageCircle, ChevronDown } from 'lucide-react';
import {useState } from "react";



const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen w-screen bg-zinc-50 dark:bg-zinc-950">
      {/* This is the main content of the page, it can be anything */}
      <div className="p-8">
        <h1 className="text-2xl font-bold">Home Page</h1>
        <p>Lets collaborate!</p>
      </div>

      <div className="fixed bottom-4 right-4 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            aria-label="Open chat"
          >
            <MessageCircle size={24} />
          </button>
        )}

        {isOpen && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-2xl w-[400px] h-[600px] flex flex-col">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900 rounded-t-lg">
              <h3 className="font-semibold text-lg">Messages</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                aria-label="Close chat"
              >
                <ChevronDown size={24} />
              </button>
            </div>
            <div className="flex-grow p-4 overflow-y-auto">
              <ChatComponent />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
