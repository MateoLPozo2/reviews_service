import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Welcome to the Review Platform
      </h1>
      <p className="text-center mb-6 text-lg">
        Explore research insights and detailed analyses.
      </p>
      <Link
        href="/mlp/reviews/121/green-energy-impact"
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        View Green Energy Impact Review
      </Link>
    </div>
  );
}