import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";

import { capitialize } from "../lib/utils";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs?.length) {
      outgoingFriendReqs.forEach((req) =>
        outgoingIds.add(req.recipient._id)
      );
    }
    setOutgoingRequestsIds(outgoingIds);
  }, [outgoingFriendReqs]);

  return (
    <div className="min-h-screen bg-base-100 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-3xl font-extrabold text-base-content">
            Your Friends 🤝
          </h2>

          <Link
            to="/notifications"
            className="btn btn-outline btn-primary btn-sm rounded-full"
          >
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {/* FRIENDS LIST */}
        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        {/* DISCOVER SECTION */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-extrabold text-base-content">
              Meet New Learners 🌍
            </h2>
            <p className="text-base-content/70 mt-1">
              Discover perfect language exchange partners
            </p>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="bg-base-200 rounded-[2.5rem] shadow p-8 text-center">
              <h3 className="text-lg font-semibold text-base-content">
                No recommendations available
              </h3>
              <p className="text-base-content/70 mt-1">
                Check back later for new language partners!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent =
                  outgoingRequestsIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="bg-base-200 rounded-[2.5rem] p-6 shadow hover:shadow-xl transition space-y-4"
                  >
                    {/* USER INFO */}
                    <div className="flex items-center gap-4">
                      <div className="avatar size-16 rounded-full">
                        <img
                          src={user.profilePic}
                          alt={user.fullName}
                        />
                      </div>

                      <div>
                        <h3 className="font-bold text-lg text-base-content">
                          {user.fullName}
                        </h3>
                        {user.location && (
                          <div className="flex items-center text-xs text-base-content/70 mt-1">
                            <MapPinIcon className="size-3 mr-1" />
                            {user.location}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* LANGUAGES */}
                    <div className="flex flex-wrap gap-2">
                      <span className="badge badge-primary">
                        {getLanguageFlag(user.nativeLanguage)}
                        Native: {capitialize(user.nativeLanguage)}
                      </span>
                      <span className="badge badge-outline">
                        {getLanguageFlag(user.learningLanguage)}
                        Learning: {capitialize(user.learningLanguage)}
                      </span>
                    </div>

                    {user.bio && (
                      <p className="text-sm text-base-content/70">
                        {user.bio}
                      </p>
                    )}

                    {/* ACTION */}
                    <button
                      onClick={() => sendRequestMutation(user._id)}
                      disabled={hasRequestBeenSent || isPending}
                      className={`btn w-full mt-2 ${
                        hasRequestBeenSent
                          ? "btn-disabled"
                          : "btn-primary"
                      }`}
                    >
                      {hasRequestBeenSent ? (
                        <>
                          <CheckCircleIcon className="size-4 mr-2" />
                          Request Sent
                        </>
                      ) : (
                        <>
                          <UserPlusIcon className="size-4 mr-2" />
                          Send Friend Request
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
