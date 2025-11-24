"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });
            const data = await response.json();
            console.log(data)
            if (data.ok) {
                setStatus(data.ok);
                setMessage(data.message);

                setTimeout(() => {
                    setStatus(false);
                    setMessage("");
                     router.push("/dashboard");
                }, 3000);
               
            } else {
                setStatus(data.ok);
                setMessage(data.message);
                setTimeout(() => {
                    setStatus(false);
                    setMessage("");
                }, 3000);
            }
        } catch (error) {
            console.error(error);
            setStatus(false);
            setMessage("An error occurred " + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[62vh] flex items-center justify-center bg-gray-100 p-8">
            <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">{status}
                <h2 className="text-2xl font-bold text-center mb-6" style={{ color: status ? "green" : "red" }}>
                    {message}
                </h2>

                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Login
                </h2>

                <form className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 mb-1 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 mb-1 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={email === "" || password === "" || loading}
                        className="
                            w-full 
                            bg-blue-600 
                            text-white 
                            py-2 
                            rounded-lg 
                            font-semibold 
                            transition 
                            hover:bg-blue-700 
                            cursor-pointer
                            disabled:bg-blue-300 
                            disabled:cursor-not-allowed 
                            disabled:hover:bg-blue-300
                        "
                        onClick={handleSubmit}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    <Link href="/home" className="text-blue-600 hover:underline">
                        Navigate back home? click here
                    </Link>
                </form>
            </div>
        </div>
    );
}
