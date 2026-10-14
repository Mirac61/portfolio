import { Pane } from './Pane';
import { AsciiBanner } from './AsciiBanner';
import { Heatmap } from './Heatmap';
import { content, isPending } from '../content';

const { profile, statusBar } = content;

const [user, host] = profile.host.split('@');

// pending links (TODO) never render, so the first real link carries the solid style
const links = Object.values(profile.links).filter(({ href }) => !isPending(href));

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
    <Pane id="profil" title="profil" focused={focused} onActivate={onActivate}>
      <Host />
      <p className="side-status">
        <span aria-hidden="true">● </span>
        {statusBar.hiring}
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
      <div className="profile-stats">
        <div className="neofetch">
          <dl>
            {profile.lines.map(({ key, value }) => (
              <div className="nf-row" key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Heatmap />
      </div>
    </div>
  );
}
