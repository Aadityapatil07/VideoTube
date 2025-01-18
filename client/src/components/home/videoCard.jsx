import { Card, CardContent } from "../ui/card";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
    const [age, setAge] = useState("");

    useEffect(() => {
        const calculateAge = () => {
            const createdDate = new Date(video.createdAt); // Convert `createdAt` to Date
            const now = new Date();
            const differenceInMs = now - createdDate;

            const seconds = Math.floor(differenceInMs / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const months = Math.floor(days / 30)
            const years = Math.floor(months / 12)

            if (years > 0) {
                return `${years} year${years > 1 ? "s" : ""} ago`;
            } else if (months > 0) {
                return `${months} month${months > 1 ? "s" : ""} ago`;
            } else if (days > 0) {
                return `${days} day${days > 1 ? "s" : ""} ago`;
            } else if (hours > 0) {
                return `${hours} hour${hours > 1 ? "s" : ""} ago`;
            } else if (minutes > 0) {
                return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
            } else {
                return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
            }
        };

        setAge(calculateAge());
        const interval = setInterval(() => setAge(calculateAge()), 1000); // Update every second

        return () => clearInterval(interval); // Cleanup on unmount
    }, [video.createdAt]);
    return (
        <Link to={`/watch-video/${video._id}`}>
        <Card className="w-full border-none max-w-sm mx-auto shadow-none hover:shadow-xl transition-shadow bg-transparent">
            <div>
                {/* Thumbnail Section with Rounded Corners */}
                <div className="relative aspect-video overflow-hidden rounded-lg">
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Video Details Section */}
                <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                        {/* Avatar */}

                        <Avatar className="h-9 w-9 rounded-full flex-shrink-0">
                            <AvatarImage src={video.user[0]?.avatar} alt={video.user[0]?.fullName} className="rounded-full h-9 w-9" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>


                        {/* Video Metadata */}
                        <div className="flex-1">
                            <h2 className="text-sm font-semibold line-clamp-2 leading-snug">
                                {video.title}
                            </h2>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {video.user[0]?.fullName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {`${video.views} views • ${age}`}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </div>
        </Card>
        </Link>
    )
}