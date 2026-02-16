"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const themeOrder = ["light", "dark", "sunset"] as const;
type ThemeId = (typeof themeOrder)[number];

const themeLabels: Record<ThemeId, string> = {
  light: "Claro",
  dark: "Noir",
  sunset: "Sunset",
};

function applyTheme(theme: ThemeId) {
  const root = document.documentElement;
  root.classList.remove("dark", "theme-sunset");

  if (theme === "dark") {
    root.classList.add("dark");
    return;
  }

  if (theme === "sunset") {
    root.classList.add("theme-sunset");
  }
}

export default function Home() {
  const [theme, setTheme] = useState<ThemeId>("light");

  const nextTheme = useMemo(() => {
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    return themeOrder[nextIndex];
  }, [theme]);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as ThemeId | null;
    if (stored && themeOrder.includes(stored)) {
      setTheme(stored);
      return;
    }
    applyTheme("light");
  }, []);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="page-bg min-h-screen px-6 py-16 sm:px-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        <header className="flex flex-col items-start gap-6">
          <span className="chip">Acceso rapido</span>
          <div className="flex w-full flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Tu espacio listo para entrar, registrar y cambiar de tema.
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground">
                Controla el estilo con un solo boton y navega a login o registro
                cuando quieras. Todo esta conectado para que avances rapido.
              </p>
            </div>
            <button
              type="button"
              className="btn-outline w-full md:w-auto"
              onClick={() => setTheme(nextTheme)}
              aria-label="Cambiar tema"
            >
              Tema: {themeLabels[theme]} → {themeLabels[nextTheme]}
            </button>
          </div>
        </header>

        <main className="grid gap-6 md:grid-cols-[1.3fr_1fr]">
          <section className="card-glass space-y-6 p-8">
            <h2 className="text-2xl font-semibold">Elige tu ruta</h2>
            <p className="text-muted-foreground">
              Usa los botones para entrar o crear una cuenta nueva. Las vistas
              estan listas con formularios completos.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className="btn-primary flex-1 text-center" href="/login">
                Ir a login
              </Link>
              <Link className="btn-outline flex-1 text-center" href="/register">
                Crear cuenta
              </Link>
            </div>
            <div className="grid gap-4 pt-2 sm:grid-cols-2">
              <div className="card-soft">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  Login
                </p>
                <p className="text-lg font-medium">Email + Password</p>
              </div>
              <div className="card-soft">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  Registro
                </p>
                <p className="text-lg font-medium">Name, Email, Phone</p>
              </div>
            </div>
          </section>

          <section className="card-glass relative overflow-hidden p-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Temas dinamicos</h3>
              <p className="text-muted-foreground">
                El boton superior alterna entre claro, noir y sunset. Cada tema
                cambia colores y atmosfera sin recargar la pagina.
              </p>
            </div>
            <div className="mt-8 grid gap-4">
              <div className="card-soft flex items-center justify-between">
                <span className="text-sm font-medium">Tema actual</span>
                <span className="text-sm text-muted-foreground">
                  {themeLabels[theme]}
                </span>
              </div>
              <div className="card-soft flex items-center justify-between">
                <span className="text-sm font-medium">Siguiente tema</span>
                <span className="text-sm text-muted-foreground">
                  {themeLabels[nextTheme]}
                </span>
              </div>
            </div>
            <div className="accent-orb" aria-hidden="true" />
          </section>
        </main>
      </div>
    </div>
  );
}
