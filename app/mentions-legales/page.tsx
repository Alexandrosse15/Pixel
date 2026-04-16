import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site InsertCoins.press.',
  robots: { index: false, follow: false },
}

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="mb-12 font-display text-3xl font-black uppercase text-white md:text-4xl">
        Mentions légales
      </h1>

      <div className="space-y-10 text-sm leading-relaxed text-ink-secondary">

        <section>
          <h2 className="mb-3 font-display text-base font-black uppercase tracking-wide text-white">
            1. Éditeur du site
          </h2>
          <ul className="space-y-1">
            <li><span className="text-ink-muted">Nom / Pseudo :</span> Alexandrosse</li>
            <li><span className="text-ink-muted">Statut :</span> Particulier</li>
            <li>
              <span className="text-ink-muted">Email :</span>{' '}
              <a
                href="mailto:pressinsertcoins@gmail.com"
                className="text-brand transition-colors hover:underline"
              >
                pressinsertcoins@gmail.com
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-display text-base font-black uppercase tracking-wide text-white">
            2. Directeur de la publication
          </h2>
          <p>Le directeur de la publication est : Alexandrosse</p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-base font-black uppercase tracking-wide text-white">
            3. Hébergement
          </h2>
          <ul className="space-y-1">
            <li><span className="text-ink-muted">Hébergeur :</span> Vercel</li>
            <li>
              <span className="text-ink-muted">Site web :</span>{' '}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand transition-colors hover:underline"
              >
                vercel.com
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-display text-base font-black uppercase tracking-wide text-white">
            4. Propriété intellectuelle
          </h2>
          <p>
            L&apos;ensemble des contenus présents sur le site (textes, images, vidéos, logos, etc.) est protégé par le droit d&apos;auteur.
          </p>
          <p className="mt-2">
            Sauf mention contraire, ces contenus sont la propriété exclusive de l&apos;éditeur.
          </p>
          <p className="mt-2">
            Toute reproduction, distribution, modification ou utilisation sans autorisation préalable est interdite.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-base font-black uppercase tracking-wide text-white">
            5. Responsabilité
          </h2>
          <p>
            L&apos;éditeur du site s&apos;efforce de fournir des informations aussi précises que possible.
          </p>
          <p className="mt-2">
            Toutefois, il ne pourra être tenu responsable des omissions, inexactitudes ou carences dans la mise à jour.
          </p>
          <p className="mt-2">
            Les liens externes présents sur le site n&apos;engagent pas la responsabilité de l&apos;éditeur.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-base font-black uppercase tracking-wide text-white">
            6. Données personnelles
          </h2>
          <p>Le site peut collecter des données personnelles via ses formulaires.</p>
          <p className="mt-2">Conformément à la réglementation en vigueur (RGPD) :</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Les données ne sont utilisées que dans le cadre prévu</li>
            <li>Elles ne sont ni vendues ni cédées</li>
            <li>Vous pouvez demander leur modification ou suppression</li>
          </ul>
          <p className="mt-3">
            Contact :{' '}
            <a
              href="mailto:pressinsertcoins@gmail.com"
              className="text-brand transition-colors hover:underline"
            >
              pressinsertcoins@gmail.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-base font-black uppercase tracking-wide text-white">
            7. Cookies
          </h2>
          <p>
            Le site peut utiliser des cookies pour améliorer l&apos;expérience utilisateur et mesurer l&apos;audience.
          </p>
          <p className="mt-2">Vous pouvez configurer votre navigateur pour refuser les cookies.</p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-base font-black uppercase tracking-wide text-white">
            8. Droit applicable
          </h2>
          <p>Le présent site est soumis au droit français.</p>
          <p className="mt-2">En cas de litige, les tribunaux français seront seuls compétents.</p>
        </section>

      </div>
    </div>
  )
}
