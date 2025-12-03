import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-2 px-6 bg-gray-50 dark:bg-gray-900 text-center mt-auto border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <div>
          Made with <span className="text-red-500">&#9829;</span> by <span className="font-semibold text-foreground">Balraj M</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="xxxx" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-foreground transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M12 .5C5.373.5 0 5.872 0 12.605c0 5.367 3.438 9.926 8.205 11.527.6.112.82-.262.82-.582 0-.287-.011-1.243-.017-2.252-3.338.744-4.042-1.614-4.042-1.614-.545-1.382-1.332-1.75-1.332-1.75-1.089-.753.083-.738.083-.738 1.205.086 1.84 1.262 1.84 1.262 1.071 1.894 2.809 1.347 3.495 1.03.108-.78.42-1.348.763-1.659-2.665-.304-5.467-1.333-5.467-5.931 0-1.31.469-2.382 1.236-3.222-.123-.303-.535-1.526.117-3.181 0 0 1.008-.322 3.305 1.23.957-.267 1.984-.399 3.004-.403 1.019.004 2.047.136 3.006.403 2.294-1.553 3.3-1.23 3.3-1.23.654 1.655.242 2.878.12 3.181.77.84 1.235 1.912 1.235 3.222 0 4.609-2.807 5.625-5.478 5.921.43.373.824 1.102.824 2.22 0 1.603-.014 2.897-.014 3.29 0 .322.216.698.827.58C20.565 22.527 24 17.972 24 12.605 24 5.872 18.627.5 12 .5z"/>
            </svg>
          </Link>
          <Link href="https://www.linkedin.com/in/balrajm/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-foreground transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11.5 19h-3v-9h3zm-1.5-10.268c-.966 0-1.75-.786-1.75-1.75 0-.963.784-1.75 1.75-1.75s1.75.786 1.75 1.75c0 .964-.784 1.75-1.75 1.75zm13.5 10.268h-3v-4.5c0-1.071-.021-2.448-1.494-2.448-1.494 0-1.722 1.166-1.722 2.374v4.574h-3v-9h2.885v1.221h.041c.402-.761 1.382-1.561 2.844-1.561 3.044 0 3.606 2.004 3.606 4.609v4.731z"/>
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
