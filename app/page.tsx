export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          BidragsGuiden
        </h1>
        <p className="text-lg text-gray-600">
          Hitta alla offentliga bidrag, stöd och ersättningar du har rätt till – på ett ställe.
        </p>
        <div className="pt-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition">
            Kom igång snart
          </button>
        </div>
      </div>
    </main>
  );
}