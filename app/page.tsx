export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="p-6 flex justify-between items-center bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">Softrar</h1>
        <div className="space-x-6 text-gray-600">
          <a href="#" className="hover:text-blue-600">Services</a>
          <a href="#" className="hover:text-blue-600">Projects</a>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">Contact Us</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
          Building Future-Ready <br /> <span className="text-blue-600">Software Solutions</span>
        </h2>
        <p className="text-gray-600 text-lg mb-10">
          Softrar - Your partner in digital transformation.
        </p>
        <button className="bg-gray-900 text-white px-8 py-3 rounded-xl font-semibold">
          View Our Work
        </button>
      </section>
    </main>
  );
}