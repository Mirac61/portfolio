import { Pane } from './Pane';
import { AsciiBanner } from './AsciiBanner';
import { Headline } from './Headline';
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
      <div className="prof-head">
        <Headline text={profile.headline} />
        <p className="prof-sub">{profile.subline}</p>
      </div>
      <div className="actions">
        {links.map(({ label, href }, index) => (
          <a
            key={label}
            className={`btn ${index === 0 ? 'btn-solid' : 'btn-ghost'}`}
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noopener noreferrer"
          >
            {label}
          </a>
        ))}
      </div>
      <hr className="prof-divider" />
      {/* the info grid is one centred block; the entries inside stay left-aligned */}
      <div className="prof-info">
        <dl className="prof-facts">
          {profile.facts.map(({ key, value, sub }) => (
            <div className="prof-fact" key={key}>
              <dt>{key}</dt>
              <dd className="prof-value">{value}</dd>
              {sub ? <dd className="prof-subvalue">{sub}</dd> : null}
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
