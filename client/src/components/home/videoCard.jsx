import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";
import { formatViews, calculateAge } from "@/conf/config";

export default function VideoCard({ video }) {
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
                                {`${formatViews(video.views)} • ${calculateAge(video.createdAt)}`}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </div>
        </Card>
        </Link>
    )
}