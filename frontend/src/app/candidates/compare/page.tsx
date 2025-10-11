"use client";

import React, { useEffect, useState } from "react";

export default function CompareCandidatesPage() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [leftId, setLeftId] = useState<any>(null);
  const [rightId, setRightId] = useState<any>(null);

  useEffect(() => {
    // Dummy data to simulate API candidates
    const dummyData = [
      {
        id: 1,
        name: "Sita Sharma",
        nationalId: "NP123456",
        district: "Kathmandu",
        municipality: "KMC Ward 5",
        post: "Mayor",
        party: "Nepal Congress",
        image: "https://i.pravatar.cc/150?img=1",
        manifesto:
          "Focus on improving local infrastructure, clean water, and waste management.",
      },
      {
        id: 2,
        name: "Ram Prasad Oli",
        nationalId: "NP654321",
        district: "Kathmandu",
        municipality: "KMC Ward 5",
        post: "Mayor",
        party: "CPN-UML",
        image: "https://i.pravatar.cc/150?img=2",
        manifesto:
          "Promote digital governance, expand green spaces, and improve traffic systems.",
      },
      {
        id: 3,
        name: "Asha Karki",
        nationalId: "NP789101",
        district: "Lalitpur",
        municipality: "Lalitpur Sub-Metropolitan",
        post: "Deputy Mayor",
        party: "Rastriya Swatantra Party",
        image: "https://i.pravatar.cc/150?img=3",
        manifesto:
          "Encourage youth participation, women empowerment, and local entrepreneurship.",
      },
    ];

    // Simulate delay
    setTimeout(() => {
      setCandidates(dummyData);
      setLeftId(dummyData[0].id);
      setRightId(dummyData[1].id);
      setLoading(false);
    }, 500);
  }, []);

  const findCandidate = (id: any) => candidates.find((c) => c.id == id);
  const left = findCandidate(leftId);
  const right = findCandidate(rightId);

  const different = (a: any, b: any) => {
    if (a === undefined && b === undefined) return false;
    if (a === null && b === null) return false;
    if (a === b) return false;
    try {
      const sa = typeof a === "object" ? JSON.stringify(a) : String(a ?? "");
      const sb = typeof b === "object" ? JSON.stringify(b) : String(b ?? "");
      return sa !== sb;
    } catch {
      return String(a) !== String(b);
    }
  };

  if (loading) return <div className="p-6">Loading candidates...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Compare Candidates</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2 bg-white p-4 rounded-2xl shadow-sm">
          <p className="text-sm text-gray-600 mb-2">
            Choose two candidates to compare side-by-side.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Left candidate
              </label>
              <select
                value={leftId ?? ""}
                onChange={(e) => setLeftId(e.target.value)}
                className="w-full border rounded p-2"
              >
                {candidates.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.party}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Right candidate
              </label>
              <select
                value={rightId ?? ""}
                onChange={(e) => setRightId(e.target.value)}
                className="w-full border rounded p-2"
              >
                {candidates.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.party}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <p className="text-sm text-gray-600">Quick stats</p>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-700">Total candidates</span>
              <span className="font-semibold">{candidates.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-700">Selected</span>
              <span className="font-semibold">
                {left?.name ?? "—"} vs {right?.name ?? "—"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison area */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left card */}
          <div className="col-span-1">
            {left ? (
              <CandidateCard candidate={left} />
            ) : (
              <div className="p-6 text-gray-500">No left candidate selected</div>
            )}
          </div>

          {/* Comparison table */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-3 text-center">
              Field-by-field
            </h3>
            <div className="divide-y rounded border">
              <ComparisonRow
                label="Name"
                a={left?.name}
                b={right?.name}
                different={different(left?.name, right?.name)}
              />
              <ComparisonRow
                label="Party"
                a={left?.party}
                b={right?.party}
                different={different(left?.party, right?.party)}
              />
              <ComparisonRow
                label="National ID"
                a={left?.nationalId}
                b={right?.nationalId}
                different={different(left?.nationalId, right?.nationalId)}
              />
              <ComparisonRow
                label="Post"
                a={left?.post}
                b={right?.post}
                different={different(left?.post, right?.post)}
              />
              <ComparisonRow
                label="District"
                a={left?.district}
                b={right?.district}
                different={different(left?.district, right?.district)}
              />
              <ComparisonRow
                label="Municipality"
                a={left?.municipality}
                b={right?.municipality}
                different={different(left?.municipality, right?.municipality)}
              />
              <ComparisonRow
                label="Manifesto"
                a={left?.manifesto}
                b={right?.manifesto}
                different={different(left?.manifesto, right?.manifesto)}
                isLong
              />
              <ComparisonRow
                label="Image"
                a={!!left?.image}
                b={!!right?.image}
                different={different(!!left?.image, !!right?.image)}
                renderImage
                aImage={left?.image}
                bImage={right?.image}
              />
            </div>
          </div>

          {/* Right card */}
          <div className="col-span-1">
            {right ? (
              <CandidateCard candidate={right} rightSide />
            ) : (
              <div className="p-6 text-gray-500">No right candidate selected</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CandidateCard({ candidate, rightSide = false }) {
  return (
    <div
      className={`p-4 rounded-xl border ${
        rightSide ? "text-right" : "text-left"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-20 h-20 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
          {candidate.image ? (
            <img
              src={candidate.image}
              alt={candidate.name}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="text-sm text-gray-500">No image</div>
          )}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-lg">{candidate.name}</div>
          <div className="text-sm text-gray-600">{candidate.party}</div>
          <div className="text-xs text-gray-500 mt-1">
            ID: {candidate.nationalId ?? "—"}
          </div>
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-700 space-y-1">
        <div>
          <strong>Post:</strong> {candidate.post ?? "—"}
        </div>
        <div>
          <strong>District:</strong> {candidate.district ?? "—"}
        </div>
        <div>
          <strong>Municipality:</strong> {candidate.municipality ?? "—"}
        </div>
      </div>

      {candidate.manifesto && (
        <div className="mt-3 text-sm text-gray-600">
          <div className="font-medium">Manifesto</div>
          <p className="text-sm mt-1 line-clamp-4">{candidate.manifesto}</p>
        </div>
      )}
    </div>
  );
}

function ComparisonRow({
  label,
  a,
  b,
  different,
  isLong = false,
  renderImage = false,
  aImage,
  bImage,
}) {
  const base = "px-4 py-3 grid grid-cols-3 items-center";
  return (
    <div className={`${base} ${different ? "bg-yellow-50" : "bg-white"}`}>
      <div className="text-sm font-medium text-gray-700">{label}</div>
      <div className="col-span-2 grid grid-cols-2 gap-4">
        <div className="text-sm text-gray-800 break-words">
          {renderImage ? (
            aImage ? (
              <img
                src={aImage}
                alt="left"
                className="w-full h-24 object-cover rounded"
              />
            ) : (
              <span className="text-gray-400">No image</span>
            )
          ) : isLong ? (
            <div className="text-sm text-gray-700 whitespace-pre-wrap">
              {a ?? "—"}
            </div>
          ) : (
            <div>{a ?? "—"}</div>
          )}
        </div>
        <div className="text-sm text-gray-800 break-words">
          {renderImage ? (
            bImage ? (
              <img
                src={bImage}
                alt="right"
                className="w-full h-24 object-cover rounded"
              />
            ) : (
              <span className="text-gray-400">No image</span>
            )
          ) : isLong ? (
            <div className="text-sm text-gray-700 whitespace-pre-wrap">
              {b ?? "—"}
            </div>
          ) : (
            <div>{b ?? "—"}</div>
          )}
        </div>
      </div>
    </div>
  );
}
