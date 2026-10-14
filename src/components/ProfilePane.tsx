import { Pane } from './Pane';
import { NameLogo } from './NameLogo';
import { content, isPending } from '../content';

const { profile } = content;

export function ProfilePane() {
  return (
    <Pane id="profil" number={0} title="profil" className="profil-pane">
      <div className="profil-grid">
        <NameLogo />
        <div className="profil-info">
          <div className="ff-host">
            {profile.host}
            <span className="cursor" aria-hidden="true" />
          </div>
          <div className="ff-sep" aria-hidden="true">
            {'────────────────────────────────────────'}
          </div>
          <dl className="ff-lines">
            {profile.lines.map(({ key, value }) => (
              <div className="ff-line" key={key}>
                <dt>{key}:</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="profil-actions">
            {Object.entries(profile.links).map(([key, { label, href }]) => {
              const isPrimary = key === 'mail';
              const pending = isPending(href);
              return (
                <a
                  key={label}
                  className={`btn ${isPrimary ? 'btn-solid' : 'btn-ghost'}`}
                  href={pending ? undefined : href}
                  aria-disabled={pending || undefined}
                  target={pending ? undefined : '_blank'}
                  rel={pending ? undefined : 'noopener noreferrer'}
                >
                  <span aria-hidden="true">[</span> {label} <span aria-hidden="true">]</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </Pane>
  );
}
