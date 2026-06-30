"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Sparkles, Zap, Crown } from "lucide-react";

interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

const addOns: AddOn[] = [
  { id: "rush", name: "Rush Delivery (48h)", price: 150, description: "Get your project in 48 hours" },
  { id: "source", name: "Source Files", price: 200, description: "Editable project files included" },
  { id: "revisions", name: "Extra Revisions", price: 100, description: "3 additional revision rounds" },
  { id: "voiceover", name: "Voiceover", price: 150, description: "Professional voiceover in English/Hindi" },
];

const plans = [
  {
    name: "Starter",
    tagline: "Perfect for small projects",
    price: 499,
    icon: Zap,
    color: "from-accent-400 to-highlight",
    features: [
      "Up to 15-second animation",
      "Basic 3D modeling",
      "2 revision rounds",
      "7-day delivery",
      "HD 1080p output",
      "Commercial license",
    ],
  },
  {
    name: "Professional",
    tagline: "Most popular for brands",
    price: 1499,
    icon: Sparkles,
    color: "from-accent to-accent-400",
    popular: true,
    features: [
      "Up to 60-second animation",
      "Advanced 3D + CGI",
      "4 revision rounds",
      "5-day delivery",
      "4K output",
      "Commercial license",
      "Storyboard included",
      "Sound design",
    ],
  },
  {
    name: "Enterprise",
    tagline: "For large-scale productions",
    price: 4999,
    icon: Crown,
    color: "from-highlight to-accent-300",
    features: [
      "Unlimited duration",
      "Full 3D + AI pipeline",
      "Unlimited revisions",
      "Priority 3-day delivery",
      "8K + RAW output",
      "Full ownership rights",
      "Storyboards + scripts",
      "Dedicated project manager",
      "Post-launch support",
    ],
  },
];

function PriceCard({ plan, index }: { plan: (typeof plans)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = plan.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl border p-8 transition-all duration-500 ${
        plan.popular
          ? "border-accent/30 bg-card shadow-[0_0_60px_rgba(124,58,237,0.12)] scale-[1.02] lg:scale-105"
          : "border-white/[0.06] bg-card/70 hover:border-white/10"
      }`}
    >
      {plan.popular && (
        <div className="absolute -right-12 top-6 rotate-45 bg-accent px-10 py-1 text-[10px] font-bold text-white">
          POPULAR
        </div>
      )}
      <div className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${plan.color} opacity-10 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-20`} />
      <div className="relative z-10">
        <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${plan.color} text-white`}>
          <Icon size={26} />
        </div>
        <h3 className="font-heading text-2xl font-bold">{plan.name}</h3>
        <p className="mt-1 text-sm text-white/35">{plan.tagline}</p>
        <div className="mt-6 flex items-baseline gap-1">
          <span className="text-sm text-white/35">$</span>
          <span className="font-heading text-5xl font-bold text-highlight">{plan.price.toLocaleString()}</span>
          <span className="text-sm text-white/35">/project</span>
        </div>
        <ul className="mt-8 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-white/50">
              <Check size={16} className="mt-0.5 shrink-0 text-accent-400" />
              {feature}
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className={`mt-8 block rounded-full py-3.5 text-center text-sm font-bold transition-all duration-300 ${
            plan.popular
              ? "bg-accent text-white hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
              : "bg-white/5 text-white hover:bg-white/10"
          }`}
        >
          Get Started
        </a>
      </div>
    </motion.div>
  );
}

export function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const toggleAddOn = (id: string) =>
    setSelectedAddOns((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));

  const totalAddOns = addOns.filter((a) => selectedAddOns.includes(a.id)).reduce((sum, a) => sum + a.price, 0);

  return (
    <section id="pricing" className="relative px-6 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/3 blur-[150px]" />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-accent-400">Investment</p>
          <h2 className="mb-4 font-heading text-3xl font-light tracking-[0.1em] sm:text-5xl">Pricing</h2>
          <p className="mx-auto max-w-2xl text-sm text-white/40">Transparent pricing. No hidden fees. Custom quotes for complex projects.</p>
          <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-accent to-transparent" />
        </motion.div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <PriceCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-16 rounded-2xl border border-white/[0.06] bg-card/70 p-8"
        >
          <h3 className="font-heading text-xl font-bold">Add-ons</h3>
          <p className="mt-1 text-sm text-white/35">Enhance any plan with premium add-ons</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {addOns.map((addon) => (
              <button
                key={addon.id}
                onClick={() => toggleAddOn(addon.id)}
                className={`rounded-xl border p-4 text-left transition-all duration-300 ${
                  selectedAddOns.includes(addon.id)
                    ? "border-accent/40 bg-accent/5 shadow-[0_0_20px_rgba(124,58,237,0.1)]"
                    : "border-white/[0.06] bg-white/[0.02] hover:border-white/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">{addon.name}</span>
                  <span className="text-sm font-bold text-highlight">+${addon.price}</span>
                </div>
                <p className="mt-1 text-xs text-white/35">{addon.description}</p>
              </button>
            ))}
          </div>
          {selectedAddOns.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 flex items-center justify-between rounded-xl border border-accent/20 bg-accent/5 p-4"
            >
              <span className="text-sm text-white/50">{selectedAddOns.length} add-on{selectedAddOns.length > 1 ? "s" : ""} selected</span>
              <span className="font-heading text-lg font-bold text-highlight">+${totalAddOns.toLocaleString()}</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
