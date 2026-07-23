"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import LocationInput from "../Components/LocationInput";
import { UtensilsCrossed } from "lucide-react";

const CITIES = [
    "Aba",
    "Lagos",
    "Abuja",
    "Port Harcourt",
    "Uyo",
    "Umuahia",
    "Calabar",
];

export default function CheckoutForm() {
    const { data: session } = useSession();

    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");

    const [road, setRoad] = useState("");
    const [street, setStreet] = useState("");

    const [manualRoad, setManualRoad] = useState("");
    const [manualStreet, setManualStreet] = useState("");

    const [houseAddress, setHouseAddress] = useState("");
    const [deliveryNote, setDeliveryNote] = useState("");

    return (
        <div className="bg-white rounded-3xl shadow-md p-6">

            <h2 className="text-2xl font-bold text-gray-800 mb-8">
                Delivery Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                {/* Full Name */}
                <div>
                    <label className="font-semibold text-gray-700">
                        Full Name
                    </label>

                    <input
                        type="text"
                        value={session?.user?.name || ""}
                        readOnly
                        className="mt-2 w-full border rounded-xl p-3 bg-gray-100 outline-none"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="font-semibold text-gray-700">
                        Email Address
                    </label>

                    <input
                        type="email"
                        value={session?.user?.email || ""}
                        readOnly
                        className="mt-2 w-full border rounded-xl p-3 bg-gray-100 outline-none"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="font-semibold text-gray-700">
                        Phone Number
                    </label>

                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234..."
                        className="mt-2 w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                {/* City */}
                <div>
                    <label className="font-semibold text-gray-700">
                        City
                    </label>

                    <select
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value);

                            setRoad("");
                            setStreet("");
                            setManualRoad("");
                            setManualStreet("");
                        }}
                        className="mt-2 w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option value="">Select City</option>

                        {CITIES.map((city) => (
                            <option
                                key={city}
                                value={city}
                            >
                                {city}
                            </option>
                        ))}
                    </select>
                </div>

                
                {/* Road */}
                <LocationInput
                    city={city}
                    road={road}
                    label="Major Road"
                    placeholder="Search your Major Road..."
                    value={street}
                    onChange={setStreet}
                />

<div className="hidden md:flex items-center justify-center">
  <div className="w-full rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 py-4 flex flex-col items-center justify-center">

    <div className="bg-orange-500 rounded-full p-2.5 shadow animate-slow-pulse">
      <UtensilsCrossed
        size={22}
        strokeWidth={2.5}
        className="text-white"
      />
    </div>

    <h2 className="text-lg font-black tracking-[0.25em] text-orange-500 mt-3">
      EATENY
    </h2>

    <p className="text-[11px] text-gray-500 mt-1">
      Made fresh. Delivered with care.
    </p>

    <div className="flex gap-1.5 mt-3">
      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce"></span>
      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce [animation-delay:150ms]"></span>
      <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-bounce [animation-delay:300ms]"></span>
    </div>

  </div>
</div>
                {/* Manual Road */}
                <div>
                    <label className="font-semibold text-gray-700">
                        Road not listed? (Optional)
                    </label>

                    <input
                        type="text"
                        value={manualRoad}
                        onChange={(e) => setManualRoad(e.target.value)}
                        placeholder="Type your road"
                        className="mt-2 w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>


                {/*  Street */}
                <div>
                    <label className="font-semibold text-gray-700">
                        Street 
                    </label>

                    <input
                        type="text"
                        value={manualStreet}
                        onChange={(e) => setManualStreet(e.target.value)}
                        placeholder="Type your street"
                        className="mt-2 w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                {/* House Address */}
                <div className="md:col-span-2">
                    <label className="font-semibold text-gray-700">
                        House Number / Apartment / Landmark
                    </label>

                    <textarea
                        rows={4}
                        value={houseAddress}
                        onChange={(e) => setHouseAddress(e.target.value)}
                        placeholder="House No. 25, Apartment B, beside GTBank..."
                        className="mt-2 w-full border rounded-xl p-3 resize-none outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                {/* Delivery Note */}
                <div className="md:col-span-2">
                    <label className="font-semibold text-gray-700">
                        Delivery Note (Optional)
                    </label>

                    <textarea
                        rows={3}
                        value={deliveryNote}
                        onChange={(e) => setDeliveryNote(e.target.value)}
                        placeholder="Gate color, call before arrival, nearest bus stop..."
                        className="mt-2 w-full border rounded-xl p-3 resize-none outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

            </div>

        </div>
    );
}