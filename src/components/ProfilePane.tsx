import { Pane } from './Pane';
import { content } from '../content';

const { profile } = content;

export function ProfilePane() {
  return (
    <Pane id="profil" number={0} title="profil" className="profil-pane">
      <div className="profil-grid">
        <div>
          <div className="profil-name">{profile.name}</div>
          <div className="profil-role">
            {profile.role}
            <span className="cursor" aria-hidden="true" />
          </div>
        </div>
        <dl className="profil-info">
          {profile.facts.map(({ key, value }) => (
            <div key={key} className="kv-row">
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="profil-actions">
        {Object.values(profile.links).map(({ label, href }) => (
          <a
            key={label}
            className={`btn ${href.startsWith('TODO') ? 'btn-ghost' : 'btn-solid'}`}
            href={href.startsWith('TODO') ? undefined : href}
            target={href.startsWith('TODO') ? undefined : '_blank'}
            rel={href.startsWith('TODO') ? undefined : 'noopener noreferrer'}
          >
            <span aria-hidden="true">[</span> {label} <span aria-hidden="true">]</span>
          </a>
        ))}
      </div>
    </Pane>
  );
}
