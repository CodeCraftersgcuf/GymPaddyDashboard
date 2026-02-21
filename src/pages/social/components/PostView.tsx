import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { avatarUrl, storageUrl } from '../../../constants/help';

interface PostViewProps {
  post: {
    userAvatar?: string | null;
    username: string;
    location: string;
    timeAgo: string;
    content: string;
    likes: number;
    comments: number;
    shares: number;
    image?: string | null;
    isBoosted?: boolean;
  };
}

const PostView: React.FC<PostViewProps> = ({ post }) => {
  const resolvedImage = storageUrl(post.image);

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-3">
        <img
          src={avatarUrl(post.userAvatar, post.username)}
          alt={post.username}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold">{post.username}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{post.location}</span>
            <span>·</span>
            <span>{post.timeAgo}</span>
            {post.isBoosted && (
              <>
                <span>·</span>
                <span className="text-red-500">Sponsored</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 text-gray-600">
          <Heart size={24} /> {post.likes.toLocaleString()}
        </button>
        <button className="flex items-center gap-2 text-gray-600">
          <MessageCircle size={24} /> {post.comments.toLocaleString()}
        </button>
        <button className="flex items-center gap-2 text-gray-600">
          <Share2 size={24} /> {post.shares.toLocaleString()}
        </button>
      </div>

      <p className="text-gray-800">{post.content}</p>

      {resolvedImage && (
        <img
          src={resolvedImage}
          alt="Post"
          className="w-full rounded-xl"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      )}

      {!post.content && !resolvedImage && (
        <div className="text-center text-gray-400 py-8">No content available</div>
      )}
    </div>
  );
};

export default PostView;
