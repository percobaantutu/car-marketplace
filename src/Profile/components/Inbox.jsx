"use client";

import { useEffect, useState } from "react";
import { SendBirdProvider } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";
import { useUser } from "@clerk/clerk-react";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import { GroupChannel } from "@sendbird/uikit-react/GroupChannel";
import { createSendBirdUser } from "./../../Shared/Service";

function Inbox() {
  const { user } = useUser();
  const [userId, setUserId] = useState("");
  const [channelUrl, setChannelUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const appId = import.meta.env.VITE_SENDBIRD_APP_ID;

  useEffect(() => {
    const initializeChat = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Safely extract email username for ID
        const id = user.primaryEmailAddress?.emailAddress?.split("@")[0] || user.id;

        // Register/update user with SendBird
        if (appId) {
          await createSendBirdUser(id, user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim(), user.imageUrl);
        }

        setUserId(id);
      } catch (err) {
        console.error("Failed to initialize SendBird:", err);
        setError("Failed to connect to chat service");
      } finally {
        setLoading(false);
      }
    };

    initializeChat();
  }, [user, appId]);

  // Safe channel selection handler
  const handleChannelSelect = (channel) => {
    if (channel && channel.url) {
      setChannelUrl(channel.url);
    } else {
      console.warn("Selected channel is null or missing URL");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md">
          Retry
        </button>
      </div>
    );
  }

  if (!user) {
    return <div className="text-center p-4">Please login to access chat</div>;
  }

  if (!appId) {
    return <div className="text-center p-4">SendBird configuration is missing</div>;
  }

  return (
    <div>
      <div style={{ width: "100%", height: "80vh" }}>
        <SendBirdProvider appId={appId} userId={userId} nickname={user?.fullName} profileUrl={user?.imageUrl}>
          <div className="grid md:grid-cols-3 grid-cols-1 h-full gap-3  overflow-hidden">
            <div className="border border-slate-500 rounded-lg shadow-lg">
              <GroupChannelList onChannelSelect={handleChannelSelect} />
            </div>
            <div className="md:col-span-2 border border-slate-500  rounded-lg shadow-lg">
              {channelUrl ? <GroupChannel channelUrl={channelUrl} /> : <div className="flex items-center justify-center h-full text-gray-500">Select a conversation or start a new chat</div>}
            </div>
          </div>
        </SendBirdProvider>
      </div>
    </div>
  );
}

export default Inbox;
