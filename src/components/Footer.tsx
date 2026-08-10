"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Reveal from "./motion/Reveal";

export default function Footer() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:jyon1122@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="bg-zinc-900 text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="border border-zinc-700 p-10 mb-14">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight max-w-lg">
            Open to Software Engineering opportunities.
          </h2>
          <p className="mt-3 text-zinc-400 max-w-md">
            Recent UC Davis CS&amp;E graduate looking for full-time roles in fullstack
            and applied AI/LLM engineering.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6">
            <motion.a
              href="mailto:jyon1122@gmail.com"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 text-sm font-medium bg-white text-zinc-900 px-5 py-3 hover:bg-zinc-200 transition-colors"
            >
              <Mail className="h-4 w-4" strokeWidth={1.75} />
              jyon1122@gmail.com
            </motion.a>
            <a
              href="https://github.com/jinhoyon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
            >
              <Github className="h-4 w-4" strokeWidth={1.75} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/jinhoyon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
            >
              <Linkedin className="h-4 w-4" strokeWidth={1.75} />
              LinkedIn
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="grid md:grid-cols-2 gap-14">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              Send a Message
            </span>
            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4 max-w-md">
              <div>
                <label className="text-xs text-zinc-400 block mb-1.5" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  className="w-full bg-transparent border border-zinc-700 px-3.5 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 block mb-1.5" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  className="w-full bg-transparent border border-zinc-700 px-3.5 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 block mb-1.5" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell me about the role or project..."
                  className="w-full bg-transparent border border-zinc-700 px-3.5 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 resize-none"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="self-start bg-white text-zinc-900 text-sm font-medium px-5 py-2.5 hover:bg-zinc-200 transition-colors"
              >
                Send Message
              </motion.button>
            </form>
          </div>

          <div className="flex flex-col justify-end">
            <p className="text-sm text-zinc-500 leading-relaxed">
              Jinho (Roy) Yon — Software Engineer.
              <br />
              Building fullstack products and AI-powered systems.
            </p>
            <p className="mt-6 text-xs text-zinc-600">
              © 2026 Jinho Yon.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
