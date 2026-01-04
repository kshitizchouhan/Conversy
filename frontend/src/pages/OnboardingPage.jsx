import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import {
  LoaderIcon,
  MapPinIcon,
  ShuffleIcon,
  Volleyball,
  CameraIcon,
} from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] flex items-center justify-center px-4">
      <div className="relative w-full max-w-3xl">

        {/* MAIN BUBBLE CARD */}
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-xl border border-black/5">

          {/* HEADER */}
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <Volleyball className="text-emerald-500 size-7" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-700">
              Complete your profile ✨
            </h1>
            <p className="text-gray-500 mt-1">
              Help others know you better and find the right language partners
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* PROFILE PIC */}
            <div className="flex flex-col items-center gap-4">
              <div className="size-32 rounded-full bg-gray-100 overflow-hidden shadow">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <CameraIcon className="size-12" />
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleRandomAvatar}
                className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-semibold hover:bg-emerald-200 transition"
              >
                <ShuffleIcon className="size-4 mr-2 inline" />
                Generate Random Avatar
              </button>
            </div>

            {/* FULL NAME */}
            <input
              type="text"
              placeholder="Your full name"
              value={formState.fullName}
              onChange={(e) =>
                setFormState({ ...formState, fullName: e.target.value })
              }
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200
                         text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            {/* BIO */}
            <textarea
              placeholder="Tell others about yourself and your language goals"
              value={formState.bio}
              onChange={(e) =>
                setFormState({ ...formState, bio: e.target.value })
              }
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200
                         text-gray-700 h-24 resize-none
                         focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            {/* LANGUAGES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                value={formState.nativeLanguage}
                onChange={(e) =>
                  setFormState({ ...formState, nativeLanguage: e.target.value })
                }
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200
                           text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="">Native language</option>
                {LANGUAGES.map((lang) => (
                  <option key={`native-${lang}`} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>

              <select
                value={formState.learningLanguage}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    learningLanguage: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200
                           text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="">Learning language</option>
                {LANGUAGES.map((lang) => (
                  <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* LOCATION */}
            <div className="relative">
              <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="text"
                placeholder="City, Country"
                value={formState.location}
                onChange={(e) =>
                  setFormState({ ...formState, location: e.target.value })
                }
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200
                           text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 rounded-2xl bg-emerald-500 text-white
                         font-bold text-lg hover:bg-emerald-600 active:scale-95 transition"
            >
              {!isPending ? (
                <>
                  <Volleyball className="size-5 mr-2 inline" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2 inline" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
