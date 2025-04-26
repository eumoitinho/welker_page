// API para Instagram
import { cache } from "react"

export interface InstagramPost {
  id: string
  mediaUrl: string
  permalink: string
  caption: string
  timestamp: string
  likes: number
  comments: number
}

// Esta função seria substituída pela implementação real da API do Instagram
// usando o Instagram Graph API ou Basic Display API
export const getInstagramPosts = cache(async (username: string): Promise<InstagramPost[]> => {
  // Em um ambiente de produção, você usaria:
  // 1. Instagram Graph API (para contas business/creator)
  // 2. Instagram Basic Display API (para contas pessoais)

  // Exemplo de como seria a implementação real:
  /*
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;
  
  const response = await fetch(
    `https://graph.instagram.com/${userId}/media?fields=id,caption,media_url,permalink,timestamp,like_count,comments_count&access_token=${accessToken}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch Instagram posts');
  }
  
  const data = await response.json();
  
  return data.data.map((post: any) => ({
    id: post.id,
    mediaUrl: post.media_url,
    permalink: post.permalink,
    caption: post.caption || '',
    timestamp: post.timestamp,
    likes: post.like_count || 0,
    comments: post.comments_count || 0,
  }));
  */

  // Para fins de demonstração, retornamos dados simulados
  // Estes seriam substituídos pelos dados reais da API
  const mockPosts: InstagramPost[] = [
    {
      id: "1",
      mediaUrl: "https://i.imgur.com/JR8ilLU.jpg",
      permalink: "https://instagram.com/p/123456",
      caption: "New release coming soon! Stay tuned. #music #producer #techno",
      timestamp: "2023-04-15T12:00:00Z",
      likes: 1245,
      comments: 32,
    },
    {
      id: "2",
      mediaUrl: "https://i.imgur.com/dMYxbcL.jpg",
      permalink: "https://instagram.com/p/234567",
      caption: "Live at Ultra Music Festival. What a night! #festival #dj #live",
      timestamp: "2023-04-10T18:30:00Z",
      likes: 2389,
      comments: 78,
    },
    {
      id: "3",
      mediaUrl: "https://i.imgur.com/pHZaYGE.jpg",
      permalink: "https://instagram.com/p/345678",
      caption: "Studio session with @producer. New collab in the works! #studio #collab #newmusic",
      timestamp: "2023-04-05T15:45:00Z",
      likes: 1876,
      comments: 45,
    },
    {
      id: "4",
      mediaUrl: "https://i.imgur.com/KvtGxWM.jpg",
      permalink: "https://instagram.com/p/456789",
      caption: "Just announced! New tour dates coming soon. #tour #livemusic #announcement",
      timestamp: "2023-04-01T09:15:00Z",
      likes: 3102,
      comments: 124,
    },
    {
      id: "5",
      mediaUrl: "https://i.imgur.com/8LpOSUZ.jpg",
      permalink: "https://instagram.com/p/567890",
      caption: "Behind the scenes from the new music video. #behindthescenes #musicvideo #comingsoon",
      timestamp: "2023-03-28T14:20:00Z",
      likes: 1543,
      comments: 67,
    },
    {
      id: "6",
      mediaUrl: "https://i.imgur.com/YqTGkHB.jpg",
      permalink: "https://instagram.com/p/678901",
      caption: "Thank you for an amazing night, New York! #nyc #concert #thankyou",
      timestamp: "2023-03-25T23:10:00Z",
      likes: 2765,
      comments: 98,
    },
  ]

  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 500))

  return mockPosts
})
