import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="page-bg min-h-screen px-6 py-16 sm:px-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10">
        <header className="text-center">
          <span className="chip">Registro</span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            Crea tu cuenta
          </h1>
          <p className="mt-3 text-muted-foreground">
            Completa los datos para empezar a usar la plataforma.
          </p>
        </header>

        <section className="card-glass w-full max-w-2xl p-8">
          <form
            className="grid gap-5 sm:grid-cols-2"
            action="/api/auth/register"
            method="post"
          >
            <label className="field sm:col-span-2">
              <span>Name</span>
              <input
                className="input-field"
                type="text"
                name="name"
                placeholder="Tu nombre"
                autoComplete="name"
                required
              />
            </label>
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
              <span>Phone</span>
              <input
                className="input-field"
                type="tel"
                name="phone"
                placeholder="+34 600 000 000"
                autoComplete="tel"
                required
              />
            </label>
            <label className="field">
              <span>Password</span>
              <input
                className="input-field"
                type="password"
                name="password"
                placeholder="Crea un password"
                autoComplete="new-password"
                required
              />
            </label>
            <label className="field">
              <span>Confirm password</span>
              <input
                className="input-field"
                type="password"
                name="confirmPassword"
                placeholder="Repite el password"
                autoComplete="new-password"
                required
              />
            </label>
            <div className="sm:col-span-2">
              <button className="btn-primary w-full" type="submit">
                Crear cuenta
              </button>
            </div>
          </form>

          <div className="mt-6 flex flex-col items-center gap-3 text-sm text-muted-foreground">
            <span>Ya tienes cuenta?</span>
            <Link className="btn-outline w-full text-center" href="/login">
              Ir a login
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
