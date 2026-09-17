import { SiGithub } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
            M
          </div>
          <span className="text-sm font-medium">&copy; {new Date().getFullYear()} Manho</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/AmaanIqbal0011"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <SiGithub className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/amaniqbal0011/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <FaLinkedinIn className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
