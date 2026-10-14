import { Pane } from './Pane';
import { content } from '../content';

const { profile } = content;

export function ProfilePane() {
  return (
    <Pane id="profil" number={0} title="profil" className="profil-pane">
      <div className="profil-grid">
        <img
          className="profil-logo"
          src="/logo.svg"
          alt="Mirac"
          width={720}
          height={192}
        />
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
              return (
                <a
                  key={label}
                  className={`btn ${isPrimary ? 'btn-solid' : 'btn-ghost'}`}
                  href={href.startsWith('TODO') ? undefined : href}
                  target={href.startsWith('TODO') ? undefined : '_blank'}
                  rel={href.startsWith('TODO') ? undefined : 'noopener noreferrer'}
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
