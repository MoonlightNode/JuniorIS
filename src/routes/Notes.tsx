import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'

export default function Notes() {
  const [notes, setNotes] = useState<string[]>([])
  const [txt, setTxt] = useState('')

  useEffect(() => { setNotes(JSON.parse(localStorage.getItem('notes') || '[]')) }, [])
  const save = () => { const next = [...notes, txt]; localStorage.setItem('notes', JSON.stringify(next)); setNotes(next); setTxt('') }

  return (
    <div className="min-h-screen bg-pastelGreen-100">
      <Navbar />
      <main className="p-6 max-w-md mx-auto bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">My Notes</h2>
        <textarea value={txt} onChange={e => setTxt(e.target.value)} className="w-full p-2 border rounded h-24 mb-2" />
        <button onClick={save} className="bg-green-500 text-white px-4 py-2 rounded">Save Note</button>
        <ul className="mt-4 space-y-2">
          {notes.map((n, i) => <li key={i} className="p-2 border rounded">{n}</li>)}
        </ul>
      </main>
    </div>
  )
}