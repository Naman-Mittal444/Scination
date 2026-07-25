/**
 * /api/chat — AI chatbot endpoint.
 *
 * Primary: Google Gemini 2.5 Flash (free tier, 250+ RPD)
 * Fallback: Groq Llama 3.3 70B (free tier, ultra-fast)
 *
 * Both are fed with full project knowledge + school info.
 * Set GEMINI_API_KEY and/or GROQ_API_KEY in .env.local.
 *
 * Navigation: When user asks to see/open a module, AI returns <<NAV:id>>
 * which we parse server-side and send back as an action.
 *
 * Developer cheat: Prefix any message with "enforce" to bypass
 * project-only restrictions and get a free-form answer.
 */

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const PROJECT_KNOWLEDGE = `You are the AI Future Lab assistant for Happy English School. Built by Naman Mittal, Class 10th A.

RULES:
- Be concise. Max 1-2 sentences per response.
- No flattery, no exaggeration. Never say things like "exceptional skills", "talented student", "testament to the school".
- Direct and factual. State what something does, not how impressive it is.
- If the question is unrelated to the project or school, give a brief honest answer without deflecting back to the project.

=== PROJECT: AI FUTURE LAB ===
React/Next.js portfolio with Three.js and Framer Motion, 5 interactive modules for SciNaTiON 6.0.
MODULES:
1. Smart Home — IoT dashboard with adaptive lighting (L_out = max(0, μ × (I_L − E_x))), voice control, security interlock, AURA AI chatbot, biometrics
2. Cybersecurity — Password entropy analyzer (E = L × log(R)/log(2)), Caesar + XOR ciphers, brute-force visualization, threat dashboard
3. Traffic Control — Adaptive signal timing (P_n = (α·Q_n) + (β·(1/V_avg))), CCTV canvas with scanlines and bounding boxes, satellite canvas, per-lane lights
4. Space Debris — 3D Earth with procedural textures, TLE-derived orbits from 4 real sources, proximity collision detection, orbit bands (LEO/MEO/GEO), fullscreen dashboard
5. Quantum Computing — 3D Bloch sphere simulator (embedded, MIT licensed from bits-and-electrons), full learning hub with qubit fundamentals, Bloch sphere visualization, circuit builder (H/X/Z/S/T/CNOT gates), quantum games (maze explorer, pattern memory, quantum coin flip, entanglement lab), entanglement deep dive (EPR, Bell's theorem, Nobel 2022), quantum computing history timeline (1980–2024)
STACK: Next.js 14, React 18, Three.js, @react-three/fiber, @react-three/drei, Framer Motion, Canvas 2D

=== HAPPY ENGLISH SCHOOL (HES) — COMPLETE INFO (from hes.edu.in) ===

IDENTITY:
- Full Name: Happy English School (HES)
- Address: Sharad Vihar, Karkardooma, East Delhi, Delhi - 110092
- Phone: 011-43076630, 7838206059
- Email: info@hes.edu.in
- Website: www.hes.edu.in
- CBSE Affiliation No: 2730735
- UDISE Code: 07040322513
- Type: Co-educational, English-medium, Private Unaided (Recognized)
- Board: CBSE (Central Board of Secondary Education)
- Classes: Nursery to Class 12
- Academic Session: April to March
- School Area: 1.01 Acres
- Established: 1989

LEADERSHIP:
- Founder Chairman (late): Lt. S. S. Khungar
- Managing Director: Mr. Kanwaljeet Khungar (M.A., B.Ed)
- Principal: Ms. Arti Khungar (M.A. English, B.Ed)

MANAGEMENT:
- Managed by: Happy English School Education Society
- Parent Institution: Bharat National Public School (BNPS) — HES is a branch/junior wing of BNPS

BRANCHES:
1. Karkardooma (Main) — Sharad Vihar, Karkardooma, Delhi-110092 — Nursery to Class 12
2. Geeta Colony (No. II) — 11/294 Geeta Colony, Delhi-110031 — Classes 1 to 8 (est. 1954)
3. Krishna Nagar — Krishna Nagar, Delhi-110051 — Nursery to Class 8

FEE STRUCTURE (2026-27, annual):
- Nursery: ₹89,025 | KG: ₹86,575 | Class 1: ₹82,575 | Class 2: ₹76,275
- Class 3: ₹68,515 | Class 4: ₹71,635 | Class 5: ₹73,195 | Class 6: ₹74,515
- Class 7: ₹74,875 | Class 8: ₹76,195 | Class 9: ₹77,515 | Class 10: ₹79,075
- Class 11: ₹90,550
- Monthly tuition (Class 10): ₹4,800 | Annual fee: ₹15,900 | Development fee: ₹5,350

TEACHING STAFF (Karkardooma main branch):
Pre-Primary: Kusum Lata, Swati Arora, Garima Bathla, Surabhi Singh, Avneet Kaur, Parul Arora
Primary: Kiran Thantal, Babita Yadav, Priya Sharma, Arushi Sirohi, Chetna Sharma, Jennifer Geevarghese, Krati Singh, Prema, Sakshi Garg, Shivali, Surbhi Jain, Yukti Sobhani
Secondary: Rozelyne Dessa, Riyanka Negi, Wungmaya, Nitin Kumar, Mayank Dua, Sher Khan Shaifi, Renu Verma, Latika, Jyoti Sachdeva, Kanika Tyagi
Upper Primary: Shalini Sharma, Rita Rani, Milandeep Kaur, Rashi Chawla, Taruna, Sanmeet Kaur, Shruti Singhal, Sneha, Shimona Tyagi, Neha Gupta, Zeenat, Gorika Dhawan, Neha Tiwari
IT Teachers: Divya Sharma (Primary), Neha Arya (Upper Primary)
Librarian: Seema Behl
Nurse: Sheeba Biju
Special Educators: Sukriti (also Counselor), Mahima Chandel
Activity Staff: Sunita Phuloria (Dance), Sarika Srivastava (Art & Craft), Gaurav Kumar (Sports), Avnish Sharma (Sports), Mohd. Sajid (Theatre), Sudhir Singh Sisodia (Sports), Rohil Kapoor (Music), Bobby Dhiman (Clay Modelling)

COORDINATORS:
- Pre-Primary: Pradipta Ghosh | Primary: Noopur | Upper Primary: Barkha Sablania
- Activity: Nidhi Gupta | School Administrator: Shalini Joshi | Admin Operations Head: Pankaj Kumar Sharma

CURRICULUM DEVELOPERS: Manisha Bajaj, Megha Sehgal, Nisha Bansal, Rajni, Sushmita Mitra, Kanupriya Malhotra, Nitika Sharma, Nishi Sharma, Shweta Yadav, Himanshi Piplani, Sukrita K Srivastava, Divya Sehgal, Anju Kumari, Deepti Mengi

ADMIN STAFF: Tej Veer Singh, Anuj Jain, Pooja Goswami, Sachin Arora, Shreshtha Verma, Moksh Krishnan, Devanshu Minotra, Hema Paliwal, Raju

SUPPORT STAFF (32 members): Ram Babu, Islam, Subhas Chand, Dinesh Kumar, Om Prakash, Yogesh, Tunu Chand, Mukesh, Arvind Kumar, Indrabhan, Sanjay, Deepak, Sonu, Dharmendra, Maya, Asha, Koushal Devi, Birma, Kanta, Shaida Bano, Bimlesh, Manoj Devi, Kavita Tomer, Nisha Ghoshal, Suman, Shashi Bala, Baby Das, Sangita, Anju, Ram Sharan, Koushik Das, Mohan

INFRASTRUCTURE & FACILITIES:
- Spacious well-ventilated classrooms, seminar halls, activity halls
- Library with 9,000+ books (novels, short stories, dramas, scientific facts, newspapers, magazines, reference books)
- Medical room with stationed nurse during school hours, free annual check-ups
- Science laboratory with full apparatus and chemicals for experiments
- Computer laboratory with latest technology, projects, video-based learning
- CCTV surveillance throughout campus
- 24/7 power backup
- Gate pass system, Guardian ID cards mandatory
- Staff at every floor including washrooms/stairs
- Swimming pool with 5 coaches + 1 lady teacher, changing rooms and lockers
- Sports ground with lush green grass, volleyball court, cemented cricket pitch, football area
- Skating rink
- Dance/music room with mirrors, instruments, music player
- Theatre room with props
- Art room (2nd floor) with natural light, shelves, materials
- Clay modelling room (2nd floor) with natural light, working boards
- School transport fleet with GPS tracking, trained staff, CBSE-compliant buses
- Canteen with subsidized nutritious food, hygiene maintained
- Play station area for pre-primary and primary students

DEPARTMENTS:
- Pre-Primary Department (theme-based learning, whole language exposure)
- Primary Department
- Middle and Senior Department

CURRICULUM: Follows CBSE curriculum from foundational to secondary level. Curriculum developed under National Curriculum Framework. Scholastic and co-scholastic assessment. Summative assessments at end of terms.

CO-CURRICULAR ACTIVITIES:
- Visual Arts (art, craft, clay modelling)
- Performing Arts (dance, music, theatre)
- Sports (outdoor sports, yoga, volleyball, cricket, football, skating, swimming)
- Summer Camp
- HES Academy
- Debates, excursions, fancy dress, story-telling, festival celebrations, garden activities

CAREER COUNSELLING: Starts from Grade IX. Includes values assessment, standardized testing for ability/interest/learning style, individual counselling, parent counselling.

SPECIAL EDUCATION: Dedicated special educators and counsellor (Sukriti, Mahima Chandel)

PTA: Parent Teacher Association comprising parents, teachers, and management. Connects parents with HES community, keeps them informed, and provides a voice.

SOCIAL MEDIA: Facebook (hesgeetacolony, hessharadvihar), Instagram (@hesgeetacolony, @hessharadvihar), YouTube (@hessharadvihar2006)

PARENT DASHBOARD: Available at hes.edu.in. Parents can view notices, circulars, homework, assignments, lesson plans, results. Mobile app "HES Application" available on Play Store. Uses Google Classroom for assignments.

NAVIGATION RULES:
When the user asks to OPEN, SEE, SHOW, LAUNCH, or EXPLORE a specific module (not just asking about a feature), include a navigation marker. Use EXACTLY one of these markers (stripped from displayed response):
- <<NAV:smart-home>> for Smart Home (also: house, home, home automation, iot)
- <<NAV:cybersecurity>> for Cybersecurity (also: security, hacker, hacking, password)
- <<NAV:traffic>> for Traffic Control (also: cars, intersection, signals, road)
- <<NAV:space>> for Space Debris (also: debris, orbit, satellites, earth)
- <<NAV:quantum>> for Quantum Computing (also: qubits, bloch, quantum)

When starting a tour or guide request, use <<NAVTOUR:id>> instead.

IMPORTANT: Do NOT include navigation markers when the user is asking about a feature or detail within a module (e.g., "explain smart lights", "how does the energy panel work"). Only use markers when they want to OPEN the module itself. Just explain the feature directly.`;

