import { Github, Linkedin, Twitter } from "lucide-react"
import { Link } from "react-router-dom"

const footerGroups = [
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/#about" },
      { label: "Contact", to: "/#contact" },
      { label: "Careers", to: "/#careers" }
    ]
  },
  {
    title: "Product",
    links: [
      { label: "Features", to: "/#features" },
      { label: "Documentation", to: "/#docs" },
      { label: "API", to: "/#api" }
    ]
  },
  {
    title: "Account",
    links: [
      { label: "Sign In", to: "/login" },
      { label: "Register", to: "/register" }
    ]
  }
]

const socialLinks = [
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter }
]

export const Footer = () => {
  return (
    <footer id="contact" className="border-t border-border/70 bg-slate-950 text-slate-200">
      <div className="container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">Sakha Motion Hub</p>
            <p className="max-w-xs text-sm text-slate-400">
              Real-time intelligence for exoskeleton control, rehabilitation analytics, and operational safety.
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-100">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-slate-400 transition-colors duration-200 hover:text-cyan-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sakha Motion Hub (ExoFlex). All rights reserved.</p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="rounded-md border border-slate-800 p-2 text-slate-400 transition-colors duration-200 hover:border-cyan-400/50 hover:text-cyan-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
