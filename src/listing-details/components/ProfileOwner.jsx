import { Button } from "@/components/ui/button";
import React from "react";

function ProfileOwner({ carDetail }) {
  return (
    <div className="p-4 rounded-xl bg-white shadow-md border border-slate-300 mt-2 flex flex-col justify-center">
      <h2 className="font-semibold tex-4xl text-center">Profil Owner</h2>
      {carDetail?.user_name ? (
        <div className="w-full flex flex-col items-center gap-2 justify-center mt-3">
          <img src={carDetail?.user_image_url} alt="profil_image" className="h-10 w-10 object-cover rounded-full" />
          <h2 className="text-xl">{carDetail.user_name}</h2>
          <h2 className="text-gray-600">{carDetail.created_by}</h2>
          <Button className="w-full text-md bg-green-500 rounded-xl" size="lg">
            {" "}
            Message Owner{" "}
          </Button>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-white shadow-md border border-slate-300 mt-2 animate-pulse h-60"></div>
      )}
    </div>
  );
}

export default ProfileOwner;
