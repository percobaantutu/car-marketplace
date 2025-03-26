import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import CarItem from "@/components/CarItem";
import { db } from "./../../../configs/index";
import { CarListing, CarImages } from "./../../../configs/schema";
import { eq } from "drizzle-orm";
import { FaTrashCan } from "react-icons/fa6";

function MyListing() {
  const { user } = useUser();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const result = await db.select().from(CarListing).where(eq(CarListing.created_by, user.primaryEmailAddress.emailAddress)).leftJoin(CarImages, eq(CarListing.id, CarImages.car_id));

        setListings(
          result.map((row) => ({
            ...row.car_listing,
            images: row.car_images ? [row.car_images] : [],
          }))
        );
      } catch (err) {
        setError("Failed to fetch listings");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchListings();
  }, [user]);

  return (
    <div>
      <Tabs defaultValue="my-listing" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 bg-white p-2 mb-5">
          <TabsTrigger value="my-listing">My Listing</TabsTrigger>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="my-listing">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-4xl">My Listing</h2>
            <Link to="/addlisting">
              <Button>+ Add New Listing</Button>
            </Link>
          </div>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : listings.length === 0 ? (
            <div className="text-center text-gray-500">No listings found. Create your first one!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
              {listings.map((car) => (
                <div key={car.id}>
                  <CarItem
                    car={{
                      ...car,
                      image: car.images[0]?.image_url, // Access through relation
                      name: `${car.make} ${car.model}`,
                      miles: car.mileage,
                      price: car.price, // Using renamed price field
                      fuelType: car.fuel_type, // Snake_case field
                      gearType: car.transmission,
                    }}
                  />
                  <div className="mt-2 w-full flex justify-between gap-2">
                    <Button className="bg-slate-300 w-full">Edit</Button>
                    <Button className="bg-red-500">
                      <FaTrashCan />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="inbox"></TabsContent>
        <TabsContent value="profile"></TabsContent>
      </Tabs>
    </div>
  );
}

export default MyListing;
