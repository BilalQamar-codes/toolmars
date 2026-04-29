// constants/extensions.js
import { Video, MousePointer2, Link2 } from "lucide-react";

export const myExtensions = [
  {
    title: "Velo Screen Recorder",
    description: "Capture high-quality 2K video and audio directly from your browser tabs.",
    icon: <Video className="w-6 h-6 text-purple-600" />,
    version: "1.0",
    bg: "bg-purple-50",
    link: "https://chromewebstore.google.com/detail/jeidiljfhdalmjpddoenjnfmlgfkbecf"
  },
  {
    title: "Auto Scroll Controller",
    description: "Enjoy a hands-free reading experience with customizable automated scrolling.",
    icon: <MousePointer2 className="w-6 h-6 text-blue-600" />,
    version: "1.0.6",
    bg: "bg-blue-50",
    link: "https://chromewebstore.google.com/detail/bnabcjahphengpbffokekcjpjcdhohne?utm_source=item-share-cb"
  },
  {
    title: "Slug Generator",
    description: "Convert titles into SEO-friendly URL slugs instantly with one click.",
    icon: <Link2 className="w-6 h-6 text-emerald-600" />,
    version: "1.0",
    bg: "bg-emerald-50",
    link: "https://chromewebstore.google.com/detail/lfnconphjmikgmehdpbdcgcloginoaop?utm_source=item-share-cb"
  }
];