"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const features = [
    {
      title: "🎨 Design System",
      description: "UI Kit lengkap dengan atom komponten yang reusable dan type-safe",
    },
    {
      title: "🎯 Modern Stack",
      description: "Next.js 16, React 19, TypeScript, Tailwind CSS v4",
    },
    {
      title: "🌓 Dark Mode",
      description: "Full dark mode support dengan context management",
    },
    {
      title: "📱 Responsive",
      description: "Mobile-first design dengan breakpoint utilities",
    },
    {
      title: "🧩 Advanced Components",
      description: "Modal, Dropdown, Toast notifications, dan lebih banyak",
    },
    {
      title: "⚡ Utilities & Hooks",
      description: "Format functions, validation, custom hooks yang berguna",
    },
  ];

  const stats = [
    { label: "Components", value: "12+" },
    { label: "Hooks", value: "6+" },
    { label: "Utilities", value: "15+" },
    { label: "TypeScript", value: "100%" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-zinc-50 dark:to-zinc-900">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-2">
            <Badge variant="info">Version 2.0</Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Next.js Frontend
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Boilerplate Lv2
              </span>
            </h1>
          </div>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Boilerplate Next.js modern dengan design system lengkap, komponen
            reusable, dan best practices untuk tim kecil
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-6">
            <Link href="/showcase">
              <Button size="lg" variant="primary">
                Lihat Showcase →
              </Button>
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="secondary">
                View on GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 border-t border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {stat.value}
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Features & Fitur Unggulan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} variant="bordered">
                <CardHeader>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-4 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Tech Stack</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Next.js 16",
              "React 19",
              "TypeScript",
              "Tailwind CSS v4",
              "ESLint",
              "React Hooks",
            ].map((tech) => (
              <Badge key={tech} variant="secondary" size="lg">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Siap memulai?</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Eksplorasi semua komponen dan fitur yang tersedia dalam showcase interaktif
          </p>
          <Link href="/showcase">
            <Button size="lg" variant="primary">
              Buka Showcase Lengkap →
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}