const FREEFORM_KNOWLEDGE = `You are a helpful assistant. Answer the user's question directly and concisely. Max 2-3 sentences unless asked for detail.
Note: You are running inside a project demo (AI Future Lab by Naman Mittal). You can answer any topic, but briefly mention this is a project demo context if relevant.`;

const MODULE_KEYWORDS = {
  "smart-home": ["smart home", "house", "home automation", "iot", "smart lights", "air conditioner", "smart lock", "aura", "biometric"],
  cybersecurity: ["cybersecurity", "cyber security", "security", "hacker", "hacking", "password", "cipher", "brute force", "threat"],
  traffic: ["traffic", "cars", "intersection", "signals", "road", "cctv", "satellite", "junction"],
  space: ["space", "debris", "orbit", "satellites", "earth", "cosmos", "fenyun", "iridium"],
  quantum: ["quantum", "qubits", "qubit", "bloch", "hadamard", "pauli", "cnot", "superposition"],
};

function detectModuleIntent(text) {
  const lower = text.toLowerCase().replace(/^enforce\s+/, "");
  for (const [id, keywords] of Object.entries(MODULE_KEYWORDS)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) return id;
    }
  }
  return null;
}

function parseNavMarker(reply) {
  // Match <<NAVTOUR:id>> first, then <<NAV:id>>
  const tourMatch = reply.match(/<<NAVTOUR:([a-z-]+)>>/i);
  if (tourMatch) {
    return {
      cleanReply: reply.replace(/<<NAVTOUR:[a-z-]+>>/gi, "").trim(),
      action: { type: "tour", module: tourMatch[1] },
    };
  }
  const navMatch = reply.match(/<<NAV:([a-z-]+)>>/i);
  if (navMatch) {
    return {
      cleanReply: reply.replace(/<<NAV:[a-z-]+>>/gi, "").trim(),
      action: { type: "navigate", module: navMatch[1] },
    };
  }
  return { cleanReply: reply, action: null };
}

