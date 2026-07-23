"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, MapPin } from "lucide-react";

export default function LocationInput({
  city,
  road = "",
  label,
  placeholder,
  value,
  onChange,
}) {
  const wrapperRef = useRef(null);

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleOutside(e) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutside
      );
  }, []);

  useEffect(() => {
    if (!city || value.length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        const searchQuery = road
          ? `${value}, ${road}, ${city}, Nigeria`
          : `${value}, ${city}, Nigeria`;

        const response = await fetch(
          `https://api.locationiq.com/v1/autocomplete?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_KEY}&q=${encodeURIComponent(
            searchQuery
          )}&limit=6&dedupe=1&format=json`
        );

        const data = await response.json();

        setResults(Array.isArray(data) ? data : []);
        setOpen(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [value, city, road]);

  return (
    <div ref={wrapperRef} className="relative">

      <label className="font-semibold text-gray-700">
        {label}
      </label>

      <input
        type="text"
        value={value}
        disabled={!city}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          city
            ? placeholder
            : "Select city first"
        }
        className="mt-2 w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
      />

      {loading && (
        <Loader2
          size={18}
          className="absolute right-4 top-[52px] animate-spin text-orange-500"
        />
      )}

      {open && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-2xl shadow-xl border overflow-hidden">

          {results.map((item) => (
            <button
              key={item.place_id}
              type="button"
              onClick={() => {
                onChange(item.display_name);
                setOpen(false);
              }}
              className="w-full text-left p-4 hover:bg-orange-50 flex gap-3 transition"
            >
              <MapPin
                size={18}
                className="text-orange-500 mt-1"
              />

              <span className="text-sm">
                {item.display_name}
              </span>

            </button>
          ))}

        </div>
      )}
    </div>
  );
}