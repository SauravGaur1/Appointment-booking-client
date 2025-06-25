"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import ProtectedRoute from "../../../components/ProtectedRoute";
import api from "../../../lib/axios";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ProfilePage() {
  const { logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/users/me")
      .then(res => {
        setProfile(res.data.data);
        setBio(res.data.data.bio || "");
        setSkills(res.data.data.skills || []);
      })
      .catch(() => toast.error("Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  const handleAddSkill = () => {
    if (skillInput && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = skill => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleSave = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/users/profile", { bio, skills });
      toast.success("Profile updated!");
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-white dark:from-neutral-900 dark:to-neutral-950 py-10">
        <div className="w-full max-w-2xl mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/pages/dashboard" className="text-blue-700 hover:underline font-semibold">
            &larr; Dashboard
          </Link>
          <div className="flex gap-4">
            <Link href="/pages/public-profiles" className="text-blue-700 hover:underline font-semibold">
              Public Profiles
            </Link>
            <button
              onClick={logout}
              className="text-red-600 hover:underline font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="w-full max-w-2xl bg-white dark:bg-neutral-800 rounded shadow p-6 border border-blue-100 dark:border-neutral-700">
          <h1 className="text-2xl font-bold mb-6">My Profile</h1>
          {loading ? (
            <div>Loading...</div>
          ) : !profile ? (
            <div className="text-gray-500">Profile not found.</div>
          ) : (
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <div className="font-semibold">Name:</div>
                <div className="mb-2">{profile.name}</div>
                <div className="font-semibold">Email:</div>
                <div className="mb-2">{profile.email}</div>
              </div>
              <div>
                <div className="font-semibold mb-1">Bio:</div>
                <textarea
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                  rows={3}
                  placeholder="Tell us about yourself"
                />
              </div>
              <div>
                <div className="font-semibold mb-1">Skills:</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {skills.map(skill => (
                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded text-xs flex items-center"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-1 text-red-500 hover:text-red-700"
                        aria-label="Remove skill"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    className="border px-2 py-1 rounded"
                    placeholder="Add skill"
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded font-semibold"
                  >
                    Add
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}