import Link from 'next/link';

export default function OrderSuccessPage() {
  return (
    <div className="pt-24 pb-32 px-5 min-h-[calc(100vh-80px)] flex flex-col justify-center items-center">
      <div className="w-full max-w-[400px] glass-panel p-8 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-4xl text-secondary">
            check_circle
          </span>
        </div>
        <h1 className="text-3xl font-serif text-secondary mb-3">Order Confirmed</h1>
        <p className="text-on-surface-variant font-sans mb-8">
          Thank you for dining with L&apos;ÉLITE. Your exquisite meal is being prepared with the utmost care.
        </p>

        <div className="w-full space-y-4">
          <Link
            href="/track-order"
            className="w-full flex items-center justify-center gap-2 bg-secondary text-on-secondary px-6 py-4 rounded-xl font-medium tracking-wide hover:bg-secondary/90 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">location_on</span>
            Track Order
          </Link>
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 bg-surface-container border border-outline-variant text-primary px-6 py-4 rounded-xl font-medium tracking-wide hover:bg-surface-container-highest transition-colors"
          >
            <span className="material-symbols-outlined text-xl">restaurant_menu</span>
            Return to Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
