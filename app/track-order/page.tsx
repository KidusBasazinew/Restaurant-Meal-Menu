"use client";
import { Clock, ChefHat, Utensils, CheckCircle2 } from "lucide-react";

export default function TrackOrder() {
  const steps = [
    {
      icon: <CheckCircle2 size={20} />,
      label: "Order Placed",
      status: "complete",
      time: "12:01 PM",
    },
    {
      icon: <ChefHat size={20} />,
      label: "Chef is Cooking",
      status: "current",
      time: "Active",
    },
    {
      icon: <Utensils size={20} />,
      label: "Coming to Table",
      status: "upcoming",
      time: "Est. 5m",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mt-10 mb-12 text-center">
        <div className="inline-flex p-4 rounded-full bg-green-50 mb-6">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(34,197,94,0.4)]">
            <Clock size={32} className="animate-spin-slow" />
          </div>
        </div>
        <h1 className="text-3xl font-black mb-2">Preparing...</h1>
        <p className="text-gray-400 font-medium">
          Your food will be at Table #12 soon
        </p>
      </div>

      {/* Progress Line */}
      <div className="space-y-10 relative before:absolute before:left-[27px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100 px-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-6 relative">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center z-10 shadow-sm border ${
                step.status === "complete"
                  ? "bg-green-500 text-white border-green-500"
                  : step.status === "current"
                    ? "bg-white text-black border-black shadow-xl scale-110"
                    : "bg-gray-50 text-gray-300 border-gray-100"
              }`}
            >
              {step.icon}
            </div>
            <div className="flex-1">
              <h4
                className={`font-bold ${step.status === "upcoming" ? "text-gray-300" : "text-black"}`}
              >
                {step.label}
              </h4>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                {step.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Entertainment / Cooking Tip Card */}
      <div className="mt-12 bg-orange-50 rounded-[2.5rem] p-6 border border-orange-100">
        <p className="text-orange-800 font-bold mb-2">Did you know?</p>
        <p className="text-orange-700/80 text-sm leading-relaxed">
          Our Chef uses hand-picked organic basil from the local market every
          morning to ensure that salad is extra fresh!
        </p>
      </div>
    </div>
  );
}
