import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "../utils/constants";
import { addConnection } from "../redux/slices/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();

  const connectionUser = useSelector(
    (store) => store.connection
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchConnections = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `${BASE_URL}/user/connection`,
        {
          withCredentials: true,
        }
      );

      dispatch(addConnection(res?.data?.data || []));
    } catch (error) {
      console.error("Connection error:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to load your connections."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  /* ---------------- Loading ---------------- */

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-4rem)] bg-base-200 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">

          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-8 w-48 animate-pulse rounded-lg bg-base-300" />
            <div className="mt-3 h-4 w-72 animate-pulse rounded bg-base-300" />
          </div>

          {/* Card Skeletons */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-base-100 p-5 shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 animate-pulse rounded-full bg-base-300" />

                  <div className="flex-1">
                    <div className="h-5 w-32 animate-pulse rounded bg-base-300" />
                    <div className="mt-2 h-3 w-20 animate-pulse rounded bg-base-300" />
                  </div>
                </div>

                <div className="mt-5 h-12 w-full animate-pulse rounded bg-base-300" />
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <span className="loading loading-dots loading-md mt-8 text-primary" />
          </div>
        </div>
      </main>
    );
  }

  /* ---------------- Error ---------------- */

  if (error) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-base-200 px-4">
        <div className="w-full max-w-md rounded-3xl bg-base-100 p-8 text-center shadow-xl">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-error/10 text-3xl">
            ⚠️
          </div>

          <h2 className="text-2xl font-bold">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-base-content/60">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchConnections}
            className="btn btn-primary mt-6 rounded-xl px-8"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  /* ---------------- Empty State ---------------- */

  if (!connectionUser?.length) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-base-200 px-4">
        <div className="w-full max-w-md rounded-3xl bg-base-100 p-8 text-center shadow-xl">

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-4xl">
            🤝
          </div>

          <h2 className="text-2xl font-bold">
            No Connections Yet
          </h2>

          <p className="mt-3 text-sm leading-6 text-base-content/60">
            You don't have any connections yet. Start discovering
            people and build meaningful connections.
          </p>
        </div>
      </main>
    );
  }

  /* ---------------- Connections ---------------- */

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-base-200 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Your Network
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                Connections
              </h1>

              <p className="mt-2 max-w-xl text-sm text-base-content/60 sm:text-base">
                People you've connected with on Tryst.
              </p>
            </div>

            {/* Connection Count */}
            <div className="self-center rounded-2xl bg-base-100 px-5 py-3 text-center shadow-sm sm:self-auto">
              <p className="text-2xl font-bold text-primary">
                {connectionUser.length}
              </p>

              <p className="text-xs text-base-content/50">
                {connectionUser.length === 1
                  ? "Connection"
                  : "Connections"}
              </p>
            </div>

          </div>
        </div>

        {/* Connection Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {connectionUser.map(
            ({
              _id,
              firstName,
              lastName,
              age,
              gender,
              about,
              photoUrl,
            }) => (
              <article
                key={_id}
                className="group rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Profile Header */}
                <div className="flex items-center gap-4">

                  {/* Avatar */}
                  <div className="avatar">
                    <div className="w-16 rounded-full ring-2 ring-primary/20 ring-offset-2 ring-offset-base-100">
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt={`${firstName} ${lastName}`}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-primary/10 text-2xl">
                          👤
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-lg font-bold">
                      {firstName} {lastName}
                    </h2>

                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      {age && (
                        <span className="text-xs text-base-content/60">
                          {age} years
                        </span>
                      )}

                      {gender && (
                        <span className="badge badge-ghost badge-sm capitalize">
                          {gender}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Connected Badge */}
                  <div
                    className="tooltip tooltip-left"
                    data-tip="Connected"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-success/10 text-success">
                      ✓
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-4 h-px bg-base-300" />

                {/* About */}
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span>✨</span>
                    <span className="text-sm font-semibold">
                      About
                    </span>
                  </div>

                  <p className="line-clamp-3 text-sm leading-6 text-base-content/60">
                    {about || "No bio available."}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-base-content/40">
                    Your connection
                  </span>

                  <span className="badge badge-success badge-outline">
                    Connected
                  </span>
                </div>

              </article>
            )
          )}

        </div>
      </div>
    </main>
  );
};

export default Connections;