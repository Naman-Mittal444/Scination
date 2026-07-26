/**
 * ChatBot — Floating AI assistant with Gemini + Groq backend.
 * Features: TTS toggle, speech-to-text mic, module navigation, developer cheat (enforce prefix).
 */
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SUGGESTIONS = [
  "What is this project?",
  "Show me the Smart Home",
  "How does Space Debris tracking work?",
  "What school is this from?",
  "Explain the Quantum module",
  "What tech stack is used?",
];

export default function ChatBot({ onNavigate, activeModule }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hey! I'm the AI Future Lab assistant. Ask me anything about the project, modules, or Happy English School. I can also open modules for you." },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const synthRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (synthRef.current) window.speechSynthesis?.cancel();
      if (recognitionRef.current) {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        try { recognitionRef.current.stop(); } catch {}
      }
    };
  }, []);

  function toggleMic() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser. Try Chrome or Edge.");
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      if (finalTranscript) {
        setInput(finalTranscript.trim());
      } else if (interimTranscript) {
        setInput(interimTranscript);
      }
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = (e) => {
      console.warn("Speech recognition error:", e.error);
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    setIsListening(true);
    setInput("");
    try {
      recognition.start();
    } catch (e) {
      console.warn("Recognition start failed:", e);
      setIsListening(false);
    }
  }

  const speak = useCallback((text) => {
    if (!ttsEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    // Strip markdown-ish formatting for cleaner speech
    const clean = text.replace(/[`*_#<>]/g, "").replace(/\s+/g, " ").trim();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [ttsEnabled]);

  function handleNavigate(moduleId) {
    if (moduleId === activeModule) return; // already open, skip
    if (onNavigate) {
      onNavigate(moduleId);
    }
    window.dispatchEvent(new CustomEvent("navigate-module", { detail: { moduleId } }));
  }

  async function sendMessage(text) {
    const msg = text || input.trim();
    if (!msg || isLoading) return;

    setMessages(prev => [...prev, { role: "user", text: msg }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      const replyText = data.reply || "Sorry, I couldn't process that.";

      setMessages(prev => [
        ...prev,
        { role: "assistant", text: replyText, model: data.model },
      ]);

      // Speak the response
      speak(replyText);

      // Handle navigation action
      if (data.action?.type === "navigate" && data.action.module) {
        handleNavigate(data.action.module);
      }
    } catch {
      const errText = "Network error — make sure the dev server is running.";
      setMessages(prev => [
        ...prev,
        { role: "assistant", text: errText },
      ]);
      speak(errText);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function toggleTTS() {
    if (ttsEnabled && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setTtsEnabled(prev => !prev);
  }

  return (
    <>
      {/* Toggle button */}
      <motion.button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle AI assistant"
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="4" x2="16" y2="16" />
            <line x1="16" y1="4" x2="4" y2="16" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 2a6 6 0 0 1 6 6v3a2 2 0 0 1-2 2h-1l-3 3-3-3H6a2 2 0 0 1-2-2V8a6 6 0 0 1 6-6z" />
            <circle cx="7.5" cy="8.5" r="0.8" fill="currentColor" />
            <circle cx="12.5" cy="8.5" r="0.8" fill="currentColor" />
          </svg>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="chatbot-header-dot" />
                <span className="chatbot-header-title">AI FUTURE LAB</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  className={`chatbot-tts-btn ${ttsEnabled ? "active" : ""}`}
                  onClick={toggleTTS}
                  aria-label={ttsEnabled ? "Disable text-to-speech" : "Enable text-to-speech"}
                  title={ttsEnabled ? "TTS: ON" : "TTS: OFF"}
                >
                  {ttsEnabled ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  )}
                </button>
                <span className="chatbot-header-sub">Gemini + Groq</span>
              </div>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`chatbot-msg chatbot-msg-${msg.role}`}>
                  {msg.role === "assistant" && (
                    <span className="chatbot-avatar">AI</span>
                  )}
                  <div className="chatbot-bubble">
                    {msg.text}
                    {msg.model && (
                      <span className="chatbot-model-tag">{msg.model}</span>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="chatbot-msg chatbot-msg-assistant">
                  <span className="chatbot-avatar">AI</span>
                  <div className="chatbot-bubble chatbot-typing">
                    <span /><span /><span />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="chatbot-suggestions">
                {SUGGESTIONS.map((s, i) => (
                  <button key={i} className="chatbot-suggestion" onClick={() => sendMessage(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="chatbot-input-wrap">
              <input
                ref={inputRef}
                className="chatbot-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isListening ? "Listening..." : "Ask about the project..."}
                disabled={isLoading}
              />
              <button
                className={`chatbot-mic-btn ${isListening ? "active" : ""}`}
                onClick={toggleMic}
                aria-label={isListening ? "Stop listening" : "Start voice input"}
                title={isListening ? "Stop" : "Speak"}
                disabled={isLoading}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                </svg>
              </button>
              <button
                className="chatbot-send"
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M1.5 1.2l13 6.3-13 6.3.8-5.5L13 8l-9.7 2.5z" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
