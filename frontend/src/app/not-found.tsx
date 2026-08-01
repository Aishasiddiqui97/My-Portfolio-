import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0B1F] via-[#1A1333] to-[#0F0B1F] text-[#F8F7FF] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-6xl font-bold bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] bg-clip-text text-transparent mb-4">
          404
        </p>
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Page not found</h1>
        <p className="text-[#A09FC0] mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-[#00E5C4] to-[#D4A24C] text-[#0F0B1F] font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
