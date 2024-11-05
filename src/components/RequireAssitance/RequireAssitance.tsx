import { DiscordIcon } from "../Welcome/DiscordIcon";
import "./RequireAssitance.css";

export function RequireAssitance() {
  return (
    <a
      href={import.meta.env.VITE_DISCORD_LINK}
      className="require-assistance"
      target="_blank">
      <h5>Require Assistance?</h5>

      <DiscordIcon></DiscordIcon>

      <div>
        <h6>Join Codex Discord</h6>
        <small>Get direct access to the Core Team.</small>
      </div>
    </a>
  );
}
