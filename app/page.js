'use client'

import { useState } from 'react'

export default function Home() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: query }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error(error)
      alert('Terjadi kesalahan saat memproses jawaban. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* HEADER UTAMA */}
      <header className="bg-nuGreen-700 border-b-4 border-nuGold-500 text-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo Sederhana Representasi Bola Dunia NU */}
            <div className="w-10 h-10 bg-white text-nuGreen-700 rounded-full flex items-center justify-center font-bold text-xl border-2 border-nuGold-500 shadow-inner">
              💚
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight md:text-xl">LBM NU AI</h1>
              <p className="text-xs text-nuGreen-100">Asisten Fiqih Aswaja & Verifikasi Kitab Salaf</p>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-xs bg-nuGreen-900 border border-nuGreen-600 px-3 py-1.5 rounded-full text-nuGold-400 font-semibold">
              Manhaj Madzhab Syafi'i
            </span>
          </div>
        </div>
      </header>

      {/* KONTEN UTAMA */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col gap-6">
        {/* FORM INPUT PERTANYAAN */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label htmlFor="question" className="font-semibold text-slate-700 text-sm">
              Ajukan Persoalan Fiqih Anda:
            </label>
            <div className="flex flex-col md:flex-row gap-2">
              <input
                id="question"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Contoh: Apakah sah kurban secara online?"
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-nuGreen-700 text-sm"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-nuGreen-700 hover:bg-nuGreen-800 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                    Bermusyawarah...
                  </>
                ) : (
                  'Tanyakan'
                )}
              </button>
            </div>
          </form>
        </section>

        {/* LOADING ANIMATION */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-nuGreen-700 border-t-transparent"></div>
            <p className="text-sm text-slate-500 animate-pulse">Menelusuri database LBM & merujuk kitab kuning...</p>
          </div>
        )}

        {/* HASIL LAPORAN BAHTSUL MASA'IL */}
        {result && (
          <article className="bg-white rounded-2xl shadow-md border-t-8 border-nuGreen-700 border-x border-b border-slate-200 overflow-hidden animate-fadeIn">
            <div className="p-6 md:p-8 flex flex-col gap-6">
              {/* Kop Laporan */}
              <div className="border-b pb-4 text-center">
                <h2 className="font-bold text-nuGreen-700 text-xl tracking-wide uppercase">
                  Laporan Hasil Bahtsul Masa'il
                </h2>
                <p className="text-xs text-slate-400 mt-1">Dihasilkan secara otomatis oleh LBM NU AI</p>
              </div>

              {/* Teks Hasil dari AI */}
              <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4 whitespace-pre-wrap">
                {result.answer}
              </div>
            </div>
          </article>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-6 text-center text-xs border-t border-slate-800">
        <p>© {new Date().getFullYear()} LBM NU AI. Dikembangkan secara nirlaba untuk kemaslahatan umat.</p>
        <p className="mt-1 text-slate-600">Web ringan • Tanpa iklan • Bebas biaya</p>
      </footer>
    </div>
  )
}
