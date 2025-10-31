import { useEffect, useState } from "react";
import { loadUserProfile, saveUserProfile, type UserProfile } from "@/lib/athleteVision";

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    setProfile(loadUserProfile());
  }, []);

  const updateProfile = (updated: UserProfile) => {
    setProfile(updated);
    saveUserProfile(updated);
  };

  return { profile, updateProfile };
}
