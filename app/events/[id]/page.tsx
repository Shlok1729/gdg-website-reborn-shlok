import { NeuralBackground } from "@/app/components/NeuralBackground-Red";
import { events } from "../../data/events-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import React from "react";
import { Calendar, MapPin, Tag, ArrowLeft } from "lucide-react"; // Optional: npm install lucide-react
import Carousel from "@/app/components/Carousel";
interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  const event = events.find((e) => e.id === id);

  if (!event) return notFound();
  const photos = [
    "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=1000",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000",
    "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000",
  ];
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white relative">
      <NeuralBackground />

      {/* Navigation */}
      <nav className="relative z-10 p-6 max-w-7xl mx-auto">
        <Link
          href="/events"
          className="inline-flex items-center text-sm text-gray-400 hover:text-red-500 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Events
        </Link>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-24">
        {/* Hero Section */}
        <div className="relative h-[400px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-12">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />

          <div className="absolute bottom-0 left-0 p-8 md:p-12">
            <span className="inline-block px-3 py-1 rounded-full bg-red-600 text-xs font-bold uppercase tracking-wider mb-4">
              {event.year} Event
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              {event.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl font-light">
              {event.description}
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main Details */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="w-8 h-[2px] bg-red-600 mr-4"></span>
                About the Event
              </h2>
              <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed text-lg">
                <p>{event.details}</p>
              </div>
            </section>

            <section className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 text-red-500">Key Highlights</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Expert Speakers", "Hands-on Workshops", "Networking", "Certifications"].map((item) => (
                  <li key={item} className="flex items-center text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-white/10">
              <h3 className="text-sm font-uppercase tracking-widest text-gray-500 mb-6 uppercase">Event Info</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-red-500 mt-1 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-red-500 mt-1 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">Virtual / Global</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Tag className="w-5 h-5 text-red-500 mt-1 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">Technology & Innovation</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-red-600/20">
                Register Interest
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen w-full flex flex-col items-center justify-center px-10">
        <h2 className="text-4xl text-white font-bold mb-10">Event Highlights</h2>
        <Carousel images={photos} />
      </div>
    </main>
  );
}