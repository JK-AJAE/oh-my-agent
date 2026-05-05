'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ClassroomStudent {
  id: string;
  name: string;
  avatar: string;
  projectCount: number;
  lastActive: string;
}

const REFLECTION_PROMPTS = [
  'Build a world that shows how you feel today',
  'Create a habitat for an imaginary creature',
  'Build your dream playground',
  'Make a world from your favorite book',
] as const;

const SAMPLE_STUDENTS: ClassroomStudent[] = [
  { id: '1', name: 'Luna', avatar: '🦊', projectCount: 3, lastActive: 'Today'     },
  { id: '2', name: 'Max',  avatar: '🐼', projectCount: 5, lastActive: 'Today'     },
  { id: '3', name: 'Kai',  avatar: '🐙', projectCount: 2, lastActive: 'Yesterday' },
  { id: '4', name: 'Zara', avatar: '🦄', projectCount: 4, lastActive: 'Today'     },
];

export default function TeacherDashboard() {
  const [classCode]  = useState('SPARK-2024');
  const [students]   = useState<ClassroomStudent[]>(SAMPLE_STUDENTS);

  const totalWorlds  = students.reduce((sum, s) => sum + s.projectCount, 0);
  const activeToday  = students.filter((s) => s.lastActive === 'Today').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link
            href="/"
            className="text-xl font-extrabold text-spark-500 hover:opacity-80 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-300 rounded"
            aria-label="Worldcraft home"
          >
            Worldcraft <span aria-hidden="true">✨</span>
          </Link>
          <span
            className="px-2 py-0.5 bg-magic-400 text-white text-xs font-bold rounded"
            aria-label="Teacher account"
          >
            TEACHER
          </span>
          <div className="flex-1" />
          <span className="text-sm text-gray-500">Ms. Park</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Page title + class code */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">My Classroom</h1>
            <p className="text-gray-500 mt-0.5">Creative Explorers &bull; Grade 3</p>
          </div>
          <div className="px-4 py-2 bg-white rounded-xl border text-center shadow-sm">
            <p className="text-xs text-gray-500 font-medium">Class Code</p>
            <p
              className="text-lg font-mono font-bold text-spark-500"
              aria-label={`Class code: ${classCode}`}
            >
              {classCode}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
          aria-label="Classroom statistics"
        >
          <div className="bg-white rounded-xl p-5 border shadow-sm">
            <p className="text-3xl font-extrabold text-ocean-500" aria-label={`${students.length} students`}>
              {students.length}
            </p>
            <p className="text-sm text-gray-500 mt-0.5">Students</p>
          </div>
          <div className="bg-white rounded-xl p-5 border shadow-sm">
            <p className="text-3xl font-extrabold text-forest-500" aria-label={`${totalWorlds} worlds created`}>
              {totalWorlds}
            </p>
            <p className="text-sm text-gray-500 mt-0.5">Worlds Created</p>
          </div>
          <div className="bg-white rounded-xl p-5 border shadow-sm">
            <p className="text-3xl font-extrabold text-magic-500" aria-label={`${activeToday} active today`}>
              {activeToday}
            </p>
            <p className="text-sm text-gray-500 mt-0.5">Active Today</p>
          </div>
        </div>

        {/* Students table */}
        <section
          className="bg-white rounded-xl border overflow-hidden shadow-sm mb-8"
          aria-labelledby="students-heading"
        >
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <h2 id="students-heading" className="font-bold text-lg text-gray-900">
              Students
            </h2>
            <button
              className="px-3 py-1.5 bg-spark-400 text-white rounded-lg text-sm font-bold hover:bg-spark-500 hover:scale-105 transition-all duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-spark-300"
              type="button"
              aria-label="Assign a new challenge to the class"
            >
              + Assign Challenge
            </button>
          </div>

          <ul className="divide-y" aria-label="Student list">
            {students.map((student) => (
              <li
                key={student.id}
                className="px-5 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
              >
                <span className="text-2xl" aria-hidden="true">{student.avatar}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{student.name}</p>
                  <p className="text-xs text-gray-400">Last active: {student.lastActive}</p>
                </div>
                <div className="text-center min-w-[3rem]">
                  <p className="font-bold text-lg text-gray-900">{student.projectCount}</p>
                  <p className="text-xs text-gray-400">Worlds</p>
                </div>
                <button
                  type="button"
                  className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-300"
                  aria-label={`View ${student.name}'s worlds`}
                >
                  View Worlds
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Reflection prompts */}
        <section
          className="bg-white rounded-xl border p-5 shadow-sm"
          aria-labelledby="prompts-heading"
        >
          <h2 id="prompts-heading" className="font-bold text-lg text-gray-900 mb-2">
            Reflection Prompts
          </h2>
          <p className="text-gray-500 text-sm mb-4">Send a prompt to all students:</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {REFLECTION_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="p-3 text-left bg-spark-50 rounded-xl hover:bg-spark-100 transition-colors text-sm text-gray-700 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-300"
                aria-label={`Send prompt: ${prompt}`}
              >
                {prompt}
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
