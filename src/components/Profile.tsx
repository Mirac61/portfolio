import { Pane } from './Pane';
import { AsciiBanner } from './AsciiBanner';
import { content, links } from '../content';

const { profile } = content;

const [user, host] = profile.host.split('@');

function Host() {
  return (
    <div className="nf-head">
      <span>{user}</span>
      <span className="nf-at">@</span>
      <span>{host}</span>
    </div>
  );
}

export function ProfileSide({ focused, onActivate }: { focused: boolean; onActivate: () => void }) {
  return (
    <Pane id="profil" title={profile.title} focused={focused} onActivate={onActivate}>
      <Host />
      <p className="side-status">
        <span aria-hidden="true">● </span>
        {profile.status}
      </p>
    </Pane>
  );
}

export function ProfileMain() {
  return (
    <div className="profile-main">
      <AsciiBanner />
      <h1 className="profil-h1">
        {profile.headline}
        <span className="cursor" aria-hidden="true" />
      </h1>
      <div className="actions">
        {links.map(({ label, href }, index) => (
          <a
            key={label}
            className={`btn ${index === 0 ? 'btn-solid' : 'btn-ghost'}`}
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noopener noreferrer"
          >
            <span aria-hidden="true">[</span> {label} <span aria-hidden="true">]</span>
          </a>
        ))}
      </div>
      <dl className="neofetch">
        {profile.facts.map(({ key, value }) => (
          <div className="nf-row" key={key}>
            <dt>{key}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