async function callGemini(message, systemPrompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [{ parts: [{ text: message }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 300 },
        }),
      }
    );
    const data = await res.json();
    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
    return null;
  } catch {
    return null;
  }
}

async function callGroq(message, systemPrompt) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });
    const data = await res.json();
    if (data.choices?.[0]?.message?.content) {
      return data.choices[0].message.content;
    }
    return null;
  } catch {
    return null;
  }
}

export async function POST(request) {
  try {
    const { message } = await request.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    // Developer cheat: "enforce" prefix bypasses project restrictions
    const isEnforce = message.toLowerCase().startsWith("enforce");
    const cleanMessage = isEnforce ? message.replace(/^enforce\s+/i, "") : message;

    const systemPrompt = isEnforce ? FREEFORM_KNOWLEDGE : PROJECT_KNOWLEDGE;

    // Pre-detect module intent from keywords (backup if AI forgets marker)
    const preDetectedModule = isEnforce ? null : detectModuleIntent(cleanMessage);

    // Try Gemini first, fallback to Groq
    let reply = await callGemini(cleanMessage, systemPrompt);
    let model = "gemini-2.0-flash";

    if (!reply) {
      reply = await callGroq(cleanMessage, systemPrompt);
      model = "llama-3.3-70b";
    }

    if (!reply) {
      reply = "I'm the AI Future Lab assistant! Ask me about our 5 modules, Happy English School, or the tech stack.";
      model = "fallback";
    }

    // Parse navigation markers from AI response
    const { cleanReply, action } = parseNavMarker(reply);

    // If AI didn't include marker but we detected intent, force it
    const finalAction = action || (preDetectedModule ? { type: "navigate", module: preDetectedModule } : null);

    // Strip any stray markers that might have been left
    const finalReply = cleanReply.replace(/<<NAV[A-Z]*:[a-z-]+>>/gi, "").trim() || cleanReply;

    return NextResponse.json({ reply: finalReply, model, action: finalAction });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
