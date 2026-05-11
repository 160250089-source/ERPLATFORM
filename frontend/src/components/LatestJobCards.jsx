import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="flex flex-col p-6 rounded-2xl glass-card cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full min-h-[250px]"
    >
     <div className="flex items-center gap-4 mb-4">
    {/* Left side: Logo */}
    <Avatar className="h-16 w-16 rounded-full overflow-hidden">
        <AvatarImage src={job?.company?.logo} alt={job?.company?.name} className="object-cover h-full w-full" />
    </Avatar>

    {/* Right side: Company Name and Country */}
    <div>
        <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 tracking-wide">
            {job?.company?.name}
        </h2>
        <p className="text-sm text-gray-500">{job?.company?.country || "India"}</p>
    </div>
</div>

      <div className="mb-5">
        <h1 className="font-extrabold text-xl mb-2 text-gray-900 dark:text-white tracking-tight leading-snug">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {job?.description}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-auto pt-4">
        <Badge className="px-3 py-1 text-xs bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 border-none shadow-none font-semibold">
          {job?.position} Positions
        </Badge>
        <Badge className="px-3 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 border-none shadow-none font-semibold">
          {job?.jobType}
        </Badge>
        <Badge className="px-3 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 border-none shadow-none font-semibold">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
