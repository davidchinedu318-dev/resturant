"use client";

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

export default function CheckoutForm({
  deliveryData,
  setDeliveryData,
}) {
  const { data: session } = useSession();

  const {
    phone,
    city,
    road,
    street,
    manualRoad,
    manualStreet,
    houseAddress,
    deliveryNote,
  } = deliveryData;

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
            onChange={(e) =>
              setDeliveryData({
                ...deliveryData,
                phone: e.target.value,
              })
            }
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
              setDeliveryData({
                ...deliveryData,
                city: e.target.value,
                road: "",
                street: "",
                manualRoad: "",
                manualStreet: "",
              });
            }}
            className="mt-2 w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select City</option>

            {CITIES.map((cityName) => (
              <option
                key={cityName}
                value={cityName}
              >
                {cityName}
              </option>
            ))}
          </select>
        </div>

        {/* Major Road */}
        <LocationInput
          city={city}
          label="Major Road"
          placeholder="Search your Major Road..."
          value={road}
          onChange={(value) =>
            setDeliveryData({
              ...deliveryData,
              road: value,
            })
          }
        />

       

        

        {/* Manual Road */}
        <div>
          <label className="font-semibold text-gray-700">
            Road not listed? (Optional)
          </label>

          <input
            type="text"
            value={manualRoad}
            onChange={(e) =>
              setDeliveryData({
                ...deliveryData,
                manualRoad: e.target.value,
              })
            }
            placeholder="Type your road"
            className="mt-2 w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Manual Street */}
        <div>
          <label className="font-semibold text-gray-700">
            Street
          </label>

          <input
            type="text"
            value={manualStreet}
            onChange={(e) =>
              setDeliveryData({
                ...deliveryData,
                manualStreet: e.target.value,
              })
            }
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
            onChange={(e) =>
              setDeliveryData({
                ...deliveryData,
                houseAddress: e.target.value,
              })
            }
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
            onChange={(e) =>
              setDeliveryData({
                ...deliveryData,
                deliveryNote: e.target.value,
              })
            }
            placeholder="Gate color, call before arrival, nearest bus stop..."
            className="mt-2 w-full border rounded-xl p-3 resize-none outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

      </div>
    </div>
  );
}