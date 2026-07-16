"use client";

import { useSession } from "next-auth/react";
import { User, Mail } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Please login first.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-5">

      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">

        <div className="flex flex-col items-center">

          <Image
            src={session.user.image || "/avatar.png"}
            alt="Profile"
            width={110}
            height={110}
            className="rounded-full border-4 border-orange-500"
          />

          <h1 className="mt-5 text-2xl font-bold">
            {session.user.name}
          </h1>

          <p className="text-gray-500">
            {session.user.email}
          </p>

        </div>

        <div className="mt-8 space-y-4">

          <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-100">

            <User className="text-orange-500" />

            <div>
              <p className="text-sm text-gray-500">
                Name
              </p>

              <h2 className="font-semibold">
                {session.user.name}
              </h2>

            </div>

          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-100">

            <Mail className="text-orange-500" />

            <div>

              <p className="text-sm text-gray-500">
                Email
              </p>

              <h2 className="font-semibold">
                {session.user.email}
              </h2>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}