import { GitHubUser } from "@shared/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, MapPin, Mail, Globe, Twitter, User } from "lucide-react";

interface UserProfileProps {
  user: GitHubUser;
}

export function UserProfile({ user }: UserProfileProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside className="w-full md:w-1/3 lg:w-1/4">
      <Card className="sticky top-4">
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <Avatar className="w-24 h-24 mb-4 border-2 border-border">
              <AvatarImage src={user.avatar_url} alt={`${user.name}'s avatar`} />
              <AvatarFallback>{getInitials(user.name || user.username)}</AvatarFallback>
            </Avatar>
            
            <h2 className="text-xl font-bold mb-1">{user.name}</h2>
            
            <a
              href={user.html_url}
              className="text-primary hover:underline mb-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              @{user.username}
            </a>
            
            {user.bio && (
              <p className="text-sm text-center mb-6 text-muted-foreground">
                {user.bio}
              </p>
            )}
            
            <div className="grid grid-cols-2 gap-4 w-full mb-6">
              <div className="flex flex-col items-center bg-muted dark:bg-muted/20 p-3 rounded-md">
                <span className="text-lg font-semibold">{user.public_repos}</span>
                <span className="text-xs text-muted-foreground">Repositories</span>
              </div>
              <div className="flex flex-col items-center bg-muted dark:bg-muted/20 p-3 rounded-md">
                <span className="text-lg font-semibold">{user.total_stars}</span>
                <span className="text-xs text-muted-foreground">Stars</span>
              </div>
              <div className="flex flex-col items-center bg-muted dark:bg-muted/20 p-3 rounded-md">
                <span className="text-lg font-semibold">{user.followers}</span>
                <span className="text-xs text-muted-foreground">Followers</span>
              </div>
              <div className="flex flex-col items-center bg-muted dark:bg-muted/20 p-3 rounded-md">
                <span className="text-lg font-semibold">{user.following}</span>
                <span className="text-xs text-muted-foreground">Following</span>
              </div>
            </div>
            
            <div className="w-full space-y-3">
              {user.company && (
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{user.company}</span>
                </div>
              )}
              
              {user.location && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{user.location}</span>
                </div>
              )}
              
              {user.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={`mailto:${user.email}`} 
                    className="text-primary hover:underline"
                  >
                    {user.email}
                  </a>
                </div>
              )}
              
              {user.blog && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline"
                  >
                    {user.blog.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
              
              {user.twitter_username && (
                <div className="flex items-center gap-2 text-sm">
                  <Twitter className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={`https://twitter.com/${user.twitter_username}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline"
                  >
                    @{user.twitter_username}
                  </a>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Joined {user.account_age_years} years ago</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
