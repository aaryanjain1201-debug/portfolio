import type { Metadata } from "next";
import { Inter, Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import { DataProvider } from "./providers";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Arihant Jain | AI Content Creator, 3D Artist & Motion Designer",
  description:
    "Creating cinematic 3D visuals, AI-powered commercials, motion graphics, and digital experiences that help brands stand out. Available for freelance projects worldwide.",
  keywords: [
    "3D artist",
    "motion designer",
    "AI content creator",
    "animation",
    "CGI",
    "Blender",
    "After Effects",
    "freelance animator",
    "product visualization",
    "architectural visualization",
    "motion graphics",
    "visual effects",
  ],
  authors: [{ name: "Arihant Jain" }],
  creator: "Arihant Jain",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arihantjain.dev",
    siteName: "Arihant Jain Portfolio",
    title: "Arihant Jain | AI Content Creator, 3D Artist & Motion Designer",
    description:
      "Creating cinematic 3D visuals, AI-powered commercials, motion graphics, and digital experiences that help brands stand out.",
    images: [
      {
        url: "https://cdnb.artstation.com/p/assets/images/images/099/825/317/large_square/arihant-jain-high-poly-bg-with-texture.jpg",
        width: 1200,
        height: 1200,
        alt: "Arihant Jain - AI Content Creator & 3D Artist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arihant Jain | AI Content Creator, 3D Artist & Motion Designer",
    description:
      "Creating cinematic 3D visuals, AI-powered commercials, motion graphics, and digital experiences.",
    images: ["https://cdnb.artstation.com/p/assets/images/images/099/825/317/large_square/arihant-jain-high-poly-bg-with-texture.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Arihant Jain",
    jobTitle: "AI Content Creator, 3D Artist & Motion Designer",
    url: "https://arihantjain.dev",
    email: "aj929360@gmail.com",
    sameAs: [
      "https://www.instagram.com/dream__animation/",
      "https://www.youtube.com/@Dreamanimationstudio-g3h",
      "https://arihantjain01.artstation.com",
    ],
    knowsAbout: [
      "3D Animation",
      "Motion Graphics",
      "AI Content Creation",
      "CGI Product Visualization",
      "Architectural Visualization",
      "Blender",
      "After Effects",
      "Cinema 4D",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Freelance 3D Artist & Motion Designer",
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${spaceMono.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
