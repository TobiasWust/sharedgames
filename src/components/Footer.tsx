import Link from "next/link";
import { GiHearts } from "react-icons/gi";

export default function Footer() {
  return (
    <footer className="footer footer-center bg-base-300 p-4 text-base-content">
      <div>
        <p>
          Copyright © 2023 - Made with{" "}
          <GiHearts className="inline-block text-red-500" /> by{" "}
          <a href="https://www.wust.dev" className="link-hover link">
            Wust
          </a>
        </p>
        <p>
          Sourcecode available on{" "}
          <a
            href="https://github.com/TobiasWust/sharedgames"
            className="link-hover link"
          >
            Github
          </a>
        </p>
        <div className="flex gap-5">
          <Link className="link-hover link" href="/">
            App
          </Link>
          <Link className="link-hover link" href="/imprint">
            Imprint
          </Link>
          <Link className="link-hover link" href="/privacy">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
