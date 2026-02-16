import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="page-bg min-h-screen px-6 py-16 sm:px-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10">
        <header className="text-center">
          <span className="chip">Acceso</span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            Inicia sesion
          </h1>
          <p className="mt-3 text-muted-foreground">
            Ingresa con tu email y password para continuar.
          </p>
        </header>

        <section className="card-glass w-full max-w-md p-8">
          <form className="space-y-5" action="/api/auth/login" method="post">
            <label className="field">
              <span>Email</span>
              <input
                className="input-field"
                type="email"
                name="email"
                placeholder="hola@correo.com"
                autoComplete="email"
                required
              />
            </label>
            <label className="field">
              <span>Password</span>
              <input
                className="input-field"
                type="password"
                name="password"
                placeholder="Tu password"
                autoComplete="current-password"
                required
              />
            </label>
            <button className="btn-primary w-full" type="submit">
              Entrar
            </button>
          </form>

          <div className="mt-6 flex flex-col items-center gap-3 text-sm text-muted-foreground">
            <span>Primera vez por aqui?</span>
            <Link className="btn-outline w-full text-center" href="/register">
              Crear cuenta
            </Link>
            <Link className="link-soft" href="/">
              Volver al inicio
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
